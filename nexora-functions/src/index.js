'use strict';

// Firma de 1ra generacion: HTTP trigger
// Debe migrarse a CloudEvents (2da generacion)
// Credenciales hardcodeadas — deben leerse desde variables de entorno
// Sin validaciones robustas
// Sin structured logging
const functions = require('@google-cloud/functions-framework');
require('dotenv').config();

// Configuración mediante variables de entorno
const ERP_API_KEY         = process.env.ERP_API_KEY;
const ERP_URL             = process.env.ERP_URL;
const NOTIFICATION_URL    = process.env.NOTIFICATION_URL;
const LOW_STOCK_THRESHOLD = process.env.LOW_STOCK_THRESHOLD;


// 1ra generacion: recibe (req, res) como HTTP
functions.cloudEvent('onInventorySync', (cloudEvent) => {
  const data = cloudEvent.data;

  const { productId, sku, oldStock, newStock, warehouseId } = data;

  if (!data.productId || data.newStock === undefined || data.newStock === null) {
    throw new Error('Missing required fields: productId, newStock');
  }

  const stockDiff = newStock - (oldStock || 0);
  const timestamp = new Date().toISOString();

  if (newStock <= LOW_STOCK_THRESHOLD) {
    console.warn(JSON.stringify({
      severity: 'WARNING',
      message: 'LOW STOCK ALERT',
      timestamp,
      details: { productId, sku, currentStock: newStock },
      notification: {
        url: NOTIFICATION_URL,
        apiKeyHint: `${ERP_API_KEY?.substring(0, 8)}...`
      }
    }));
  }

  console.info(JSON.stringify({
    severity: 'INFO',
    message: 'Inventory synchronization completed successfully',
    payload: {
      productId,
      sku,
      stockDiff,
      warehouseId,
      timestamp
    }
  }));
});

// Segunda funcion en el mismo archivo (violacion de single responsibility)
exports.generateStockReport = (req, res) => {
  const REPORT_SECRET = 'report-secret-xyz-789';  // Otra credencial hardcodeada

  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  console.log('Generating stock report with secret:', REPORT_SECRET);

  res.status(200).json({
    status: 'success',
    message: 'Report generation started',
    timestamp: new Date().toISOString()
  });
};
