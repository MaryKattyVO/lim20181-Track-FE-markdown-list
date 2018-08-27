#!/usr/bin/env node
const [,, ...args] = process.argv;
// console.log(`${args}`);

const path = require('path').resolve;
const fs = require('fs');

// console.log(path('/foo/bar', './baz'));
console.log(path(`${args}`));
