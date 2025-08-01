export * from './media/index.adaptors';
export * from './media/index.types';

export * from './identity/index.adaptors';
export * from './identity/index.types';

export * from './users/index.adaptors';
export * from './users/index.types';

export * from './organizations/index.adaptors';
export * from './organizations/index.types';

export * from './verification/index.adaptors';
export * from './verification/index.types';

export * from './impact/index.adaptors';
export * from './impact/index.types';

export * from './payments/index.adaptors';
export * from './payments/index.types';

export * from './refer/index.adaptors';
export * from './refer/index.types';

export * from './credentials/index.adaptors';
export * from './credentials/index.types';

export interface CustomError {
  response: { data: { error: string } };
  message?: string;
}

export interface SuccessRes {
  message?: string;
}

export type AdaptorRes<T = null> = {
  data: T | null;
  error: string | null;
};

export interface OptionType {
  label: string;
  value: string;
}

export interface PaginateRes<T> {
  page: number;
  limit: number;
  total: number;
  results: T[];
}
