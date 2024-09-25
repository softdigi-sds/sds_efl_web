import { ReactElement, ReactNode } from "react";
import {
  SmartButtonProps,
  SmartFormElementProps,
} from "../forms/SmartFormInterface";

export interface SmartTableNewColumnConfig {
  /**
   * defines the index type of array of objects
   */
  index: string;
  /**
   * head column can be string or react componenet
   */
  title?: string | ReactElement;
  /**
   * Mobile title this has to be added incase the normal table title has given as react componenet
   */
  titleMobile?: string;
  /**
   * defines the column type
   */
  type?: "sno" | "date" | "tags" | "progress" | "buttons" | "action";
  valueFunction?: (data: any) => any;
  /**
   * enables the sorting and sorting arrow shows
   * optins : "STRING"|"NUMBER"|"DATE"
   */
  isSortable?: boolean;
  /**
   * decides the arrow position
   * optins : "STRING"|"NUMBER"|"DATE"
   */
  sortArrowPosition?: "LEFT|RIGHT";
  /**
   * Determines the data type for filter and sorting
   * optins : "STRING"|"NUMBER"|"DATE"
   */
  dataType?: "STRING" | "NUMBER" | "DATE";
  //
  filterCondition?: "includes" | "equals";

  classHead?: string;
  classBody?: string;
  dateFormat?: string;
  autoTimeZone?: boolean;
  tags?: any;
  imageIndex?: string;
  imageIndexFunction?: (data: any) => any;
  progressMax?: number;
  progressClass?: string;

  buttons?: SmartButtonProps[];
  /**
   * Determines the width of the column
   * we have round number configuration of widths like 5,10,15,upto 95
   */
  width?: string;
}

export interface SmartTableNewFooterConfig {
  className?: string;
  footerType: string;
  footerFunction: (
    pageCount?: any,
    setCurrentPage?: any,
    setPageSizeHandle?: any,
    startIndex?: any,
    endIndex?: any,
    dataLength?: any
  ) => any;
}

export interface SmartTableNewPaginationProps {
  classList?: string[];
  pageSize: number;
  navigationIcon?: string;
}

export interface SmartTableNewDataRow {
  [key: string]: string | number;
}

export interface SmartTableNewMainProps {
  className?: string;
  isResponsive?: boolean;
  searchIndexes?: string[];
  searchPlaceHolder?: string;
  filterButtonLabel?: string;
  ClearButtonLabel?: string;
}

export interface SmartHeadButton {
  /**
   *  type of button : custom should have action to be performed
   */
  type:
    | "REFRESH"
    | "FILTER"
    | "CUSTOM"
    | "EXCEL-EXPORT"
    | "PDF-EXPORT"
    | "EXPORT-GROUP"
    | "EXPORT-CSV";
  icon?: string | ReactElement;
  label?: string | ReactElement;
  action?: (data: any, selectedIds: any) => any;
}

export interface SmartTableNewTopProps {
  type?: "CUSTOM" | "SEARCH" | "BUTTONS";
  widthClass?: string;
  custom?: string | ReactElement;
  align?: "JUSTIFY" | "LEFT" | "RIGHT" | "CENTER";
  buttons?: SmartHeadButton[];
}

export interface SmartTableNewProps {
  tableTop?: SmartTableNewTopProps[];
  columns: SmartTableNewColumnConfig[];
  data: SmartTableNewDataRow[];
  tableProps?: SmartTableNewMainProps;
  paginationProps?: SmartTableNewPaginationProps;
  footerConfig?: SmartTableNewFooterConfig[];
  footerFunction?:(data:any[])=>ReactNode|void;
  filterFields?: SmartFormElementProps[];
  noResutls?:ReactNode
}

export interface SmartPaginationProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  classList?: string[];
  totalPages: number;
  navigationIcon?: string;
  pageSize:number,
  setPageSize: (value: number) => void;
}
