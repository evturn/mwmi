#!/usr/bin/env bash

SERVERDIR="${PWD}/server"

echo `tput setaf 2`$'\n➤  Production server starting...\n'`tput sgr0`;

node --experimental-modules --no-warnings "${SERVERDIR}/prod.mjs";
