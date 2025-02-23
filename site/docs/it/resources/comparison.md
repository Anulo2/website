# Come si compara grammY con altri framework

Anche se grammY usa alcuni concetti conosciuti da altri framework per bot (e framework per il web), è però stato scritto da zero per esser veloce e facilmente leggibile.
In altre parole non usa codice di altri progetti competitori ma risulterà familiare agli utenti di alcuni framework.

> Ricorda che questo confronto è di parte anche se proviamo a fornire descrizioni oggettive e vantaggi e svantaggi dell'uso di grammY rispetto ad altre librerie.
> Proviamo a tenere aggiornate le cose in questo articolo.
> Se noti che qualcosa non è aggiornato modifica la pagina con il link alla fine di essa

## Comparazione con altri framework JavaScript

::: consiglio Scegli prima un linguaggio di programmazione
Dato che stai leggendo la documentazione di un framework appartenente all'ecosistema di JavaScript stai probabilmente  cercando qualcosa da eseguire su Node.js (oppure Deno).
Tuttavia, se non è il tuo caso, [scorri in giù]((#comparison-with-frameworks-in-other-programming-languages) per una comparazione tra quali linguaggi sono migliori per lo sviluppo di bot.
Ovviamente troverai anche una comparazione con altri framework per altri linguaggi (principalmente Python).
:::

Ci sono principalmente due progetti dai quali grammY prende ispirazione: [Telegraf](https://github.com/telegraf/telegraf) e [NTBA](https://github.com/yagop/node-telegram-bot-api).
Ci concentreremo su di essi per ora ma in futuro potremmo (o potresti) aggiungere altre comparazioni.

### Telegraf

grammY ha le sue radici in Telegram quindi ecco un riassunto di come questi 2 framework sono legati storicamente.

#### Un po' di storia

Telegraf è una libreria fantastica e grammY non sarebbe dove è ora senza di essa.
Tuttavia, Telegraf era scritto in JavaScript (nella v3).
I tipi venivano aggiunti manualmente e mantenuti inadeguatamente, erano quindi molto incompleti, errati e non aggiornati.
Una forte tipizzazione è cruciale in una libreria seria in quanto permette l'utilizzo di strumenti superiori e permette di iterare più velocemente sulla base di codice.
Molte persone preferiscono avere la sicurezza della tipizzazione quando sviluppano un bot complesso ed alcune lo considerano fondamentale.

Telegraf v4 provò a sistemare ciò migrando tutto il codice a TypeScript.
Sfortunatamente molti dei tipi risultarono troppo complessi ed erano difficili da comprendere (ma corretti).
Inoltre, la migrazione rivelò innumerevoli problemi ([esempio](https://github.com/telegraf/telegraf/issues/1076)) nel codice che resero diffile persino trovare i tipi corretti per il codice già esistente.

Come risultato, anche se la version 4.0 provò a _migliorare_ la correttezza e supporto alla strumentazione, rese Telegram molto più _difficile da usare_ rispetto al suo predecessore non tipizzato.
Comprensibilmente molti utenti di Telegram 3 non volevano aggiornare.
Diventò pure più difficile iniziare per gli utenti.

**grammY fa un passo indietro e ripensa un framework accessibile e sicuramente tipizzato.**
Questo permise di saltare molte delle discussioni sul come affrontare strane tipizzazioni interne.
Permise al progetto di avere un codice pulito e consistente che fornisce agli utenti un'ottima tipizzazione (=supporto negli editor).
La sicurezza fornita dalla tipizzazione permette possibiltà avanzante che cambiano radicalmente il modo in cui si sviluppano bot, come ad esempio [API transformers](/advanced/transformers.md).

Ad oggi, Telegraf 3 non è più aggiornato.
Ci sono alcune derivazioni non ufficiali che cercano di tenere il codice aggiornato per stare al passo con la Bot API, ma la loro compatibilità è sconosciuta.
Oltre a questo il sistema delle aggiunte di Telegraf è stato mosso a Telegraf 4.
La maggior parte degli sviluppatori di aggiunte non mantiene versioni dedicate a derivate non ufficiali di Telegraf.
Dato che Telegraf se ne sta tra le versione 3 e 4 ha senso comparare grammY con entrambe individualmente.

#### Differenze con la v3

Data la loro storia condivisa, grammY e Telgraf hanno molto in comune.
Entrambi hanno un [sistema middleware](/guide/middleware.md) nel loro nucleo.
Condividono inoltre molta della sintassi base:

```ts
// Funziona sia su grammY e Telegraf.
bot.on("message", (ctx) => ctx.reply("Hi!"));
```

Qualunque codice scritto per Telegraf funzionerà anche per grammY con variazioni minime.
(Lo stesso non è valido al contrario in quanto molte funzionalità di grammY non sono presenti su Telegraf.)

Il principale vantaggio di grammY rispetto a Telegram 3.x è **un sostanzialmente miglior supporto al tooling**.
Telegraf 3 è scritto in JavaScript.
I tipi inclusi sono incorretti ed incompleti, e i tipo della Bot API sono vecchi di anni.
Come risultato non c'è un supporto stabile per l'auto completamento o controllo di scrittura sul codice del bot.
L'esperienza insegna che solitamente devi eseguire il bot per scoprire se il tuo codice funzioni.

Al contrario, grammY è scritto puramente in TypeScript.
Questo permette al tuo IDE (ad esempio VSCode) di analizzare il tuo codice mentre lo scrivi, ed assisterti.
In aggiunta può mostrati l'intera Telegram Bot API in linea, la documentazione del sito è disponibile sovrapponendo il mouse con qualunque nome o elemento del tuo codice.

Un altro vantaggio notevole è che puoi finalmente **scrivere i tuoi bot in TypeScript**:
Questo è stato difficile in quanto le annotazioni per i tipi di Telegraf errate prevenivano del codice perfettamente corretto dal compilare, incoraggiando gli utenti a non controllare il proprio codice.
Tuttavia, codice sicuramente tipizzato è un vantaggio sostanziale in qualunque progetto più serio.

grammY e Telegraf hanno codice alla base diverso.
Liberandoci da codice legacy, grammY ha potuto fare grandi modifiche al sistema middleware, permettendo casi interessanti come [query per filtrare](/guide/filter-queries.md), [error boundaries](/guide/errors.md#error-boundaries), [API transformers](/advanced/transformers.md), e molto altro.
Questo permette anche lo sviluppo di plugin altrimenti impossibile su Telegraf.

Il principale vantaggio di Telegraf rispetto a grammY, per ora, è **l'essere conosciuto da molte più persone**.
Gli utenti di Telegraf sono divisi tra le 2 versioni, ma anche se divisi anche singolarmente sono di più che l'interezza degli utenti di grammY.
Questo significa che si possono trovare molte più storie su internet da parte di utenti di Telegraf, guide non ufficiali da altri sviluppatori che possono aiutarti se la documentazione o la libreria ha delle mancanze.

#### Differenze con la v4

La principale differenza di grammY rispetto a Telegraf 4.x è che è **molto più semplice**.
Per esempio:

- grammY ha [una documentazione](/)
  Telegraf non la ha (è stata rimpiazzata da un riferimento alla API generato automaticamente che manca di spiegazioni).
- I tipi in grammY _semplicemente funzionano_ e seguiranno il tuo codice.
  Su telegraf, dovrai spesso scrivere il tuo codice in un certo modo o non compilerà (anche se in realtà funzionerebbe correttamente).
- grammY integra suggerimenti dal [riferimento ufficiali alla API per i Bot](core.telegram.org/bots/api) che ti aiutano a programmare.
  Telegraf non fornisce alcuna informazione sul tuo codice.

#### Riassunto

##### Vantaggi di grammY

- Più semplice di Telegraf 3 e 4
- Supporto opportuno a TypeScript
- Ha sia una documentazione che un riferimento alla API generato
- Nettamente più veloce sul long polling (usando grammY runner)
- Utenti uniti ed ecosistema
- Sviluppo più attivo
- Messaggi di errore utili
- Molto più difficile finire in casi di concorrenza pericolosi
- Creato per proteggerti dal fare errori di programmazione
- Gira su Node.js, Deno e nel browser

##### Vantaggi di Telegraf

- Più vecchio, quindi più maturo
- Più plugin (ma questo sta cambiando)
- Molti più bot di esempio, sia nella repo che in giro
- Telegraf 3 ha molti più utenti

### NTBA

Il pacchetto `node-telegram-bot-api` è il second grande progetto che ha impattato lo sviluppo di grammY.
Il suo principale vantaggio rispetto agli altri framework è che è dannatamente semplice.
La sua architettura può essere descritta in una frase, mentre grammY necessita una [guida](/guide/) sul suo sito della documentazione per fare ciò.


 is the second big project that impacted the development of grammY.
Its main advantage over other frameworks is that it just is dead simple.
Its architecture can be described in a single sentence, while grammY needs a [guide](/guide/) on its documentation website to do the same.
We believe that all these explanations on the grammY website help people to get started easily, but it is tempting to have a library which does not need any explanations in the first place.

On the downside, this is only good in the short-term perspective.
The idea of putting everything in a gigantic file, and using a primitive `EventEmitter` to process streams of complex objects (aka. web requests) has brought a lot of pain to the world of Telegram bots, and it certainly prevented a number of good ideas from being implemented.
Bots always start small, but a responsible framework must provide them a clear path to grow, and to scale up.
Unfortunately, NTBA fails horribly at doing that.
Any code base with more than 50 lines that uses NTBA ends up being a terrible mess of spaghetti-like cross-references.
You don't want that.

### Other Frameworks

Do you think that your favorite framework is better than grammY in some respect?
Feel free to edit this page and add a comparison—or tell us what you think in the [group chat](https://t.me/grammyjs)!

## Comparison With Frameworks in Other Programming Languages

There are reasons to favor a different programming language over TypeScript.
The most important thing is that you like working with your tools and languages.
If you are determined to stick with something else, then you can stop reading here.

Given that you're still reading, you may want to know why grammY is written in TypeScript, and why you should maybe consider picking this language for your bot, too.

This section will outline how TypeScript has a few advantages over other languages when it comes to developing Telegram bots.
The main other language that is used to develop chat bots for Telegram is Python, so we will limit ourselves to this for now.
Some of the following points are rather personal opinions than objective facts.
People have different taste, so take this section with a grain of salt.

1. **Better editor tooling.**
   The type annotations of grammY are outstanding.
   While Python did introduce types in its 3.5 release, they are not used as commonly in the ecosystem as it is the case with JavaScript/TypeScript.
   Hence, they cannot compare to what you get out of the box with grammY and its accompanying libraries.
   With the types come auto-completion at every step of development, as well as helpful tooltips with explanations and links.
2. **Easier to scale up code base.**
   The type system has a second advantage—it lets you scale the code base of your bot.
   This is much harder to do for projects written in a language with worse type safety.
3. **Easier to scale up load.**
   If your bot actually starts to get popular, it is significantly easier to scale bots written in JS rather than in Python.
4. **Higher responsiveness of your bot.**
   The V8 engine makes JavaScript the fastest scripting language in the observable universe.
   If you like your bot to be as fast as possible while still enjoying a dynamic language, then grammY is your best bet.
5. **`async`/`await` support.**
   This is a very popular programming pattern to tame concurrency.
   The recent years show a strong trend towards asynchronous programming.
   The largest bot framework for Python, PTB, [announced its migration](https://t.me/pythontelegrambotchannel/94) to asynchronous programming in January 2021, which is expected to maybe take “2 years”.
   grammY is already there.
   (Other, less known Python frameworks may be faster at transitioning.
   Disregard this point if you are using a Python framework that has support for `async`/`await`.)

## How to Disagree With This Comparison

If you think that something is wrong on this page, don't despair!
Please let us know in the [group chat](https://t.me/grammyjs)!
We'd love for you to educate us about your perspective.
Naturally, you can also just edit this page on GitHub, or file an issue there to point out mistakes or suggest other things.
This page will always have room to be more objective, and more fair.
