export interface ImageSliderProps {
    title?: string;
    titleClass?: string | string[];
    width?: string;
    height?: string;
    images: string[];
    showCount?: number;
    auto?: boolean;
    scrollTime?: number;
    scrollButton?: boolean;
    hideDots?: boolean;
    isVertical? : boolean;
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
