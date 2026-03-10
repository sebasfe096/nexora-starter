import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
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
    const mockWrappedResponse = {
      status: 'success', statusCode: 200, message: 'OK', timestamp: '2024-01-01T00:00:00',
      data: [{ id: 1, sku: 'NXR-001', name: 'Widget Pro', price: 99.99, stock: 50, status: 'ACTIVE' }],
      pagination: { page: 1, pageSize: 10, totalItems: 1, totalPages: 1 }
    };

    service.getProducts().subscribe(response => {
      // Actualmente el servicio retorna el wrapper completo
      expect(response.data.length).toBe(1);
      expect(response.status).toBe('success');
    });

    const req = httpMock.expectOne('https://api-gw-node1.nexora.com/v1/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockWrappedResponse);
  });
});
