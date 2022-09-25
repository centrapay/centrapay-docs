#!/usr/bin/env node

'use strict';

function errorExit(e) {
  console.error(e);
  process.exit(1);
}

let argv = process.argv.slice(2);
const args = {
  repo: null,
  number: null,
  title: null,
  description: '',
  user: null,
  link: null,
};

while(argv.length) {
  const arg = argv.shift();
  switch (arg) {
  case '--repo':
    args.repo = argv.shift();
    break;
  case '--number':
    args.number = argv.shift();
    break;
  case '--title':
    args.title = argv.shift();
    break;
  case '--desc':
    args.description = argv.shift();
    break;
  case '--link':
    args.link = argv.shift();
    break;
  case '--user':
    args.user = argv.shift();
    break;
  default:
    errorExit(`Unexpected arg: ${arg}`);
  }
}

Object.entries(args).forEach(([k,v]) => {
  if (v === null) {
    errorExit(`Missing required arg: ${k}`);
  }
});


/*
 * https://api.slack.com/messaging/composing/layouts
 */
const slackMessage = {
  blocks: [
    {
      text: {
        text: `New PR for *${args.repo}* by ${args.user}`,
        type: 'mrkdwn',
      },
      type: 'section'
    },
    {
      text: {
        text: `<${args.link}|#${args.number} ${args.title}>`,
        type: 'mrkdwn',
      },
      type: 'section',
    },
  ]
};

if (args.description.length) {
  slackMessage.blocks.push({
    text: {
      text: args.description,
      type: 'mrkdwn',
    },
    type: 'section',
  });
}

process.stdout.write(JSON.stringify(slackMessage));
