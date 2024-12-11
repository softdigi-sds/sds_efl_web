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
const InvoicebillForm: React.FC<HeaderProps> = ({ loadTableData, dataIn }) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [states, setStates] = useState([]);
  const { openModal, closeModal } = useSiteContext();
  const navigate = useNavigate();
  const [minEndDate, setMinEndDate] = useState<Date | null>(null);

  const handleInputChange = (name: string, value: any) => {
    // if (name === "bill_start_date") {
    //   const startDate = new Date(value);
    //  // const newMinEndDate = new Date(startDate);
    //   const newEndDate = moment(startDate)
    //   .add(1, "month")
    //   .date(20)
    //   .endOf("day");
    //   setMinEndDate(newEndDate.toDate());
    //   setFormData((prev: any) => ({
    //     ...prev,
    //     [name]: value,
    //     bill_end_date: newEndDate,
    //   }));
    // } else {

    // }
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
    let URL = formData.ID ? INVOICE_URLS.BILL_UPDATE : INVOICE_URLS.GENERATE;
    let _data = {
      bill_start_date: changeDateTimeZoneFormat(
        formData.bill_start_date || "",
        "YYYY-MM-DD"
      ),
      bill_end_date: changeDateTimeZoneFormat(
        formData.bill_end_date || "",
        "YYYY-MM-DD"
      ),
      invoice_date: formData.invoice_date,
      due_date: formData.due_date,
      id:formData?.ID
    };
    const subscription = post(URL, _data).subscribe((response) => {
      navigate("/e-fuel/vendor-wish/" + response.data);
      closeModal();
      //showAlertAutoClose("Bill Cre")
      // setData(response.data);
      loadTableData()
    });
    return () => {
      subscription.unsubscribe();
    };
  };
  const hubFormValidations = {
    start: [SmartValid.required("Date is Required")],
    end: [SmartValid.required("Date is Required")],
  };
  const filterFields: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "DATE",
      width: "6",
      name: "bill_start_date",
      element: {
        label: "Start Date",
        placeHolder: "DD-MM-YYYY",
        isRequired: true,
        inputType: "BORDER_LABEL",
        validations: hubFormValidations.start,
        inputProps: { disabled: formData.ID ? true : false},
        // inputProps: { isFocussed: true },
      },
    },
    {
      type: "DATE",
      width: "6",
      name: "bill_end_date",
      element: {
        label: "End Date",
        placeHolder: "DD-MM-YYYY",
        isRequired: true,
        minDate: minEndDate,
        inputProps: { disabled: true },
        inputType: "BORDER_LABEL",
        // validations: hubFormValidations.end,
      },
    },
    {
      type: "DATE",
      width: "6",
      name: "invoice_date",
      element: {
        label: "Invoice Date",
        placeHolder: "DD-MM-YYYY",
        isRequired: true,
        minDate: minEndDate,
        // inputProps: { disabled: true },
        inputType: "BORDER_LABEL",
        // validations: hubFormValidations.end,
      },
    },
    {
      type: "DATE",
      width: "6",
      name: "due_date",
      element: {
        label: "Due Date",
        placeHolder: "DD-MM-YYYY",
        isRequired: true,
        minDate: minEndDate,
        // inputProps: { disabled: true },
        inputType: "BORDER_LABEL",
        // validations: hubFormValidations.end,
      },
    },
    {
      type: "BUTTON",
      width: "12",
      name: "invoice_button",
      element: {
        label: "Create Bill",
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

export default InvoicebillForm;