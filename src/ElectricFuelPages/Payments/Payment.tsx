import { useEffect, useState } from "react";
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm } from "soft_digi";
import { PAYMENT_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { bills_all_select, hubs_get_all_select, vendors_get_all_select } from "../../services/site/SelectBoxServices";
import { post } from "../../services/smartApiService";
import PaymentInvoice from "./PaymentInvoice";
import PaymentsCount from "./PaymentsCount";
import RecentPayment from "./RecentPayment";
interface FormErrors {
  [key: string]: string | null;
}
const Payment = () => {
  const [formData, setFormData] = useState({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { setLoading, closeModal } = useSiteContext();
  const [customers, setCustomers] = useState([]);
  const [allHubs, setAllHubs] = useState([]);
  const [allBills, setAllBills] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [tabData, setTabData] = useState<any>();
  const loadTableData = () => {
    let URL = PAYMENT_URLS.GET_ALL_REPORT;
    const subscription = post(URL, { ...formData }).subscribe((response) => {
      setTabData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    loadTableData();
  }, [formData]);

  const handleFilterClick = () => {
    setIsFormVisible((prev) => !prev);
  };
  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));

  };
  const handleErrorChange = (name: string | any, value: any) => {
    setFormErrors((prev) => {
      const updatedFormData = { ...prev };
      if (value === null || value === '') {
        delete updatedFormData[name];
      } else {
        updatedFormData[name] = value;
      }
      return updatedFormData;
    });
  };

  useEffect(() => {
    vendors_get_all_select((data: any) => setCustomers(data));
    hubs_get_all_select((data: any) => setAllHubs(data));
    bills_all_select((data: any) => setAllBills(data));
  }, []);

  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "SELECT_BOX",
      width: "3",
      name: "sd_bill_id",
      element: {
        label: "Bill",
        isRequired: true,
        options: allBills,
        inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "SELECT_BOX",
      width: "3",
      name: "sd_customer_id",
      element: {
        label: "Customer",
        isRequired: true,
        options: customers,
        inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "SELECT_BOX",
      width: "3",
      name: "sd_hub_id",
      element: {
        label: "Hub",
        isRequired: true,
        options: allHubs,
        inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "BUTTON",
      width: "3",
      name: "",
      // class_name: "has-text-right",
      element: {
        classList: ["smart-action-button"],
        label: "Apply Filter",
        onClick: () => console.log("data", formData),
      },
    },]
  return (
    <>
      <div className="is-size-3 has-text-font-bold ">

        <div className=" is-flex is-justify-content-space-between mb-2">
          <span className="is-size-4 has-text-weight-bold mb-1 has-text-white">Payment</span>

          <div className="has-text-right ">
            <SmartSoftButton
              label="Filter"
              leftIcon={isFormVisible ? "fa fa-times" : "fa fa-filter"}
              classList={["button", "mt-1",]}
              onClick={handleFilterClick}
            /></div>
        </div>   </div>
      {isFormVisible && (
        <div className="sd-efl-input mt-4">
          <SmartSoftForm
            formData={formData}
            setFormData={handleInputChange}
            elements={formElements}
            formSubmit={formSubmit}
            handleErrorChange={handleErrorChange}
          />
        </div>
      )}

      <div className="has-text-white">

        <div className="">
          <PaymentsCount data={tabData?._payment_data} />
        </div>
        <div className="m-4 mt-6">
          <PaymentInvoice data={tabData?._invoice_data||[]} />
        </div>
        <div className="m-4 mt-6">
          <RecentPayment />
        </div>
      </div>
    </>
  );
};

export default Payment;
