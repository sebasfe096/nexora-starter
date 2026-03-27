'use strict';

const ERP_API_KEY         = process.env.ERP_API_KEY;
const LOW_STOCK_THRESHOLD = parseInt(process.env.LOW_STOCK_THRESHOLD);
const NOTIFICATION_URL    = process.env.NOTIFICATION_URL;


exports.syncInventoryData = async (data) => {
    const { productId, sku, oldStock, newStock, warehouseId } = data;

    console.info(JSON.stringify({data: data}))
    if (!productId || newStock === undefined || newStock === null) {
        throw new Error('Missing required fields: productId, newStock');
    }

    const stockDiff = newStock - (oldStock || 0);
    const timestamp = new Date().toISOString();
    let alertSent = false;

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
        alertSent = true;
    }

    return {
        productId,
        sku,
        stockDiff,
        warehouseId,
        timestamp,
        alertSent
    };
};