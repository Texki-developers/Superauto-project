import React from 'react';

export interface ITableColumn {
  name: string;
  align?: string;
  key?: string;
  index?: boolean;
  textAlign?:string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnData?: (value: any) => string | React.ReactNode;
}
