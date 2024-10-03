import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SmartFormInterFace, SmartSoftForm } from "soft_digi";
import { INVOICE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { post } from "../../services/smartApiService";
interface FormErrors {
  [key: string]: string | null;
}
const InvoicebillForm = () => {
  const [formData, setFormData] = useState({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [states, setStates] = useState([]);
  const { openModal, closeModal } = useSiteContext();
  const navigate = useNavigate();
  const [minEndDate, setMinEndDate] = useState<Date | null>(null);

  const handleInputChange = (name: string, value: any) => {
    if (name === "bill_start_date") {
     
      const startDate = new Date(value);
      const newMinEndDate = new Date(startDate);
      newMinEndDate.setDate(newMinEndDate.getDate() + 30); 
      
      setMinEndDate(newMinEndDate); 
      
     
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
        bill_end_date: newMinEndDate, 
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleErrorChange = (name: string | any, value: any) => {
    setFormErrors((prev) => {
      const updatedFormData = { ...prev };
      if (value === null || value === "") {
        delete updatedFormData[name];
      } else {
        updatedFormData[name] = value;
      }
      return updatedFormData;
    });
  };

  const handleSubmit = () => {
    setFormSubmit(true);
    let URL = INVOICE_URLS.GENERATE;
    const subscription = post(URL, formData).subscribe((response) => {
      navigate("/e-fuel/vendor-wish/" + response.data);
      closeModal();
      //showAlertAutoClose("Bill Cre")
      // setData(response.data);
      // loadTableData()
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const filterFields: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "DATE",
      width: "4",
      name: "bill_start_date",
      element: {
        placeHolder: "Start Date",
        isRequired: true,
        // inputProps: { isFocussed: true },
      },
    },
    {
      type: "DATE",
      width: "4",
      name: "bill_end_date",
      element: {
        placeHolder: "End Date",
        isRequired: true,
           minDate: minEndDate,
         inputProps: { disabled: true},
      },
    },
    {
      type: "BUTTON",
      width: "2",
      name: "invoice_button",
      element: {
        label: "Create Bill",
        classList: ["smart-action-button mt-0 "],
        onClick: handleSubmit,
      },
    },
  ];
  return (
    <>
      <div className='sd-efl-input'>
        <div className="has-text-right">
          <SmartSoftForm
            formData={formData}
            setFormData={handleInputChange}
            elements={filterFields}
            formSubmit={formSubmit}
            handleErrorChange={handleErrorChange}
          />
        </div>
       

      </div>
    </>
  );
};

export default InvoicebillForm;
