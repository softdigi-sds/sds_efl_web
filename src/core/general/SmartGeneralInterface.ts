import { ReactElement, ReactNode } from "react";

export interface StarRatingProps {
    className?: string;
    rating?:any;
    totalStars?: number
  

  }
  export interface  SideNavProps {
    listItems:any[]
    logo?:any|ReactElement;
  }

  export interface  UserCardProps {
 
    ProfileImage?:any|ReactElement;
    title?:string
    subTitle?:string
    icons?:any[]|ReactElement
    content?:string|ReactElement

  }

  export interface SmartTabSingle{
    index:string,
    label?:string,
    icon?:string,
    image?: ReactNode
  }

  export interface  SmartTabsProps  {
    tabs: SmartTabSingle[]; 
    handleTabs: (tab: any) => void
    tab?: string; 
  };

  export interface  SmartQRCodeProps {
    data: string,
    QRsize:any
  };

  export interface  SmartBarCOdeProps {
    value?:any;
    height?:number

  };

  export interface smartTooltipProps {
    children?: any; // Assuming `tabs` is an array of strings
    content?:any;
    position: string; // Assuming `tab` is a string
  };

  export interface SmartCalendarProps {
    initialYear: number;
    initialMonth: number;
    events?: any[];
  }