import { ReactNode } from 'react';

export interface AlertMessageProps {
  theme: 'primary' | 'gray' | 'error' | 'warning' | 'success';
  iconName: string;
  iconTheme?: 'primary' | 'gray' | 'error' | 'warning' | 'success';
  title: string;
  subtitle?: string;
  children?: ReactNode;
  colOrderMobileView?: boolean;
  containerClassName?: string;
}
