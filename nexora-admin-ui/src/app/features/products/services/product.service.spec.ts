import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {Product, ProductService} from './product.service';
import {environment} from "../../../../environments/environment";

describe('ProductService', () => {
  const productURL = [
    environment.API_DOMAIN,
    environment.API_CONTEXT,
    environment.SERVICES.PRODUCTS
  ].join('');
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the old api-gw-node1 URL to fetch products', () => {
    const mockWrappedResponse = [{ id: 1, sku: 'NXR-001', name: 'Widget Pro', price: 99.99, stock: 50, status: 'ACTIVE' }];

    service.getProducts().subscribe(response => {
      // Actualmente el servicio retorna el wrapper completo
      expect(response.length).toBe(1);
      expect(response[0].status).toBe('ACTIVE');
    });
    console.log("url" , productURL)
    const req = httpMock.expectOne(productURL);
    expect(req.request.method).toBe('GET');
    req.flush(mockWrappedResponse);
  });

  it('should call new api kong URL to fetch getProductById', () => {
    const productId = 1;
    const mockProduct: Product = {
      id: 1,
      sku: "NEX12",
      name: 'Widget Pro',
      description: 'decorador',
      price: 9000,
      stock: 5,
      category: 'Utilidades',
      status: 'ACTIVE',
      createdAt: '12-03-2026',
    };

    service.getProductById(productId).subscribe(response => {
      expect(response).toEqual(mockProduct);
      expect(response.id).toBe(productId);
    });

    const req = httpMock.expectOne(`${productURL}/${productId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockProduct);
  });

  it('should call new api kong URL to create a product', () => {
    const newProduct: Partial<Product> = {
      sku: "NEX12",
      name: 'Widget Pro',
      description: 'decorador',
      price: 9000,
      category: 'Utilidades'
    };

    const mockResponse =  {
      id: 100,
      sku: "NEX12",
      name: 'Widget Pro',
      description: 'decorador',
      price: 9000,
      category: 'Utilidades',
      stock: 5,
      status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED',
      createdAt: '12-03-2026'
    } ;

    service.createProduct(newProduct).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.id).toBe(100);
    });

    const req = httpMock.expectOne(productURL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);

    req.flush(mockResponse);
  });
});
