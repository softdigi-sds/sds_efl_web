import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SmartFormInterFace, SmartSoftForm } from "soft_digi";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { INVOICE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { SmartValid } from "../../core";
import { changeDateTimeZoneFormat } from "../../services/core/CommonService";
import { post } from "../../services/smartApiService";
interface FormErrors {
  [key: string]: string | null;
}
interface HeaderProps {
  loadTableData: () => void;
  dataIn: any;
}
const InvoiceNumberUpdate: React.FC<HeaderProps> = ({
  loadTableData,
  dataIn,
}) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [states, setStates] = useState([]);
  const { openModal, closeModal } = useSiteContext();
  const navigate = useNavigate();
  const [minEndDate, setMinEndDate] = useState<Date | null>(null);

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formData.bill_start_date && formData.bill_start_date != null) {
      const startDate = new Date(formData.bill_start_date);
      const newEndDate = moment(startDate)
        .add(1, "month")
        .date(20)
        .endOf("day");
      setMinEndDate(newEndDate.toDate());
      handleInputChange("bill_end_date", newEndDate.toDate());
    }
  }, [formData.bill_start_date]);

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
    if (!ValidateFormNew(formData, filterFields)) {
      return false;
    }
    let URL = INVOICE_URLS.UPDATE_INVOICE_NUMBER;
    let _data = {
      invoice_serial_number: formData.invoice_serial_number,
      invoice_number: formData.invoice_number,
      id: formData?.ID,
    };
    const subscription = post(URL, _data).subscribe((response) => {
      // navigate("/e-fuel/vendor-wish/" + response.data);
      closeModal();
      //showAlertAutoClose("Bill Cre")
      // setData(response.data);
      loadTableData();
    });
    return () => {
      subscription.unsubscribe();
    };
  };
  const hubFormValidations = {
    invoice_serial_number: [SmartValid.required("Date is Required")],
    invoice_number: [SmartValid.required("Date is Required")],
  };
  const filterFields: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "TEXT_BOX",
      width: "6",
      name: "invoice_serial_number",
      element: {
        label: "Invoice Serial Number",
        isRequired: true,
        inputType: "BORDER_LABEL",
        validations: hubFormValidations.invoice_serial_number,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "invoice_number",
      element: {
        label: "Invoice Number",
        isRequired: true,
        inputType: "BORDER_LABEL",
        validations: hubFormValidations.invoice_serial_number,
      },
    },

    {
      type: "BUTTON",
      width: "12",
      name: "invoice_button",
      element: {
        label: "Update Number",
        classList: ["smart-action-button mt-0 has-text-right"],
        onClick: handleSubmit,
      },
    },
  ];
  return (
    <>
      <div className="sd-efl-input">
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

export default InvoiceNumberUpdate;
