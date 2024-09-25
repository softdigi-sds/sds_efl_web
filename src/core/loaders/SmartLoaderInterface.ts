import { ReactNode } from "react";

export interface SmartLoaderInterface{
    msg?:string|undefined,
    type?:'NORMAL' | 'DYNAMIC' | 'SETTING'|'STAR';
}


export interface SmartModalInterface{
    active?:boolean,
    title?:string,
    width?:number,
    className?:string,
    content:ReactNode,
    footer?:ReactNode,
    closeFunction?:()=>void,
    closeBody?:boolean
}

export interface SmartAlertButtonInterface{
   index:string,
   label:string,
   icon?:string|ReactNode,
   className?:string,
   isClose?:boolean
}

export interface SmartAlertInterface{   
    title?:string|ReactNode,
    width?:number,
    className?:string,
    content?:ReactNode,
    buttons?:SmartAlertButtonInterface[],
    alertFunction?:(index:string|any)=>void,
    
}


