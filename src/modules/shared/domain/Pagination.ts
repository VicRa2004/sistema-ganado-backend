export interface Pagination<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}
