#!/usr/bin/env bash

SERVERDIR="${PWD}/server"

echo `tput setaf 2`$'\n➤  Production server starting...\n'`tput sgr0`;

if [ ! -z "$1" ]; then
  NODE_ENV=production node --experimental-modules --no-warnings "${SERVERDIR}/prod.mjs"
  echo `tput setaf 6`$'\n➤  CTRL-C to exit \n'`tput sgr0`
else
  NODE_ENV=production nohup node --experimental-modules --no-warnings "${SERVERDIR}/prod.mjs" &
  echo `tput setaf 6`$'\n➤  Running in the background \n'`tput sgr0`
fi
