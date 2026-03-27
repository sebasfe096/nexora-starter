'use strict';

const { handleInventoryUpdate } = require('../src/events/inventory.handler');

describe('onInventorySync (Integration Test)', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.LOW_STOCK_THRESHOLD = '10';
  });

  it('should log info on successful synchronization', async () => {
    const infoSpy = jest.spyOn(console, 'info').mockImplementation();

    const validEvent = {
      data: {
        productId: 'P1',
        newStock: 50,
        oldStock: 65,
        sku: 's45665',
        warehouseId: 15
      },
    };

    await handleInventoryUpdate(validEvent);

    expect(infoSpy).toHaveBeenCalledWith(
        expect.stringContaining('Inventory event processed successfully')
    );

    infoSpy.mockRestore();
  });

  it('should log error when data is incomplete', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    const invalidEvent = {
      data: { productId: 'P1' }
    };

    await handleInventoryUpdate(invalidEvent);

    expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error processing inventory event:'),
        expect.any(Error)
    );

    errorSpy.mockRestore();
  });
});