#!/usr/bin/env node

const chalk = require('chalk').default;
const help = require('./commands/help');
const program = require('commander');
const list = require('./commands/list');
const create = require('./commands/create');


/*program
  .version('0.1.0')
  .option('-n, --name', 'Project name')
  .option('-e, --esp <type>', 'ESP version 8266 or 32', '8266')
  .option('-p, --port', 'Default port name')
  .option('-b --baud', 'Default baud rate');
*/
program
  .command('list')
  .description('List supported devices')
  .action(list.listDevices);

program
  .command('create [projectName]')
  .description('Create a boilerplate for ESP8266/ESP32 project')
  //.option('-n, --name <type>', 'Name of project', 'my-espruino-project')
  .option('-e, --esp <type>', 'Which ESP to use? esp8266 or esp32?', 'esp8266')
  .option('-p, --port <type>', 'Default port name', '/dev/cu.wchusbserial1420')
  .option('-b, --baud <type>', 'Default baud rate', 115200)
  .action(create.newProject);

program.parse(process.argv);

