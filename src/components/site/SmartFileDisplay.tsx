import "./SmartMultiSideNav.css";
interface SmartFormElements{
    updateImages:any,
    files:any
    isMulti:boolean,
    index:number,
    
  };

const SmartFileDisplay:React.FC<SmartFormElements> = (props) => {
  const { updateImages, files, isMulti = false ,index} = props;

  const deleteImage = (indexToRemove:any) => {
    if (!isMulti) {
      updateImages(null);
    } else {
      const updatedItems = [...files];
      // Remove the element at the specified index
      updatedItems.splice(indexToRemove, 1);
      //
      if (updateImages) updateImages(updatedItems);
    }
  };

  const singleFile = (input:any, index:number) => {
    return input && (
      <li>
        {input?.name}
        <i
          className="fa fa-trash has-text-danger"
          onClick={() => deleteImage(index)}
        ></i>
      </li>
    );
  };

  return <ul className="smart-file-disp">{singleFile(files,index)}</ul>;
};

export default SmartFileDisplay;
