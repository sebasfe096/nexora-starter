export const environment = {
  production: true,
  appName: 'Nexora Admin',
  version: '2.3.1',
  featureFlags: {
    enableBetaReports: false,
    enableBulkOperations: true,
    enableRealTimeSync: true
  }, API_DOMAIN: 'https://kong-gateway.nexora.com',
  API_CONTEXT: '/nexora/',
  SERVICES: {
    PRODUCTS: "products-api",
    ORDERS: "orders-api",
    CUSTOMERS: "customers-api",
    INVENTORY: "inventory-api",
    REPORTS: "reports-api",
  }
};
