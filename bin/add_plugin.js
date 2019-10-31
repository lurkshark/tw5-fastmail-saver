#!/usr/bin/node
var fs = require('fs');

var fileName = process.argv[2] + '/tiddlywiki.info';
var pluginName = process.argv[3];

var config = JSON.parse(fs.readFileSync(fileName));
config['plugins'].push(pluginName);

fs.writeFileSync(fileName, JSON.stringify(config));
