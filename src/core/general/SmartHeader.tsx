
interface SmartHeaderProps {
  title: string;
  sectorName?: string; // Optional prop
}

const SmartHeader: React.FC<SmartHeaderProps> = ({ title, sectorName }) => {


  return (
          <>
            <div className="breadcrumb-home has-text-centered">
            
            <span className="is-size-4 m-3">
             <u> {title}</u> <span className="mr-1">{sectorName}</span>
            </span></div>
            </>
    
   
  );
}

export default SmartHeader;
