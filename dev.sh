#!/bin/sh

LIB=$1
WEBAPP_PATH=$2

npm unistall -g react react-dom react-router-dom

cd $LIB
echo "1) I am in $PWD"
rm -rf ./node_modules
npm ci
npm link
cd $WEBAPP_PATH
echo "2) I am in $PWD"
rm -rf ./node_modules
npm ci
npm link "./node_modules/react"
npm link "./node_modules/react-dom"
npm link "./node_modules/react-router-dom"
npm link pricingplans-react
cd $LIB
echo "3) I am in $PWD"
npm link react
npm link react-dom
npm link react-router-dom