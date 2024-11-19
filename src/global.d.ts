export { };

declare global {
    interface Window {
        loaderType?: 'NORMAL' | 'DYNAMIC' | 'SETTING'|'STAR';
    }
    interface siteConfig{
        REACT_APP_API_URL:string,
        ENCRYPTION_KEY?:string,
        ENCRYPTION?:boolean,
        DIGI_SERVER_URL?:string       
    }
}