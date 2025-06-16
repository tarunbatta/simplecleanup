export type CleanupOption = {
  id: string;
  label: string;
  hasBadge?: boolean;
};

export type CleanupOptions = {
  [key: string]: CleanupOption;
};

export const CLEANUP_OPTIONS: CleanupOptions = {
  bh: {
    id: 'bh',
    label: 'Browsing History',
    hasBadge: true,
  },
  ca: {
    id: 'ca',
    label: 'Cache',
  },
  co: {
    id: 'co',
    label: 'Cookies',
    hasBadge: true,
  },
  dh: {
    id: 'dh',
    label: 'Download History',
    hasBadge: true,
  },
  pd: {
    id: 'pd',
    label: 'Personal Data',
  },
} as const;

export type CleanupState = {
  [K in keyof typeof CLEANUP_OPTIONS]: boolean;
};
