import { ReactNode, useState } from "react";

// Define types for icons
type IconsType = {
  open: string;
  close: string;
};

// Update the AccordionItem type to allow ReactNode for title
type AccordionItem = {
  title: ReactNode; // Change from string to ReactNode
  body?: ReactNode;
  bodyFunction?: (() => ReactNode) | ReactNode;
};

// Define the props type for the SmartAccordion
interface SmartAccordionProps {
  data: AccordionItem[];
  class_name?: string;
  icons?: IconsType;
}

const SmartAccordion = (props: SmartAccordionProps) => {
  const {
    data,
    class_name = "",
    icons = { open: "fa-angle-down", close: "fa-angle-right" },
  } = props;
  const [open, setOpen] = useState<number | null>(0);

  const singleAccordDisplay = (item: AccordionItem, index: number) => {
    return (
      <>
        {cardHeader(item, index)}
        {open === index && (
          <div className="card-content">
            <div className="content">{cardBody(item)}</div>
          </div>
        )}
      </>
    );
  };

  const cardBody = (item: AccordionItem) => {
    if (item.bodyFunction) {
      return typeof item.bodyFunction === "function"
        ? item.bodyFunction()
        : item.bodyFunction;
    } else {
      return item?.body;
    }
  };

  const tabClick = (index: number) => {
    if (index === open) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  const getIcon = (index: number) => {
    return index === open ? icons.open : icons.close;
  };

  const cardHeader = (item: AccordionItem, index: number) => {
    return (
      <header
        className="card-header smart-cursor-pointer"
        onClick={() => tabClick(index)}
      >
        <p className="card-header-title smart-customer-accordion">
          {item?.title}
        </p>
        <button className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className={"fa " + getIcon(index)} aria-hidden="true"></i>
          </span>
        </button>
      </header>
    );
  };

  return (
    <>
      {data.map((item, index) => {
        const class_active = index === open ? " card-acord-active" : "";
        return (
          <div
            className={"card " + class_name + " " + class_active}
            key={index}
          >
            {singleAccordDisplay(item, index)}
          </div>
        );
      })}
    </>
  );
};

export default SmartAccordion;
