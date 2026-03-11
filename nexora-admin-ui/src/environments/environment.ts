export const environment = {
  production: false,
  appName: 'Nexora Admin',
  version: '2.3.1',
  featureFlags: {
    enableBetaReports: true,
    enableBulkOperations: false,
    enableRealTimeSync: true
  },
  API_DOMAIN: 'https://kong-gateway.nexora.com',
  API_CONTEXT: '/nexora/',
  SERVICES: {
    PRODUCTS: "products-api",
    ORDERS: "orders-api",
    CUSTOMERS: "customers-api",
    INVENTORY: "inventory-api",
    REPORTS: "reports-api",
  }
};
// NOTA: Las URLs de la API están configuradas directamente en cada servicio.
