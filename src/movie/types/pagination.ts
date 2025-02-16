export type PaginatedList<T> = {
  page: number;
  totalPages: number;
  totalResults: number;
  results: T[];
};
