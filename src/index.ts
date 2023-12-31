import { TelegramBot, Context } from 'telegramsjs';
import { UserFromGetMe } from '@telegram.ts/types';
import { getPixivImage } from './services/pixiv/pixiv';

if (!process.env.ROBOT_TOKEN) {
  console.error('缺少 ROBOT_TOKEN 环境变量。请提供有效的 ROBOT_TOKEN 后再运行程序。');
  process.exit(1);
}

const bot = new TelegramBot(process.env.ROBOT_TOKEN);

function isCommand(ctx: Context): boolean {
  return ctx.entities?.[0]?.type === 'bot_command' && ctx.text.at(0) === '/';
}

bot.on('ready', async (client: UserFromGetMe) => {
  bot.setMyCommands({
    commands: [
      {
        command: '/start',
        description: 'starting command',
      },
      {
        command: '/remove',
        description: 'remove session',
      },
      {
        command: '/status',
        description: 'statistics session',
      },
      {
        command: '/setu',
        description: 'have a nice picture! r18 randomly~',
      },
      {
        command: '/echo',
        description: 'return the text you send!',
      },
    ],
  });

  console.log(`Starting ${client.username}`);
});

// bot.use({});

// bot.on('message', (ctx: Context) => {
//   if (isCommand(ctx)) return;
//   bot.session.counter = bot.session.counter || 0;
//   bot.session.counter++;
//   ctx.replyWithMarkdownV2(
//     `Counter updated, new value: \`${bot.session.counter}\``,
//   );
// });

bot.command('start', (ctx: Context) => {
  const username = ctx.from.username
    ? `@${ctx.from.username}`
    : ctx.from.first_name;
  ctx.replyWithMarkdown(`${username}, *thanks for using this robot ❤️*`);
});

bot.command('echo', (ctx: Context) => {
  const { text } = ctx;
  ctx.reply((text as string).substring(5).trimStart());
});

bot.command('test', (ctx: Context) => {
  console.log(ctx);
  // ctx.replyWithMarkdown(`${username}, *thanks for using telegramsjs ❤️*`);
});

bot.command('setu', async (ctx: Context) => {
  const pixivImg = await getPixivImage({});
  const { title, author, urls } = pixivImg || {};
  const { original } = urls || {};
  ctx.reply(`${original}
title: ${title}
author: ${author}
  `);
});

// bot.command('remove', (ctx: Context) => {
//   ctx.replyWithMarkdownV2(
//     `Removing session from database: \`${bot.session.counter}\``,
//   );
//   bot.session = null;
// });

bot.command('status', (ctx: Context) => {
  const username = ctx.from.username
    ? `@${ctx.from.username}`
    : ctx.from.first_name;
  ctx.replyWithMarkdown(`${username}, *thanks for using this robot ❤️*`);
});

bot.login();
