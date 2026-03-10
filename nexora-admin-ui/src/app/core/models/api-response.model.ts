export interface ApiResponse<T> {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  data: T[];
  timestamp: string;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
