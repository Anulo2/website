# Sessions and Storing Data (built-in)

While you can always just write you own code to connect to a data storage of your choice, grammY supports a very convenient storage pattern called _sessions_.

> [Jump down](#how-to-use-sessions) if you know how sessions work.

## Why Must We Think About Storage?

In opposite to regular user accounts on Telegram, bots have [limited cloud storage](https://core.telegram.org/bots#4-how-are-bots-different-from-humans) in the Telegram cloud.
As a result, there are a few things you cannot do with bots:

1. You cannot access old messages that your bot received.
2. You cannot access old messages that your bot sent.
3. You cannot get a list of all chats with your bot.
4. More things, e.g. no media overview, etc

Basically, it boils down to the fact that **a bot only has access to the information of the currently incoming update** (e.g. message), i.e. the information that is available on the context object `ctx`.

Consequently, if you _do want to access_ old data, you have to store it as soon as it arrives.
This means that you must have a data storage, such as a file, a database, or an in-memory storage.

Of course, grammY has you covered here: you don't have to host this yourself.
You can just use the grammY session storage which needs zero setup and is free forever.

> Naturally, there are plenty of other services that offer data storage as a service, and grammY integrates seamlessly with them, too.
> If you want to run your own database, rest assured that grammY supports this equally well.
> [Scroll down](#known-storage-adapters) to see which integrations are currently available.

## What Are Sessions?

It is a very common thing for bots to store some piece of data per chat.
For example, let's say we want to build a bot that counts the number of times that a message contains the pizza emoji :pizza: in its text.
This bot could be added to a group, and it can tell you how much you and your friends like pizza.

When our pizza bot receives a message, it has to remember how many times it saw a :pizza: in that chat before.
The pizza count should of course not change when your sister adds the pizza bot to her group chat, so what we really want is to store _one counter per chat_.

Sessions are an elegant way to store data _per chat_.
You would use the chat identifier as the key in your database, and a counter as the value.
In this case, we would call the chat identifier the _session key_.

> You can read more about session keys [down here](#session-keys).

We can install middleware on the bot that will provide a chat's session data on `ctx.session` for every update by loading it from the database before our middleware runs.
It would also make sure that the session data is written back to the database once we're done, so that we never have to worry about actually communicating with the data storage anymore.

In our example, we would have access to the pizza count _of the corresponding chat_ on the session object `ctx.session`.

## How to Use Sessions

You can add session support to grammY by using the built-in session middleware.

### Example Usage

Here is an example bot that counts messages containing a pizza emoji :pizza::

<CodeGroup>
 <CodeGroupItem title="TypeScript" active>

```ts
import { Bot, Context, session, SessionFlavor } from "grammy";

// Define the shape of our session.
interface SessionData {
  pizzaCount: number;
}

// Flavor the context type to include sessions.
type MyContext = Context & SessionFlavor<SessionData>;

const bot = new Bot<MyContext>("");

// Install session middleware, and define the initial session value.
function initial(): SessionData {
  return { pizzaCount: 0 };
}
bot.use(session({ initial }));

bot.command("hunger", async (ctx) => {
  const count = ctx.session.pizzaCount;
  await ctx.reply(`Your hunger level is ${count}!`);
});

bot.hears(/.*🍕.*/, (ctx) => ctx.session.pizzaCount++);

bot.start();
```

</CodeGroupItem>
 <CodeGroupItem title="JavaScript">

```js
const { Bot, session } = require("grammy");

const bot = new Bot("");

// Install session middleware, and define the initial session value.
function initial() {
  return { pizzaCount: 0 };
}
bot.use(session({ initial }));

bot.command("hunger", async (ctx) => {
  const count = ctx.session.pizzaCount;
  await ctx.reply(`Your hunger level is ${count}!`);
});

bot.hears(/.*🍕.*/, (ctx) => ctx.session.pizzaCount++);

bot.start();
```

</CodeGroupItem>
 <CodeGroupItem title="Deno">

```ts
import {
  Bot,
  Context,
  session,
  SessionFlavor,
} from "https://deno.land/x/grammy/mod.ts";

// Define shape of our session.
interface SessionData {
  pizzaCount: number;
}

// Flavor the context type to include sessions.
type MyContext = Context & SessionFlavor<SessionData>;

const bot = new Bot<MyContext>("");

// Install session middleware, and define the initial session value.
function initial(): SessionData {
  return { pizzaCount: 0 };
}
bot.use(session({ initial }));

bot.command("hunger", async (ctx) => {
  const count = ctx.session.pizzaCount;
  await ctx.reply(`Your hunger level is ${count}!`);
});

bot.hears(/.*🍕.*/, (ctx) => ctx.session.pizzaCount++);

bot.start();
```

</CodeGroupItem>
</CodeGroup>

Note how we also have to [adjust the context type](/guide/context.md#customizing-the-context-object) to make the session available on it.
The context flavor is called `SessionFlavor`.

### Initial Session Data

When a user first contacts your bot, no session data is available for them.
It is therefore important that you specify the `initial` option for the session middleware.
Pass a function that generates a new object with initial session data for new chats.

```ts
// Creates a new object that will be used as initial session data.
function createInitialSessionData() {
  return {
    pizzaCount: 0,
    // more data here
  };
}
bot.use(session({ initial: createInitialSessionData }));
```

Same but much shorter:

```ts
bot.use(session({ initial: () => ({ pizzaCount: 0 }) }));
```

::: warning Sharing objects
Make sure to always create a _new object_.
Do **NOT** do this:

```ts
// DANGER, BAD, WRONG, STOP
const initialData = { pizzaCount: 0 }; // NOPE
bot.use(session({ initial: () => initialData })); // EVIL
```

If you would do this, several chats might share the same session object in memory.
Hence, changing the session data in one chat may accidentally impact the session data in the other chat.
:::

You may also omit the `initial` option entirely, even though you are well advised not to do that.
If you don't specify it, reading `ctx.session` will throw an error for new users.

### Session Keys

> This section describes an advanced feature that most people do not have to worry about.
> You may want to continue with the section about [storing your data](#storing-your-data).

You can specify which session key to use by passing a function called `getSessionKey` to the [options](https://doc.deno.land/https://deno.land/x/grammy/mod.ts/~/SessionOptions#getSessionKey).
That way, you can fundamentally change the way how the session plugin works.
By default, data is stored per chat.
Using `getSessionKey` allows you to store data per user, or per user-chat combination, or however you want.
Here are three examples:

<CodeGroup>
<CodeGroupItem title="TypeScript" active>

```ts
// Stores data per chat (default).
function getSessionKey(ctx: Context): string | undefined {
  // Let all users in a group chat share the same session,
  // but give an independent private one to each user in private chats
  return ctx.chat?.id.toString();
}

// Stores data per user.
function getSessionKey(ctx: Context): string | undefined {
  // Give every user their personal session storage
  // (will be shared across groups and in their private chat)
  return ctx.from?.id.toString();
}

// Stores data per user-chat combination.
function getSessionKey(ctx: Context): string | undefined {
  // Give every user their one personal session storage per chat with the bot
  // (an independent session for each group and their private chat)
  return ctx.from === undefined || ctx.chat === undefined
    ? undefined
    : `${ctx.from.id}/${ctx.chat.id}`;
}

bot.use(session({ getSessionKey }));
```

</CodeGroupItem>
<CodeGroupItem title="JavaScript">

```js
// Stores data per chat (default).
function getSessionKey(ctx) {
  // Let all users in a group chat share the same session,
  // but give an independent private one to each user in private chats
  return ctx.chat?.id.toString();
}

// Stores data per user.
function getSessionKey(ctx) {
  // Give every user their personal session storage
  // (will be shared across groups and in their private chat)
  return ctx.from?.id.toString();
}

// Stores data per user-chat combination.
function getSessionKey(ctx) {
  // Give every user their one personal session storage per chat with the bot
  // (an independent session for each group and their private chat)
  return ctx.from === undefined || ctx.chat === undefined
    ? undefined
    : `${ctx.from.id}/${ctx.chat.id}`;
}

bot.use(session({ getSessionKey }));
```

</CodeGroupItem>
</CodeGroup>

Whenever `getSessionKey` returns `undefined`, `ctx.session` will be `undefined`.
For example, the default session key resolver will not work for `poll`/`poll_answer` updates or `inline_query` updates because they do not belong to a chat (`ctx.chat` is `undefined`).

::: warning Session Keys and Webhooks
When you are running your bot on webhooks, you should avoid using the option `getSessionKey`.
Telegram sends webhooks sequentially per chat, so the default session key resolver is the only implementation that guarantees not to cause data loss.

If you must use the option (which is of course still possible), you should know what you are doing.
Make sure you understand the consequences of this configuration by reading [this](/guide/deployment-types.md) article and especially [this](/plugins/runner.html#sequential-processing-where-necessary) one.
:::

### Storing Your Data

In all examples above, the session data is stored in your RAM, so as soon as your bot is stopped, all data is lost.
This is convenient when you develop your bot or if you run automatic tests (no database setup needed), however, **that is most likely not desired in production**.
In production, you would want to persist your data, for example in a file, a database, or some other storage.

You should use the `storage` option of the session middleware to connect it to your datastore.
There may already be storage adapter written for grammY that you can use (see [below](#known-storage-adapters)), but if not, it usually only takes 5 lines of code to implement one yourself.

## Lazy Sessions

> This section describes a performance optimization that most people do not have to worry about.
> You may want to continue with the section about [known storage adapters](#known-storage-adapters).

Lazy sessions is an alternative implementation of sessions that can significantly reduce the database traffic of your bot by skipping superfluous read and write operations.

Let's assume that your bot is in a group chat where it does not respond to regular text messages, but only to commands.
Without sessions, this would happen:

1. Update with new text message is sent to your bot
2. No handler is invoked, so no action is taken
3. The middleware completes immediately

As soon as you install (default, strict) sessions, which directly provide the session data on the context object, this happens:

1. Update with new text message is sent to your bot
2. Session data is loaded from session storage (e.g. database)
3. No handler is invoked, so no action is taken
4. Identical session data is written back to session storage
5. The middleware completes, and has performed a read and a write to the data storage

Depending on the nature of your bot, this may lead to a lot of superfluous reads and writes.
Lazy sessions allow you to skip steps 2. and 4. if it turns out that no invoked handler needs session data.
In that case, no data will be read from the data storage, nor written back to it.

This is achieved by intercepting access to `ctx.session`.
If no handler is invoked, then `ctx.session` will never be accessed.
Lazy sessions use this as an indicator to prevent database communication.

In practice, instead of having the session data available under `ctx.session`, you will now have _a promise of the session data_ available under `ctx.session`.

```ts
// Default sessions (strict sessions)
bot.command("settings", (ctx) => {
  // `session` is the session data
  const session = ctx.session;
});

// Lazy sessions
bot.command("settings", async (ctx) => {
  // `promise` is a Promise of the session data, and
  const promise = ctx.session;
  // `session` is the session data
  const session = await ctx.session;
});
```

If you never access `ctx.session`, no operations will be performed, but as soon as you access the `session` property on the context object, the read operation will be triggered.
If you never trigger the read (or directly assign a new value to `ctx.session`), we know that we also won't need to write any data back, because there is no way it could have been altered.
Consequently, we skip the write operation, too.
As a result, we achieve minimal read and write operations, but you can use session almost identical to before, just with a few `async` and `await` keywords mixed into your code.

So what is necessary to use lazy sessions instead of the default (strict) ones?
You mainly have to do three things:

1. Flavor your context with `LazySessionFlavor` instead of `SessionFlavor`.
   They work the same way, just that `ctx.session` is wrapped inside a promise for the lazy variant.
2. Use `lazySession` instead of `session` to register your session middleware.
3. Always put an inline `await ctx.session` instead of `ctx.session` everywhere in your middleware, for both reads and writes.
   Don't worry: you can `await` the promise with your session data as many times as you want, but you will always refer to the same value, so there are never going to be duplicate reads for an update.

Note that with lazy sessions, you can assign both objects and promises of objects to `ctx.session`.
If you set `ctx.session` to be a promise, it will be `await`ed before writing the data back to the data storage.
This would allow for the following code:

```ts
bot.command("reset", (ctx) => {
  // Much shorter than having to `await ctx.session` first:
  ctx.session = ctx.session.then((stats) => {
    stats.counter = 0;
  });
});
```

One may argue well that explicitly using `await` is preferable over assigning a promise to `ctx.session`, the point is that you _could_ do this if you like that style better for some reason.

::: tip Plugins That Need Sessions
Plugin developers that make use of `ctx.session` should always allow users to pass `SessionFlavor | LazySessionFlavor` and hence support both modi.
In the plugin code, simply await `ctx.session` all the time: if a non-promise object is passed, this will simply be evaluated to itself, so you effectively only write code for lazy sessions and thus support strict sessions automatically.
:::

## Known Storage Adapters

By default, sessions will be stored [in your memory](#ram-default) by the built-in storage adapter.
You can also use persistent sessions that grammY [offers for free](#free-storage), or connect to [external storages](#external-storage-solutions).

This is how you can install one of the storage adapters from below.

```ts
const storageAdapter = ... // depends on setup

bot.use(session({
  initial: ...
  storage: storageAdapter,
}));
```

### RAM (default)

By default, all data will be stored in RAM.
This means that all sessions are lost as soon as your bot stops.

You can use the `MemorySessionStorage` class ([API Reference](https://doc.deno.land/https://deno.land/x/grammy/mod.ts/~/MemorySessionStorage)) from the grammY core package if you want to configure further things about storing data in RAM.

```ts
bot.use(session({
  initial: ...
  storage: new MemorySessionStorage() // also the default value
}));
```

### Free Storage

> The free storage is meant to be used in hobby projects.
> Production-scale applications should host their own database.
> The list of supported integrations of external storage solutions is [down here](#external-storage-solutions).

A benefit of using grammY is that you get access to free cloud storage.
It requires zero setup—all authentication is done using your bot token.
Check out [the repository](https://github.com/grammyjs/storages/tree/main/packages/free)!

It is very easy to use:

<CodeGroup>
<CodeGroupItem title="TypeScript" active>

```ts
import { freeStorage } from "@grammyjs/storage-free";

bot.use(session({
  initial: ...
  storage: freeStorage<SessionData>(bot.token),
}));
```

</CodeGroupItem>
<CodeGroupItem title="JavaScript">

```ts
const { freeStorage } = require("@grammyjs/storage-free");

bot.use(session({
  initial: ...
  storage: freeStorage(bot.token),
}));
```

</CodeGroupItem>
<CodeGroupItem title="Deno">

```ts
import { freeStorage } from "https://deno.land/x/grammy_storages@v2.0.0/free/src/mod.ts";

bot.use(session({
  initial: ...
  storage: freeStorage<SessionData>(bot.token),
}));
```

</CodeGroupItem>
</CodeGroup>

Done!
Your bot will now use a persistent data storage.

Here is a full example bot that you can copy to try it out.

<CodeGroup>
<CodeGroupItem title="TypeScript" active>

```ts
import { Bot, Context, session, SessionFlavor } from "grammy";
import { freeStorage } from "@grammyjs/storage-free";

// Define the session structure.
interface SessionData {
  count: number;
}
type MyContext = Context & SessionFlavor<SessionData>;

// Create the bot and register the session middleware.
const bot = new Bot<MyContext>(""); // <-- put your bot token between the ""

bot.use(session({
  initial: () => ({ count: 0 }),
  storage: freeStorage<SessionData>(bot.token),
}));

// Use persistent session data in update handlers.
bot.on("message", async (ctx) => {
  ctx.session.count++;
  await ctx.reply(`Message count: ${ctx.session.count}`);
});

bot.catch((err) => console.error(err));
bot.start();
```

</CodeGroupItem>
<CodeGroupItem title="JavaScript">

```ts
const { Bot, session } = require("grammy");
const { freeStorage } = require("@grammyjs/storage-free");

// Create the bot and register the session middleware.
const bot = new Bot(""); // <-- put your bot token between the ""

bot.use(session({
  initial: () => ({ count: 0 }),
  storage: freeStorage(bot.token),
}));

// Use persistent session data in update handlers.
bot.on("message", async (ctx) => {
  ctx.session.count++;
  await ctx.reply(`Message count: ${ctx.session.count}`);
});

bot.catch((err) => console.error(err));
bot.start();
```

</CodeGroupItem>
<CodeGroupItem title="Deno">

```ts
import {
  Bot,
  Context,
  session,
  SessionFlavor,
} from "https://deno.land/x/grammy/mod.ts";
import { freeStorage } from "https://deno.land/x/grammy_storages@v2.0.0/free/src/mod.ts";

// Define the session structure.
interface SessionData {
  count: number;
}
type MyContext = Context & SessionFlavor<SessionData>;

// Create the bot and register the session middleware.
const bot = new Bot<MyContext>(""); // <-- put your bot token between the ""

bot.use(session({
  initial: () => ({ count: 0 }),
  storage: freeStorage<SessionData>(bot.token),
}));

// Use persistent session data in update handlers.
bot.on("message", async (ctx) => {
  ctx.session.count++;
  await ctx.reply(`Message count: ${ctx.session.count}`);
});

bot.catch((err) => console.error(err));
bot.start();
```

</CodeGroupItem>
</CodeGroup>

### External Storage Solutions

We maintain a list of official storage adapters that allow you to store your session data in different places.
Each of them will require you to register at a hosting provider, or to host your own storage solution.
Check out the respective repositories about each individual setup.

- Supabase: <https://github.com/grammyjs/storages/tree/main/packages/supabase>
- Deta.sh Base: <https://github.com/grammyjs/storages/tree/main/packages/deta>
- Google Firestore (Node.js-only): <https://github.com/grammyjs/storages/tree/main/packages/firestore>
- Files: <https://github.com/grammyjs/storages/tree/main/packages/file>
- MongoDB: <https://github.com/grammyjs/storages/tree/main/packages/mongodb>
- Redis: <https://github.com/grammyjs/storages/tree/main/packages/redis>
- PostgreSQL: <https://github.com/grammyjs/storages/tree/main/packages/psql>
- TypeORM (Node.js-only): <https://github.com/grammyjs/storages/tree/main/packages/typeorm>
- DenoDB (Deno-only): <https://github.com/grammyjs/storages/tree/main/packages/denodb>

::: tip Your storage is not supported? No problem!
Creating a custom storage adapter is extremely simple.
The `storage` option works with any object that adheres to [this interface](https://doc.deno.land/https://deno.land/x/grammy/mod.ts/~/StorageAdapter), so you can connect to your storage just in a few lines of code.

> If you published your own storage adapter, feel free edit this page and link it here, so that other people can use it.

:::

## Plugin Summary

This plugin is built-in into the core of grammY.
You don't need to install anything to use it.
Simply import everything from grammY itself.

Also, both the documentation and the API reference of this plugin are unified with the core package.
