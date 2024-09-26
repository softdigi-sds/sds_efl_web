import { CSSProperties } from "react";

export interface ImageSliderItem {
  image: string;
  content?: React.ReactNode;
  contentPosition?: CSSProperties;
}


export interface ImageSliderProps {
    title?: string;
    titleClass?: string | string[];
    width?: string;
    images: ImageSliderItem[];
    showCount?: number;
    auto?: boolean;
    scrollButton?: boolean;
    scrollTime?: number;
    hideDots?: boolean;
}



export interface VHSliderProps {
    title?: string;
    titleClass?: string | string[];
    width?: string;
    height?: string;
    images: string[];
    isVertical? : boolean;
  }

export interface SmartDivSliderProps {
  title?: string;
  titleClass?: string | string[];
  width?: string;
  height?: string;
  children?: React.ReactNode | React.ReactNode[];
  showCount?: number;
  auto?: boolean;
  scrollTime?: number;
  scrollButton?: boolean;
  hideDots?: boolean;
}
