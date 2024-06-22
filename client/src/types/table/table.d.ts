import React from 'react';

export interface ITableColumn {
  name: string;
  key: string;
  columnData?: (value: string) => string | React.ReactNode;
}
