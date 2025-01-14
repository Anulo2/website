import {
  defaultTheme,
  type DefaultThemeOptions,
  defineUserConfig,
} from "vuepress-vite";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default defineUserConfig({
  title: "grammY",
  description: "The Telegram Bot Framework.",

  locales: {
    "/": {
      lang: "en-US",
      title: "grammY",
      description: "The Telegram Bot Framework.",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "grammY",
      description: "Telegram Bot 框架",
    },
    "/it/": {
      lang: "it-IT",
      title: "grammY",
      description: "Telegram Bot Framework",
    }
  },
  shouldPrefetch: true,

  theme: defaultTheme({
    logo: "/Y.png",
    locales: {
      "/": {
        selectLanguageName: "English",
        editLinkText: "Edit this page on GitHub",
        notFound: [
          "Not Found",
          "Nope.",
          "nothin' here for ya, sorry",
          "Error 404/ This Page Could Not Be Found But/ A Haiku Instead",
          "Country rooooaaaads,",
        ],
        backToHome: "Take me hoooooooome",
        navbar: [
          { text: "Guide", link: "/guide/" },
          {
            text: "Learn",
            children: [
              {
                text: "Guide",
                children: [
                  {
                    text: "Overview",
                    link: "/guide/README.md",
                  },
                  {
                    text: "Introduction",
                    link: "/guide/introduction.md",
                  },
                  {
                    text: "Getting Started",
                    link: "/guide/getting-started.md",
                  },
                  {
                    text: "Sending and Receiving Messages",
                    link: "/guide/basics.md",
                  },
                  {
                    text: "Context",
                    link: "/guide/context.md",
                  },
                  {
                    text: "Bot API",
                    link: "/guide/api.md",
                  },
                  {
                    text: "Filter Queries and bot.on()",
                    link: "/guide/filter-queries.md",
                  },
                  {
                    text: "Commands",
                    link: "/guide/commands.md",
                  },
                  {
                    text: "Middleware",
                    link: "/guide/middleware.md",
                  },
                  {
                    text: "Error Handling",
                    link: "/guide/errors.md",
                  },
                  {
                    text: "Inline Queries",
                    link: "/guide/inline-queries.md",
                  },
                  {
                    text: "File Handling",
                    link: "/guide/files.md",
                  },
                  {
                    text: "Games",
                    link: "/guide/games.md",
                  },
                  {
                    text: "Long Polling vs. Webhooks",
                    link: "/guide/deployment-types.md",
                  },
                ],
              },
              {
                text: "Advanced",
                children: [
                  {
                    text: "Overview",
                    link: "/advanced/README.md",
                  },
                  {
                    text: "Middleware Redux",
                    link: "/advanced/middleware.md",
                  },
                  {
                    text: "Scaling Up I: Large Codebase",
                    link: "/advanced/structuring.md",
                  },
                  {
                    text: "Scaling Up II: High Load",
                    link: "/advanced/scaling.md",
                  },
                  {
                    text: "Scaling Up III: Reliability",
                    link: "/advanced/reliability.md",
                  },
                  {
                    text: "Scaling Up IV: Flood Limits",
                    link: "/advanced/flood.md",
                  },
                  {
                    text: "Bot API Transformers",
                    link: "/advanced/transformers.md",
                  },
                  {
                    text: "Proxy Support",
                    link: "/advanced/proxy.md",
                  },
                  {
                    text: "Deployment Checklist",
                    link: "/advanced/deployment.md",
                  },
                ],
              },
            ],
          },
          {
            text: "Plugins",
            children: [
              {
                text: "Introduction",
                children: [
                  {
                    text: "About Plugins",
                    link: "/plugins/README.md",
                  },
                  {
                    text: "How to Write a Plugin",
                    link: "/plugins/guide.md",
                  },
                ],
              },
              {
                text: "Built-in",
                children: [
                  {
                    text: "Sessions and Storing Data",
                    link: "/plugins/session.md",
                  },
                  {
                    text: "Inline and Custom Keyboards",
                    link: "/plugins/keyboard.md",
                  },
                ],
              },
              {
                text: "Official",
                children: [
                  {
                    text: "Interactive Menus (menu)",
                    link: "/plugins/menu.md",
                  },
                  {
                    text: "Stateless Question (stateless-question)",
                    link: "/plugins/stateless-question.md",
                  },
                  {
                    text: "Concurrency (runner)",
                    link: "/plugins/runner.md",
                  },
                  {
                    text: "Hydration (hydrate)",
                    link: "/plugins/hydrate.md",
                  },
                  {
                    text: "Retry API Requests (auto-retry)",
                    link: "/plugins/auto-retry.md",
                  },
                  {
                    text: "Flood Control (transformer-throttler)",
                    link: "/plugins/transformer-throttler.md",
                  },
                  {
                    text: "Rate Limit Users (ratelimiter)",
                    link: "/plugins/ratelimiter.md",
                  },
                  {
                    text: "Files (files)",
                    link: "/plugins/files.md",
                  },
                  {
                    text: "Internationalization (fluent)",
                    link: "/plugins/fluent.md",
                  },
                  {
                    text: "Router (router)",
                    link: "/plugins/router.md",
                  },
                  {
                    text: "Emoji (emoji)",
                    link: "/plugins/emoji.md",
                  },
                  {
                    text: "Parse Mode (parse-mode)",
                    link: "/plugins/parse-mode.md",
                  },
                  {
                    text: "Command Filtering (command-filter)",
                    link: "/plugins/command-filter.md",
                  },
                ],
              },
              {
                text: "Third-party",
                children: [
                  {
                    text: "Console Time",
                    link: "/plugins/console-time.md",
                  },
                  {
                    text: "Useful Middleware",
                    link: "/plugins/middlewares.md",
                  },
                  {
                    text: "[Submit your PR!]",
                    link:
                      "/plugins/README.md#submitting-your-own-package-to-the-docs",
                  },
                ],
              },
            ],
          },
          {
            text: "Examples",
            children: [
              {
                text: "Examples",
                children: [
                  {
                    text: "Awesome grammY",
                    link: "https://github.com/grammyjs/awesome-grammY",
                  },
                  {
                    text: "Example Bots Repository",
                    link: "https://github.com/grammyjs/examples",
                  },
                  {
                    text: "Live Browser Demo",
                    link: "/demo/README.md",
                  },
                  { text: "Example Bots", link: "/demo/examples.md" },
                ],
              },
            ],
          },
          {
            text: "Resources",
            children: [
              {
                text: "grammY",
                children: [
                  {
                    text: "About grammY",
                    link: "/resources/about.md",
                  },
                  {
                    text: "Community Chat (English)",
                    link: "https://t.me/grammyjs",
                  },
                  {
                    text: "Community Chat (Russian)",
                    link: "https://t.me/grammyjs_ru",
                  },
                  {
                    text: "News",
                    link: "https://t.me/grammyjs_news",
                  },
                  {
                    text: "FAQ",
                    link: "/resources/faq.md",
                  },
                  {
                    text: "Comparison to Other Frameworks",
                    link: "/resources/comparison.md",
                  },
                ],
              },
              {
                text: "Telegram",
                children: [
                  {
                    text: "Introduction for Developers",
                    link: "https://core.telegram.org/bots",
                  },
                  {
                    text: "Bots FAQ",
                    link: "https://core.telegram.org/bots/faq",
                  },
                  {
                    text: "Bot API Reference",
                    link: "https://core.telegram.org/bots/api",
                  },
                  {
                    text: "Example Updates",
                    link:
                      "https://core.telegram.org/bots/webhooks#testing-your-bot-with-updates",
                  },
                ],
              },
              {
                text: "Hosting",
                children: [
                  {
                    text: "Deno Deploy",
                    link: "/hosting/deno-deploy.md",
                  },
                  {
                    text: "Heroku",
                    link: "/hosting/heroku.md",
                  },
                  {
                    text: "Google Cloud Functions",
                    link: "/hosting/gcf.md",
                  },
                  {
                    text: "Virtual Private Server",
                    link: "/hosting/vps.md",
                  },
                ],
              },
            ],
          },
          {
            text: "API Reference",
            link: "https://doc.deno.land/https://deno.land/x/grammy/mod.ts",
          },
        ],
      },
      "/it/": {
        selectLanguageText: "Lingue",
        selectLanguageName: "Italiano",
        editLinkText: "Modifica questa pagina su GitHub",
        notFound: [
          "Non trovato",
          "No.",
          "Non c'è nulla qua",
          "Errore 404/La pagina non è stata trovata",
          "Così marlena,",
        ],
        backToHome: "Torna a casa",
        navbar: [
          { text: "Guide", link: "/it/guide/" },
          {
            text: "Impara",
            children: [
              {
                text: "Guida",
                children: [
                  {
                    text: "Panoramica",
                    link: "/it/guide/README.md",
                  },
                  {
                    text: "Introduzione",
                    link: "/it/guide/introduction.md",
                  },
                  {
                    text: "Iniziare",
                    link: "/it/guide/getting-started.md",
                  },
                  {
                    text: "Ricevere e mandare messaggi",
                    link: "/it/guide/basics.md",
                  },
                  {
                    text: "Contesto",
                    link: "/it/guide/context.md",
                  },
                  {
                    text: "Bot API",
                    link: "/it/guide/api.md",
                  },
                  {
                    text: "Filtrare le query e bot.on()",
                    link: "/it/guide/filter-queries.md",
                  },
                  {
                    text: "Comandi",
                    link: "/it/guide/commands.md",
                  },
                  {
                    text: "Intermediario",
                    link: "/it/guide/middleware.md",
                  },
                  {
                    text: "Gestione degli errori",
                    link: "/it/guide/errors.md",
                  },
                  {
                    text: "Query in linea",
                    link: "/it/guide/inline-queries.md",
                  },
                  {
                    text: "Gestione dei file",
                    link: "/it/guide/files.md",
                  },
                  {
                    text: "Giochi",
                    link: "/it/guide/games.md",
                  },
                  {
                    text: "Richieste continue vs. Webhook",
                    link: "/it/guide/deployment-types.md",
                  },
                ],
              },
              {
                text: "Avanzate",
                children: [
                  {
                    text: "Panoramica",
                    link: "/it/advanced/README.md",
                  },
                  {
                    text: "Riorganizzare l'intermediario",
                    link: "/it/advanced/middleware.md",
                  },
                  {
                    text: "Scalare I: grande base di codice",
                    link: "/it/advanced/structuring.md",
                  },
                  {
                    text: "Scalare II: Grandi carichi",
                    link: "/it/advanced/scaling.md",
                  },
                  {
                    text: "Scalare III: Affidabilità",
                    link: "/it/advanced/reliability.md",
                  },
                  {
                    text: "Scalare IV: Limitazioni per flood",
                    link: "/it/advanced/flood.md",
                  },
                  {
                    text: "Bot API Transformers",
                    link: "/it/advanced/transformers.md",
                  },
                  {
                    text: "Supporto ai proxy",
                    link: "/it/advanced/proxy.md",
                  },
                  {
                    text: "Indicazioni per rilasciarlo",
                    link: "/it/advanced/deployment.md",
                  },
                ],
              },
            ],
          },
          {
            text: "Estensioni",
            children: [
              {
                text: "Introduzione",
                children: [
                  {
                    text: "Riguardo le Estensioni",
                    link: "/it/plugins/README.md",
                  },
                ],
              },
              {
                text: "Ufficiali",
                children: [
                  {
                    text: "Sessioni e salvare dati (built-in)",
                    link: "/it/plugins/session.md",
                  },
                  {
                    text: "Tastiere e Tastiere in linea (built-in)",
                    link: "/it/plugins/keyboard.md",
                  },
                  {
                    text: "Menu iterativi (menu)",
                    link: "/it/plugins/menu.md",
                  },
                  {
                    text: "Domande prive di stato (stateless-question)",
                    link: "/it/plugins/stateless-question.md",
                  },
                  {
                    text: "Concorrenza (runner)",
                    link: "/it/plugins/runner.md",
                  },
                  {
                    text: "Hydration (hydrate)",
                    link: "/it/plugins/hydrate.md",
                  },
                  {
                    text: " (auto-retry)",
                    link: "/plugins/auto-retry.md",
                  },
                  {
                    text: "Flood control (transformer-throttler)",
                    link: "/plugins/transformer-throttler.md",
                  },
                  {
                    text: "Rate limit users (ratelimiter)",
                    link: "/plugins/ratelimiter.md",
                  },
                  {
                    text: "Files (files)",
                    link: "/plugins/files.md",
                  },
                  {
                    text: "Internationalization (i18n)",
                    link: "/plugins/i18n.md",
                  },
                  {
                    text: "Router (router)",
                    link: "/plugins/router.md",
                  },
                  {
                    text: "Parse Mode (parse-mode)",
                    link: "/plugins/parse-mode.md",
                  },
                  {
                    text: "Command filtering (command-fiter)",
                    link: "/plugins/command-filter.md",
                  },
                ],
              },
              {
                text: "Third-party",
                children: [
                  {
                    text: "Console time",
                    link: "/plugins/console-time.md",
                  },
                  {
                    text: "[Submit your PR!]",
                    link:
                      "/plugins/README.md#submitting-your-own-package-to-the-docs",
                  },
                ],
              },
            ],
          },
          {
            text: "Esempi",
            children: [
              {
                text: "Esempi",
                children: [
                  {
                    text: "Repository dei Bot di esempio",
                    link: "https://github.com/grammyjs/examples",
                  },
                  {
                    text: "Provalo nel Browser",
                    link: "/it/demo/README.md",
                  },
                  { text: "Bot d'esempio", link: "/it/demo/examples.md" },
                  {
                    text: "Fatti dagli utenti",
                    link: "/it/demo/showlounge.md",
                  },
                ],
              },
            ],
          },
          {
            text: "Risorse",
            children: [
              {
                text: "grammY",
                children: [
                  {
                    text: "Chat della comunità",
                    link: "https://t.me/grammyjs",
                  },
                  {
                    text: "Awesome grammY",
                    link: "https://github.com/grammyjs/awesome-grammY",
                  },
                  {
                    text: "Novità",
                    link: "https://t.me/grammyjs_news",
                  },
                  {
                    text: "FAQ",
                    link: "/it/resources/faq.md",
                  },
                  {
                    text: "Comparazione con altri framework",
                    link: "/it/resources/comparison.md",
                  },
                ],
              },
              {
                text: "Telegram",
                children: [
                  {
                    text: "Introduzione per Sviuppatori",
                    link: "https://core.telegram.org/bots",
                  },
                  {
                    text: "Bot FAQ",
                    link: "https://core.telegram.org/bots/faq",
                  },
                  {
                    text: "Riferimenti per la API del Bot",
                    link: "https://core.telegram.org/bots/api",
                  },
                ],
              },
              {
                text: "Esecuzione",
                children: [
                  {
                    text: "Heroku",
                    link: "/it/hosting/heroku.md",
                  },
                  {
                    text: "Google Cloud Functions",
                    link: "/it/hosting/gcf.md",
                  },
                ],
              },
            ],
          },
          {
            text: "Riferimento API",
            link: "https://doc.deno.land/https/deno.land/x/grammy/mod.ts",
          },
        ],
      },
      "/zh/": {
        selectLanguageText: "语言",
        selectLanguageName: "简体中文",
        editLinks: true,
        editLinkText: "在 GitHub 上编辑此页！",
        contributorsText: "贡献者",
        lastUpdatedText: "最近更新时间",
        notFound: [
          "糟糕！这个页面不存在。",
          "无",
          "抱歉，这里还不存在内容。",
          "Error 404/ 页面不存在，但一只小可爱替代了他~",
          "回家吧，回到最初的美好。",
        ],
        backToHome: "回到首页",
        navbar: [
          { text: "基础", link: "/zh/guide/" },
          {
            text: "了解",
            children: [
              {
                text: "基础",
                children: [
                  {
                    text: "概述",
                    link: "/zh/guide/README.md",
                  },
                  {
                    text: "简介",
                    link: "/zh/guide/introduction.md",
                  },
                  {
                    text: "入门",
                    link: "/zh/guide/getting-started.md",
                  },
                  {
                    text: "发送和接收消息",
                    link: "/zh/guide/basics.md",
                  },
                  {
                    text: "上下文",
                    link: "/zh/guide/context.md",
                  },
                  {
                    text: "Bot API",
                    link: "/zh/guide/api.md",
                  },
                  {
                    text: "Filter 查询与 bot.on()",
                    link: "/zh/guide/filter-queries.md",
                  },
                  {
                    text: "Commands",
                    link: "/zh/guide/commands.md",
                  },
                  {
                    text: "中间件",
                    link: "/zh/guide/middleware.md",
                  },
                  {
                    text: "错误处理",
                    link: "/zh/guide/errors.md",
                  },
                  {
                    text: "Inline Queries",
                    link: "/zh/guide/inline-queries.md",
                  },
                  {
                    text: "文件管理",
                    link: "/zh/guide/files.md",
                  },
                  {
                    text: "游戏",
                    link: "/zh/guide/games.md",
                  },
                  {
                    text: "长轮询 vs. Webhooks",
                    link: "/zh/guide/deployment-types.md",
                  },
                ],
              },
              {
                text: "进阶",
                children: [
                  {
                    text: "概述",
                    link: "/zh/advanced/README.md",
                  },
                  {
                    text: "重构中间件",
                    link: "/zh/advanced/middleware.md",
                  },
                  {
                    text: "I: 代码组织",
                    link: "/zh/advanced/structuring.md",
                  },
                  {
                    text: "II: 高负载",
                    link: "/zh/advanced/scaling.md",
                  },
                  {
                    text: "III: 可靠性",
                    link: "/zh/advanced/reliability.md",
                  },
                  {
                    text: "IV: 流量限制",
                    link: "/zh/advanced/flood.md",
                  },
                  {
                    text: "Bot API Transformers",
                    link: "/zh/advanced/transformers.md",
                  },
                  {
                    text: "代理支持",
                    link: "/zh/advanced/proxy.md",
                  },
                  {
                    text: "部署",
                    link: "/zh/advanced/deployment.md",
                  },
                ],
              },
            ],
          },
          {
            text: "插件",
            children: [
              {
                text: "简介",
                children: [
                  {
                    text: "关于插件",
                    link: "/zh/plugins/README.md",
                  },
                  {
                    text: "如何编写一个插件",
                    link: "/zh/plugins/guide.md",
                  },
                ],
              },
              {
                text: "内置插件",
                children: [
                  {
                    text: "会话与数据储存",
                    link: "/zh/plugins/session.md",
                  },
                  {
                    text: "Inline 与自定义 Keyboards",
                    link: "/zh/plugins/keyboard.md",
                  },
                ],
              },
              {
                text: "官方维护",
                children: [
                  {
                    text: "互动菜单（menu）",
                    link: "/zh/plugins/menu.md",
                  },
                  {
                    text: "无状态问题 (stateless-question)",
                    link: "/zh/plugins/stateless-question.md",
                  },
                  {
                    text: "并发 (runner)",
                    link: "/zh/plugins/runner.md",
                  },
                  {
                    text: "Hydration (hydrate)",
                    link: "/zh/plugins/hydrate.md",
                  },
                  {
                    text: "重试 API 请求 (auto-retry)",
                    link: "/zh/plugins/auto-retry.md",
                  },
                  {
                    text: "流量控制 (transformer-throttler)",
                    link: "/zh/plugins/transformer-throttler.md",
                  },
                  {
                    text: "限制用户速率 (ratelimiter)",
                    link: "/zh/plugins/ratelimiter.md",
                  },
                  {
                    text: "文件助手 (files)",
                    link: "/zh/plugins/files.md",
                  },
                  {
                    text: "国际化 (fluent)",
                    link: "/zh/plugins/fluent.md",
                  },
                  {
                    text: "路由器 (router)",
                    link: "/zh/plugins/router.md",
                  },
                  {
                    text: "Emoji (emoji)",
                    link: "/zh/plugins/emoji.md",
                  },
                  {
                    text: "解析模式 (parse-mode)",
                    link: "/zh/plugins/parse-mode.md",
                  },
                  {
                    text: "指令过滤 (command-fiter)",
                    link: "/zh/plugins/command-filter.md",
                  },
                ],
              },
              {
                text: "第三方",
                children: [
                  {
                    text: "调试时输出日志",
                    link: "/zh/plugins/console-time.md",
                  },
                  {
                    text: "有用的中间件",
                    link: "/zh/plugins/middlewares.md",
                  },
                  {
                    text: "[等待你的 PR!]",
                    link: "/zh/plugins/README.md#向文档提交你自己的插件",
                  },
                ],
              },
            ],
          },
          {
            text: "示例",
            children: [
              {
                text: "示例",
                children: [
                  {
                    text: "Awesome grammY",
                    link: "https://github.com/grammyjs/awesome-grammY",
                  },
                  {
                    text: "示例 Bots 仓库",
                    link: "https://github.com/grammyjs/examples",
                  },
                  {
                    text: "在线 Demo",
                    link: "/zh/demo/README.md",
                  },
                  {
                    text: "示例 Bots",
                    link: "/zh/demo/examples.md",
                  },
                ],
              },
            ],
          },
          {
            text: "资源",
            children: [
              {
                text: "grammY",
                children: [
                  {
                    text: "关于 grammY",
                    link: "/zh/resources/about.md",
                  },
                  {
                    text: "社区聊天（英语）",
                    link: "https://t.me/grammyjs",
                  },
                  {
                    text: "社区聊天（俄语）",
                    link: "https://t.me/grammyjs_ru",
                  },
                  {
                    text: "咨询",
                    link: "https://t.me/grammyjs_news",
                  },
                  {
                    text: "FAQ",
                    link: "/zh/resources/faq.md",
                  },
                  {
                    text: "与其他框架的比较",
                    link: "/zh/resources/comparison.md",
                  },
                ],
              },
              {
                text: "Telegram",
                children: [
                  {
                    text: "面向开发者的介绍",
                    link: "https://core.telegram.org/bots",
                  },
                  {
                    text: "Bots FAQ",
                    link: "https://core.telegram.org/bots/faq",
                  },
                  {
                    text: "Bot API 概览",
                    link: "https://core.telegram.org/bots/api",
                  },
                  {
                    text: "Updates 示例",
                    link:
                      "https://core.telegram.org/bots/webhooks#testing-your-bot-with-updates",
                  },
                ],
              },
              {
                text: "托管服务",
                children: [
                  {
                    text: "Deno Deploy",
                    link: "/zh/hosting/deno-deploy.md",
                  },
                  {
                    text: "Heroku",
                    link: "/zh/hosting/heroku.md",
                  },
                  {
                    text: "Google Cloud Functions",
                    link: "/zh/hosting/gcf.md",
                  },
                  {
                    text: "Virtual Private Server",
                    link: "/zh/hosting/vps.md",
                  },
                ],
              },
            ],
          },
          {
            text: "API 参考",
            link: "https://doc.deno.land/https://deno.land/x/grammy/mod.ts",
          },
        ],
      },
    },
    repo: "https://github.com/grammyjs/grammY",
    docsRepo: "https://github.com/grammyjs/website",
    docsDir: "site/docs",
    docsBranch: "main",
    editLink: true,
    editLinkPattern: ":repo/edit/:branch/:path",
    repoLabel: "GitHub",
  }),
  plugins: [
    [
      docsearchPlugin({
        apiKey: "33782ffb584887e3b8cdf9e760ea8e60",
        indexName: "grammy",
        appId: "RBF5Q0D7QV",
        placeholder: "Search",
        locales: {
          "/zh/": {
            placeholder: "搜索文档",
            translations: { button: { buttonText: "搜索文档" } },
          },
        },
      }),
    ],
    [
      {
        name: "break-long-inline-code-snippets",
        extendsMarkdown: (md) => {
          md.renderer.rules.code_inline = (
            tokens,
            idx,
            _opts,
            _env,
            slf,
          ) => {
            const token = tokens[idx];
            const attributes = slf.renderAttrs(token);
            const withBreaks = insertWbrTags(token.content);
            const escaped = escapeHtml(withBreaks);
            return `<code${attributes}>${escaped}</code>`;
          };
        },
      },
    ],
  ],
  markdown: {
    typographer: true,
  },
});

