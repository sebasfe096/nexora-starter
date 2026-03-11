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
    const mockWrappedResponse = [{ id: 1, sku: 'NXR-001', name: 'Widget Pro', price: 99.99, stock: 50, status: 'ACTIVE' }];

    service.getProducts().subscribe(response => {
      // Actualmente el servicio retorna el wrapper completo
      expect(response.length).toBe(1);
      expect(response[0].status).toBe('ACTIVE');
    });

    const req = httpMock.expectOne('https://api-gw-node1.nexora.com/v1/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockWrappedResponse);
  });
});
