export interface IBreadCrumb {
  name: string;
  link?: string;
}

export interface IHeaderData {
  title: string;
  breadCrumb: IBreadcrumb[];
}

// Defining the headerData object type
export type IHeaderDataMap = {
  [key: string]: HeaderData;
};
