export * from './media/index.adaptors';
export * from './media/index.types';

export * from './identity/index.adaptors';
export * from './identity/index.types';

export * from './users/index.adaptors';
export * from './users/index.types';

export * from './organizations/index.adaptors';
export * from './organizations/index.types';

export * from './password/index.adaptors';
export * from './password/index.types';

export interface CustomError {
  response: { data: { error: string } };
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
