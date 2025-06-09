export interface SuccessRes {
  message: string;
}

export interface PaginateReq {
  page?: number;
  limit?: number;
}

export interface PaginateRes {
  page: number;
  total_count: number;
  limit: number;
}

export interface FilterReq extends PaginateReq {
  [key: string]: any;
}
