interface Account {
  id: string;
  type?: 'users' | 'organizations';
  image?: string;
}

export interface AvatarGroupProps {
  accounts: Account[];
  visibleCount?: number;
  showMore?: boolean;
  size?: string;
  customStyle?: string;
}
