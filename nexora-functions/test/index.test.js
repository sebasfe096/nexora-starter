'use strict';

const { syncInventory } = require('../src/index');

describe('syncInventory (1ra generacion)', () => {
  let req, res;

  beforeEach(() => {
    req = { method: 'POST', body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send:   jest.fn().mockReturnThis(),
      json:   jest.fn().mockReturnThis()
    };
  });

  it('should return 405 for non-POST requests', () => {
    req.method = 'GET';
    syncInventory(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
  });

  it('should return 400 when productId is missing', () => {
    req.body = { newStock: 5 };
    syncInventory(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should return 200 for valid sync request', () => {
    req.body = { productId: 'NXR-001', sku: 'NXR-001', oldStock: 50, newStock: 45, warehouseId: 'WH-01' };
    syncInventory(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      status: 'success',
      productId: 'NXR-001'
    }));
  });
});
