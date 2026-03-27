'use strict';

const inventoryService = require('../services/inventory.service');

exports.handleInventoryUpdate = async (cloudEvent) => {
    const data = cloudEvent.data;

    if (!data) {
        console.error('No data found in CloudEvent');
        return;
    }

    try {
        const syncResult = await inventoryService.syncInventoryData(data);

        console.info(JSON.stringify({
            severity: 'INFO',
            message: 'Inventory event processed successfully',
            productId: data.productId,
            details: syncResult
        }));

    } catch (error) {
        console.error('Error processing inventory event:', error);
    }
};