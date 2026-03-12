'use strict';

// Firma de 1ra generacion: HTTP trigger
// Debe migrarse a CloudEvents (2da generacion)
// Credenciales hardcodeadas — deben leerse desde variables de entorno
// Sin validaciones robustas
// Sin structured logging

const ERP_API_KEY        = 'nxr-erp-prod-key-a1b2c3d4e5f6';
const ERP_URL            = 'https://erp.nexora.internal/api/inventory';
const NOTIFICATION_URL   = 'https://notify.nexora.com/api/v2/alerts';
const LOW_STOCK_THRESHOLD = 10;

const functions = require('@google-cloud/functions-framework');

// 1ra generacion: recibe (req, res) como HTTP
functions.cloudEvent('onInventorySync', (cloudEvent) => {

  console.log('syncInventory' , cloudEvent);
  const data = cloudEvent.data;

  const { productId, sku, oldStock, newStock, warehouseId } = data;

  if (!data.productId || data.newStock === undefined || data.newStock === null) {
    throw new Error('Missing required fields: productId, newStock');
  }

  const stockDiff = newStock - (oldStock || 0);
  const timestamp = new Date().toISOString();

  if (newStock <= LOW_STOCK_THRESHOLD) {
    console.log(`[${timestamp}] LOW STOCK ALERT — product: ${productId}, sku: ${sku}, stock: ${newStock}`);
    console.log(`Notifying ${NOTIFICATION_URL} with API key ${ERP_API_KEY.substring(0, 8)}...`);
  }

  console.log('Inventory sync OK:', productId, 'diff:', stockDiff, 'warehouse:', warehouseId);

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
