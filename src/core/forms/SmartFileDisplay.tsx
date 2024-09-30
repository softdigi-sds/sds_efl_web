
interface SmartFileDisplayProps {
  updateImages: (files: File[] | null) => void;
  files:  File[]|any[]; 
  isMulti?: boolean;
}

const SmartFileDisplay: React.FC<SmartFileDisplayProps> = ({
  updateImages,
  files,
  isMulti = false,
}) => {
  const deleteImage = (indexToRemove: number) => {
    if (!isMulti) {
      updateImages(null);
    } else {
      const updatedItems = [...files];
      updatedItems.splice(indexToRemove, 1);
      if (updateImages) updateImages(updatedItems);
    }
  };

  const singleFile = (input: File, index: number) => {
    return (
      input && (
        <li key={index}>
          {input.name}
          <i
            className="fa fa-trash has-text-danger"
            onClick={() => deleteImage(index)}
          ></i>
        </li>
      )
    );
  };

  return <ul className="smart-file-disp">{files.map(singleFile)}</ul>;
};

export default SmartFileDisplay;
