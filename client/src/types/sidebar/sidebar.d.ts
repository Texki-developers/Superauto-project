import React from 'react';

export interface ISidebarItem {
  name: string;
  url: string;
  icon: string;
  id: string;
  isSubMenu: boolean;
  element: React.ReactNode;
}
