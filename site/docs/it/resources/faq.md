# FAQ

Ecco un insieme di domande frequenti [riguardanti grammy in se](#questions-about-grammy), [errori frequenti](#why-am-i-getting-this-error) e [Deno](#questions-about-deno).

Se questo FAQ non risponde alla tua domanda, guarda anche [il FAQ per Bot](https://core.telegram.org/bots/faq) dei creatori di Telegram.

## Domande Riguardanti grammY

### Cos'è grammy?

grammY è un software che puoi usare quando vuoi programmare un tuo bot per [Telegram](https://telegram.org).
Quando crei bot ti accorgi che alcune parti di questo processo sono noiose e sempre uguali.
grammY fa queste cose per te rendendo facilissima la creazione di un bot.

### Quando è stato creato grammY?

La prima pubblicazione del codice di grammY è stata a fine Marzo 2021.
Ha raggiunto la prima versione stabile qualche settimana più tardi.

### Come viene sviluppato grammY?

grammY è completamente gratuito ed open source e viene sviluppato da un gruppo di volontari.
Il codice è disponibile su GitHub.

Sei benvenuto ad [unirti a noi](https://t.me/grammyjs)!
(Se parli RUsso, puoi anche unirti [qua](https://t.me/grammyjs_ru)!)

### Che linguaggio di programmazione usa grammY?

grammY è scritto completamente in TypeScript, un'estensione di JavaScript.
Può quindi esser eseguito su Node.js.

Tuttavia, grammY può anche essere eseguito su Deno, definito come il successore di Node.js.
(Tecnicamente, puoi eseguire grammY in un browser moderno, anche se questo tornerà raramente utile.)

### Come si compara grammY con la concorrenza?

Se arrivi da un altro linguaggio di programmazione o un framework JavaScript diverso, puoi guardare la nostra [comparazione dettagliata](./comparison.md) tra framework.

## Perchà Ho Questo Errore?

### 400 Bad Request: Cannot PArse entities

Stai mandano un messaggio formattato, per esempio stai impostando `parse_mode` quando mandi il messaggio.
Tuttavia la tua formattazione è rotta e Telegram non sa come interpretarla.
Dovresti rileggere [la sezione sulla formattazione](https://core.telegram.org/bots/api#formatting-options) nella documentazione di Telegram.
Il messaggio di errore ti segnalerà dove è l'errore nella tua stringa con precisione.

::: consiglio Passare entità invece che formattare
Puoi fare il parsing delle entità per Telegram se vuoi e specificare `entities` quando mandi il messaggio.
Il tuo testo per il messaggio sarà una stringa normale.
In quel modo non devi preoccuparti di fare l'escape di caratteri speciali.
Potrebbe sembrare che richieda più codice ma in realtà è una soluzione molto più affidabile e facile.
:::

### 401 Unauthorized

Il token del bot è errato.
Magari tu pensi sia corretto.
Non lo è.
Vai su [@BotFather](https.//t.me/BotFather) per vedere quale è il tuo token.

### 403 Forbidden: bot was blocked by the user

Probabilmente hai provato a mandare un messaggio ad un utente ed hai incontrato questo problema.

Quando un utente blocca il tuo bot, non puoi più mandargli messagi o interagire con loro in qualunque altro modo (almeno che il tuo bot non sia stato invitato in un gruppo dove l'utente è presente).
Telegram fa questo per proteggere i propri utenti.
Non puoi farci nulla al riguardo.

Le opzioni che hai sono:

- Gestisci l'errore e per esempio rimuovi i dati dell'utente dalla tua base di dati.
- Ignroa l'errore.
- Ascolta per aggiornamenti `my_chat_member` tramite `bot.on("my_chat_member")` così da essere avvisato quando un utente blocca il tuo bot.
  Suggerimento: Confronta il campo `status` del vecchio e nuovo utente. 

### 404 Not found

Se accade mentre avvii il bot, il tuo token è errato.
Vai su [@BotFather](https.//t.me/BotFather) per vedere quale è il tuo token.

Se il tuo bot funziona correttamente la maggior parte delle volte e all'improvviso incontri un 404, stai facendo qualcosa di molto strambo.
Facci la tua domanda nel gruppo.

### 409 Conflict: terminated by other getUpdates request

Stai eseguendo 2 istanze del tuo bot.
Puoi eseguire solo un'istanza del tuo bot.

Se sei convinto di aver eseguito il tuo bot una sola volta, puoi revocare il token del bot.
Ciò fermerà tutte le altre istanze.
Vai su [@BotFather](https.//t.me/BotFather) per fare ciò.

### 429: Too Many Requests: retry after X

Congratulazioni.
Sei incappato in uno degli errori più difficili da risolvere.

Ci sono due possibili casi.

Uno: Il tuo bot non ha molti utenti.
In quel caso stai mandando troppe richieste ai server telegram.
Soluzione: non farlo.
Dovresti pensare seriamente a come ridurre il numero di chiamate alla API.

Due: Il tuo bot sta diventando molto popolare e ha tanti utenti (centinaia di migliaia).
Ti sei già assicurato di fare il numero minimo di richieste alla API e _comunque_ incorri in questi errori (chiamati flood wait).

Ci sono un po' di cose che puoi fare.

1. Leggi [questo articolo della documentazione](/advanced/flood.md) per ottenere una comprensione base della situazione.
2. Utilizza [il plugin `transformer-throttler`](/plugins/transformer-throttler.md).
3. Utilizza [il plugin `auto-retry`](/plugins/auto-retry.md).
4. Vieni a chiedere aiuto nella nostra chat. Ci sono persone con molta esperienza.
5. È possibile chiedere a telegram di aumentare i limiti ma è altamente improbabile che succeda se non hai fatto i passaggi 1-3 prima.

## Domande Riguardanti Deno

### Perchè supportate Deno

Alcune delle motivazioni per cui preferiamo Deno a Node sono:

- È più facile e veloce iniziare.
- Gli strumenti sono decisamente migliori.
- Esegue TypeScript nativamente.
- Non serve mantenere `package.json` oppure `node_modules`.
- Ha una libreria standardizzata revisionata

> Deno è stato creato da Ryan Dahl, la stessa persona che ha inventato Node.js.
> Ha riassunto i suoi 10 rimorsi riguardo Node in [questo video](https://youtu.be/M3BM9TB-8yA).

grammY è scritto per supportare primariamente Deno ed essere retrocompatibile con Node.

### Dove posso eseguire un'app Deno?

Siccome deno è nuovo e il suo ecosistema piccolo, il numero di posti in cui puoi ospitare una app Deno sono inferiori rispetto a quelli per Node.js.

Qui alcune opzioni per ospitare un'app Deno:

1. [Cloudflare Workers](https://workers.dev)
2. [Deno Deploy](https://deno.com/deploy)
3. [Heroku](https://dev.to/ms314006/deploy-your-deno-apps-to-heroku-375h)
4. [Vercel](https://github.com/vercel-community/deno)