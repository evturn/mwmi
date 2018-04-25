#!/usr/bin/env bash

BUILDDIR="${PWD}/build"
TOOLSDIR="${PWD}/tools"
PUBLICDIR="${PWD}/public"

echo `tput setaf 6`$'\n➤  Building project...'`tput sgr0`;

if [ -d $BUILDDIR ]; then
  rm -rf $BUILDDIR;
  echo `tput setaf 2`$'✓  Removed old files.\n'`tput sgr0`;
fi

mkdir "${BUILDDIR}/"

echo `tput setaf 6`$'\n➤  Compiling project...\n'`tput sgr0`;

node --experimental-modules --no-warnings "${TOOLSDIR}/webpack.config.prod.mjs";

echo `tput setaf 6`$'\n➤  Copying public files...\n'`tput sgr0`;

rsync -avh "${PUBLICDIR}/media/" "${BUILDDIR}/media";
rsync -avh "${PUBLICDIR}/manifest.json" "${BUILDDIR}/";

echo `tput setaf 2`$'\n➤  Done.\n'`tput sgr0`;
