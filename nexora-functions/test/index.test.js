'use strict';

describe('onInventorySync (Integration Test)', () => {
  let inventoryHandler;

  beforeEach(() => {
    jest.resetModules();
    const functions = require('@google-cloud/functions-framework');
    jest.spyOn(functions, 'cloudEvent').mockImplementation((name, handler) => {
      inventoryHandler = handler;
    });
    require('../src/inventoryService');
  });

  it('should log info on successful synchronization', () => {
    const infoSpy = jest.spyOn(console, 'info').mockImplementation();

    const validEvent = {
      data: { productId: 'P1', newStock: 50, oldStock: 65, sku: 's45665', warehouseId: 15 },
    };

    inventoryHandler(validEvent);
    expect(infoSpy).toHaveBeenCalled();
    infoSpy.mockRestore();
  });

  it('should throw "Missing required fields" when data is incomplete', () => {

    const invalidEvent = {
      data: { productId: 'P1' }
    };

    expect(() => inventoryHandler(invalidEvent)).toThrow('Missing required fields');
  });
});
