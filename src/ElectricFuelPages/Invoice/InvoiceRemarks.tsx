import React, { useEffect, useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartSoftForm
} from "soft_digi";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { INVOICE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { showAlertAutoClose } from "../../services/notifyService";
import { post } from "../../services/smartApiService";



interface HeaderProps {
  loadTableData: () => void;
  id: any;
  remarks:string
}

const InvoiceRemarks: React.FC<HeaderProps> = ({ loadTableData, id,remarks }) => {
  const [formData, setFormData] = useState<any>({remarks:remarks});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const { closeModal } = useSiteContext();

  const handleInputChange = (name: string, value: any) => {
    // console.log("Name",name,"Value", value);
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    //  console.log("formData updated", value);
  };

  useEffect(() => {

  }, []);




  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData, formElements)) {
      return false;
    }
    let url = INVOICE_URLS.UPDATE_REMARKS;
    let data_in = { ...formData };
    data_in["id"] = id;
    const subscription = post(url, data_in).subscribe((response) => {
      loadTableData();
      showAlertAutoClose("Data Saved Successfully", "success");
      closeModal();
    });
    return () => {
      subscription.unsubscribe();
    };
  };

 
  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "TEXTAREA",
      width: "12",
      name: "remarks",
      element: {
        label: "Remarks",
        isRequired: true,
      },
    },

  ];




  return (
    <>
      <div className="sd-efl-input">
        {/* <SmartHeader title={"Vendor Rates Form"} /> */}

        <SmartSoftForm
          formData={formData}
          setFormData={handleInputChange}
          elements={formElements}
          formSubmit={formSubmit}
        />

        <div className="has-text-right">
          <SmartSoftButton
            label="Cancel"
            classList={["button", "mt-4 mr-4", "smart-third-button"]}
            onClick={closeModal}
          />
          <SmartSoftButton
            label={formData.ID ? "Update" : "Submit"}
            rightIcon="fa fa-arrow-right"
            classList={["button ", "mt-4", "smart-action-button"]}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};



export default InvoiceRemarks
