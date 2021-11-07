# FAQ

## Cos'è grammy?

grammY è un software che puoi usare quando vuoi programmare un tuo bot per [Telegram](https://telegram.org).
Quando crei bot ti accorgi che alcune parti di questo processo sono noiose e sempre uguali.
grammY fa queste cose per te rendendo facilissima la creazione di un bot.

## Quando è stato creato grammY?

La prima pubblicazione del codice di grammY è stata a fine Marzo 2021.
Ha raggiunto la prima versione stabile qualche settimana più tardi.

## Come viene sviluppato grammY?

grammY è completamente gratuito ed open source e viene sviluppato da un gruppo di volontari.
Il codice è disponibile su GitHub.

Sei benvenuto ad [unirti a noi](https://t.me/grammyjs)!

## Che linguaggio di programmazione usa grammY?

grammY è scritto completamente in TypeScript, un superset di JavaScript.
Può quindi esser eseguito su Node.js.
Tuttavia, grammY può anche essere eseguito su Deno, definito come il successore di Node.js.
(Tecnicamente, puoi eseguire grammY in un browser moderno, anche se questo tornerà raramente utile.)

## Come si compara grammY con altri software?

Se arrivi da un altro linguaggio di programmazione o un framework JavaScript diverso, puoi guardare la nostra [comparazione dettagliata](./comparison.md) tra framework.

## Perchè supportate Deno

Alcune delle motivazioni per cui preferiamo Deno a Node sono:

- È più facile e veloce iniziare.
- Gli strumenti sono decisamente migliori.
- Esegue TypeScript nativamente.
- Non serve mantenere `package.json` oppure `node_modules`.
- Ha una libreria standardizzata revisionata

> Deno è stato creato da Ry, la stessa persona che ha inventato Node.
> Ha riassunto i suoi 10 rimorsi riguardo Node in [questo video](https://youtu.be/M3BM9TB-8yA).

grammY è scritto per supportare primariamente Deno ed essere retrocompatibile con Node.

Ti potrebbe anche interessare [10 Things I Regret About Node.js - Ryan Dahl - JSConf EU](https://youtu.be/M3BM9TB-8yA).

## Dove posso eseguire un'app Deno?

Siccome deno è piccolo e il suo sistema piccolo, il numero di posti in cui puoi ospitare una app Deno sono inferiori rispetto a quelli per Node.js.
Qui alcune opzioni per ospitare un'app Deno:

1. [Cloudflare Workers](https://workers.dev)
2. [Deno Deploy](https://deno.com/deploy)
3. Heroku, [leggi qua](https://dev.to/ms314006/deploy-your-deno-apps-to-heroku-375h)
