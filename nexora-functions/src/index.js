'use strict';

require('dotenv').config();
const functions = require('@google-cloud/functions-framework');

const { generateStockReport } = require('./api/reports.controller');
const { handleInventoryUpdate } = require('./events/inventory.handler');


functions.http('generateStockReport', generateStockReport);

functions.cloudEvent('onInventorySync', handleInventoryUpdate);
