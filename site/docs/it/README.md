---
home: true
heroImage: /Y.png
actions:
  - text: Inizia
    link: /it/guide/getting-started.md
    type: primary
  - text: Introduzione
    link: /it/guide/introduction.md
    type: secondary
features:
  - title: Facile da usare
    details: grammY rende la creazione di bot Telegram talmente facile che sai già come si fa.
  - title: Flessibile
    details: grammY è aperto e può essere esteso da aggiunte adatte alle tue necessità.
  - title: Scalabile
    details: grammY sosterrà il tuo bot quando diventerà popolare ed il traffico aumenterà.
footer: Copyright © 2021
permalink: /
---

<h6 align="right">… {{ [
  'serve dire altro?',
  'una nuova era per lo sviluppo di bot',
  'corre più veloce di te',
  'sempre un  passo avanti',
  'fa tutto tranne il caffè',
  'facile come bere un bicchiere d\'acqua'
][Math.floor(Math.random() * 6)] }}.</h6>

## Panoramica

I bot sono scritti in [TypeScript](https://www.typescriptlang.org) (oppure JavaScript) e funzionano su varie piattaforme, incluso [Node.js](https://nodejs.org).

`npm install grammy` ed incolla il seguente codice:

<CodeGroup>
  <CodeGroupItem title="TS" active>

```ts
import { Bot } from "grammy";

const bot = new Bot(""); // <-- metti il token del tuo bot qui (https://t.me/BotFather)

// Rispondi a tutti i messaggi con "Ciao!"
bot.on("message", (ctx) => ctx.reply("Ciao!"));

bot.start();
```

</CodeGroupItem>
 <CodeGroupItem title="JS">

```ts
const { Bot } = require("grammy");

const bot = new Bot(""); // <-- metti il token del tuo bot qui (https://t.me/BotFather)

// Rispondi a tutti i messaggi con "Ciao!"
bot.on("message", (ctx) => ctx.reply("Ciao!"));

bot.start();
```

</CodeGroupItem>
 <CodeGroupItem title="Deno">

```ts
import { Bot } from "https://deno.land/x/grammy/mod.ts";

const bot = new Bot(""); // <-- metti il token del tuo bot qui (https://t.me/BotFather)

// Rispondi a tutti i messaggi con "Ciao!"
bot.on("message", (ctx) => ctx.reply("Ciao!"));

bot.start();
```

</CodeGroupItem>
</CodeGroup>

Funziona! :tada:

---

grammY Supporta la Telegram Bot API 5.4 [rilasciata](https://core.telegram.org/bots/api#november-5-2021) il 5 Novembre 2021.
(Ultima cosa in evidenza: Richieste di entrata)
