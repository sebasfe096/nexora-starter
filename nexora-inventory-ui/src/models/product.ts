export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';

export interface Product {
    id: number;
    sku: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: ProductStatus;
}