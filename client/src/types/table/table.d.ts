import React from 'react';

export interface ITableColumn {
  name: string;
  key?: string;
  index?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnData?: (value: any) => string | React.ReactNode;
}
