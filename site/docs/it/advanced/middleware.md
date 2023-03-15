---
prev: ./
next: ./structuring.md
---

# Middleware Redux

In questa guida, [introdurremo il middleware](../guide/middleware.md) come stack di funzioni.
Nonostante non è sbagliato si possa utilizzare il middleware in forma lineare (anche in grammY), chiamaro solo stack è una simplificazione.

## Middleware in grammY

Normalmente, si segue il seguente schema.

```ts
const bot = new Bot("<token>");

bot.use(/* ... */);
bot.use(/* ... */);

bot.on(/* ... */);
bot.on(/* ... */);
bot.on(/* ... */);

bot.start();
```

Sembra praticamente uno stack, anche se, dietro le quinte, in realtà è un ablero.
Il cuore di questa funzionalità è la classe `Composer` ([riferimento](https://deno.land/x/grammy/mod.ts?s=Composer)) che costruisce questo albero.

Prima di tutto, ogni istanza di `Bot` è un'istanza di `Composer`.
È solo una sottoclasse, quindi `class Bot extends Composer`.

Inoltre, dovresti sare che ogni metodo di `Composer` intrenamente chiama `use`.
Per esempio, `filter` chiama solo `use` con alcuni middleware di biforcamento, mentre `on` chiama solo `filter` di nuovo con alcune funzioni predicato che comparano contro una certa  [query di filtri](../guide/filter-queries.md).
Possiamo quinid limitarci a guardare `use` per ora, e il resto segue.

Guardiamo ora un po' più in dettaglio cosa fa `Composer` con le tue chiamate`use`, e come si dfferenza da altri middleware.
La differenza potrebbe sembarre subdola, ma aspetta di vedere la prossima sottosezione per scoprire perchè ha conseguenze notevoli.

## Augmenting `Composer`

Puoi installare più middleware in un' istanza di `Composer` anche dopo aver chiamato `Composer` stesso da qualche parte.

```ts
const bot = new Bot("<token>"); // sottoclasse di `Composer`

const composer = new Composer();
bot.use(composer);

// Questi verranno eseguiti:
composer.use(/* A */);
composer.use(/* B */);
composer.use(/* C */);
```

Verranno eseguiti `A`, `B` e `C`.
Tutto questo dice che quando hai iniziato una istanza di `Composer`, puoi comunque chiamare `use` su di esso e il middleware verrà comunque eseguito.
(Questo non è nulla di spettacolare, però è già una differenza principale con gli altri framework popolari che semplicemente ignorano le operazioni successive.)

Potresti chciederti dove sia la struttura ad albero. 
Guardiamo questo esempio:

```ts
const composer = new Composer();

composer.use(/* A */);
composer.use(/* B */).use(/* C */);
composer.use(/* D */).use(/* E */).use(/* F */).use(/* G */);
composer.use(/* H */).use(/* I */);
composer.use(/* J */).use(/* K */).use(/* L */);
```

Riesci a vederlo?

Come puoi immaginare, tutto il middleware verrà eseguito in ordine da `A` ad `L`.

Altre librerie internamente appiattirebbere questo codice per renderlo equivalente a `composer.use(/* A */).use(/* B */).use(/* C */).use(/* D */)...` e via dicendo.
Al contrario, grammY preserva l'albero da te specificato: un nodo base (`composer`) ha cinque figli (`A`, `B`, `D`, `H`, `J`), mentre il figlio `B` ha un altro figlio, `C`, e via dicendo.
Questo albero verrà poi traversato da ogni aggiornamento in ordine di profondità, quindi attraversando in modo efficiente da `A` ad `L` in ordine lineare, come sei abituato su altri sistemi.

Questo è reso possibile con la creazione di un nuovo `Composer` ogni volta che chiami `use` che verrà a sua volta esteso (come spiegato sopra).

## Concatenare chiamate `use`

Se utilizziamo solo `use`, non sarebbe troppo utile.
Diventa più interesaste quando, per esempio, entra in gioco `filter`.

Guarda questo:

```ts
const composer = new Composer();

composer.filter(/* 1 */, /* A */).use(/* B */)

composer.filter(/* 2 */).use(/* C */, /* D */)
```

Alla linea 3, registriamo `A` dietro ad una funzione predicato `1`.
La funzione `A` verrà valutata solo per gli aggiornamenti che passano la condizione `1`.
Tuttavia, `filter` ritorna una istanza di `Composer` che abbiamo migliorato con la chiamata `use` alla linea 3, quindi `B` è comunque protetta da `1`, anche se è inizializzata in una chiama `use` diversa.

La linea 5 è equivalente alla linea 3 nel sensoc he sia `C` che `D` verranno eseguiti solo se `2` passa.

Ricordi come chiamate a `bot.on()` potessero essere incatenate in modo da concatenare chiamate di filtri con AND?

Immagina questo:

```ts
const composer = new Composer();

composer.filter(/* 1 */).filter(/* 2 */).use(/* A */);
```

`2` verrà controllato solo se `1` si mantiene, e `A` verrà eseguito se `2` (e quindi `1`) si mantiene.

Rivisita la sezione sul [combinare le chiamate di filtro](../guide/filter-queries.md#combinación-de-varias-consultas) con le tue nuove conoscenze e goditi il tuo nuovo potere.

Un caso speciale è `fork`, in quanto avvia due computazioni concorrenti, ovvero, interlacciate nel ciclo degli eventi.
Invece di ritornare l'istanza di `COmposer` create dalla chiamata `use`, viene ritornato un `Composer` che riflette il calcolo biforcato.
Questo permette modelli coincisi come `bot.fork().on(":text").use(/* A */)`.
`A` verrà quindi eseguito nel nuovo ramo della computazione parallela.