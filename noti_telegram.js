#!/usr/bin/env node

TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
BUILD_CODE = Number(process.env.CODE ?? '0')
TELEGRAM_MESSAGE = process.env.TELEGRAM_MESSAGE
  ? JSON.stringify(process.env.TELEGRAM_MESSAGE)
  : JSON.stringify(
      `VERCEL ${process.env.VERCEL_GIT_REPO_SLUG ?? 'notification'}:\n` +
        `env: ${process.env.CUSTOM_ENV ?? process.env.VERCEL_ENV}\n` +
        `url: ${process.env.CUSTOM_URL ?? process.env.VERCEL_URL}\n` +
        `sha: ${process.env.VERCEL_GIT_COMMIT_SHA}\n` +
        `status: ${BUILD_CODE === 0 ? 'Success' : 'Failed'}\n`,
    )

const child_process = require('child_process')

function runCmd(cmd) {
  const resp = child_process.execSync(cmd)
  return resp.toString('UTF8')
}

const cmd = `curl -X POST -H 'Content-Type: application/json' -d '{\"chat_id\": ${TELEGRAM_CHAT_ID}, \"text\": ${TELEGRAM_MESSAGE}, \"disable_notification\": false}' https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
const result = runCmd(cmd)

console.log(result)
