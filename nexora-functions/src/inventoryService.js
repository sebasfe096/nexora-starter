
const functions = require('@google-cloud/functions-framework');
const ERP_API_KEY         = process.env.ERP_API_KEY;
const ERP_URL             = process.env.ERP_URL;
const NOTIFICATION_URL    = process.env.NOTIFICATION_URL;
const LOW_STOCK_THRESHOLD = process.env.LOW_STOCK_THRESHOLD;

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