// Adapted from original `code_inline` implementation of markdown-it.
const HTML_ESCAPE_TEST_RE = /&|<(?!wbr>)|(?<!<wbr)>/;
const HTML_ESCAPE_REPLACE_RE = /&|<(?!wbr>)|(?<!<wbr)>/g;
const HTML_REPLACEMENTS: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};
function replaceUnsafeChar(ch: string) {
  return HTML_REPLACEMENTS[ch];
}
function escapeHtml(str: string) {
  return HTML_ESCAPE_TEST_RE.test(str)
    ? str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar)
    : str;
}

function insertWbrTags(url: string) {
  // Adapted from https://css-tricks.com/better-line-breaks-for-long-urls/
  return url
    .split("//")
    .map(
      (str) =>
        str
          // Insert a word break opportunity after a colon
          .replace(/(?<after>:)/giu, "$1<wbr>")
          // Before a single slash, tilde, period, comma, hyphen, underline, question mark, number sign, or percent symbol
          .replace(/(?<before>[/~.,\-_?#%])/giu, "<wbr>$1")
          // Before and after an equals sign or ampersand
          .replace(/(?<beforeAndAfter>[=&])/giu, "<wbr>$1<wbr>"),
    )
    // Reconnect the strings with word break opportunities after double slashes
    .join("//<wbr>");
}
