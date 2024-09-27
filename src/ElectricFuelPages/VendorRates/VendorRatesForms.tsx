import React, { useEffect, useState } from 'react';
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm, SmartValid } from "soft_digi";
import { hubs_get_all_select, vendors_get_all_select } from '../../services/site/SelectBoxServices';
import { ValidateFormNew } from 'soft_digi/dist/services/smartValidationService';
import { VENDER_RATE_URLS } from '../../api/UserUrls';
import { post } from '../../services/smartApiService';
import { showAlertAutoClose } from '../../services/notifyService';
import { useSiteContext } from '../../contexts/SiteProvider';

interface FormErrors {
  [key: string]: string | null;
}

interface HeaderProps {
  loadTableData: () => void;  
  dataIn:any
  
}

const VendorRatesForms:React.FC<HeaderProps> = ({loadTableData,dataIn}) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [allHubs, setAllHubs] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const {  closeModal } = useSiteContext();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev:any) => ({ ...prev, [name]: value }));
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

  const handleLogin = () => {
    console.log('data', formData);
  };

  useEffect(() => {   
    hubs_get_all_select((data:any) => setAllHubs(data));
    vendors_get_all_select((data:any) => setAllVendors(data));
  }, []);
  const options = [
    { value: 'Minimum', label: 'Minimum' },
    { value: 'Per Unit', label: 'Per Unit' },
  ];
  const options_parking = [
    { value: 'Minimum', label: 'Minimum' },
    { value: 'Per Unit', label: 'Per Unit' },
  ];
  const Interrogation = () => {
    return (
      <>
        <div className="">
          <u>Consumption Rates :</u>
        </div>
      </>
    );
  };

  const Interrogation_two = () => {
    return (
      <>
        <div className="">
          <u>Parking Rates :</u>
        </div>
      </>
    );
  };
  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData,formElements)) {
      return false;
    }
    let url = VENDER_RATE_URLS.INSERT;
    if (formData.ID !== undefined) {
      formData["id"] = formData.ID;
      url = VENDER_RATE_URLS.UPDATE;
    }
    let data_in = { ...formData };
    data_in["unit_rate_type"] = data_in["unit_rate_type"].value;
    data_in["parking_rate_type"] = data_in["parking_rate_type"].value;
    const subscription = post(url, data_in).subscribe(
      (response) => {
        //console.log("response form ", response.data);
        loadTableData();
        showAlertAutoClose("Data Saved Successfully", "success");
        closeModal();       
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };

  const vendorFormValidations = {
    hub_id: [SmartValid.required("Hub Id is Required")],
    company: [SmartValid.required("Company is Required")],
    comunication: [SmartValid.required("Type is Required")],
    min_units: [SmartValid.required("Minumum Unit is Required")],
    rate_unit: [SmartValid.required("Rate Per Unit is Required")],
    extra_unit: [SmartValid.required("Rate Per Extra Unit is Required")],
    pin_code: [SmartValid.required("Pin Code is Required")],
    dates: [SmartValid.required("Date is Required")],
  };
  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: 'SELECT_BOX',
      width: '6',
      name: 'sd_hubs_id',
      element: {
        label: 'Hub ID',
        isRequired: true,
        options: allHubs,
        validations: vendorFormValidations.hub_id,
      },
    },
    {
      type: 'SELECT_BOX',
      width: '6',
      name: 'sd_vendors_id',
      element: {
        label: 'Company',
        isRequired: true,
        validations: vendorFormValidations.company,
        // options: allVendors,
        options:options
   
      },
    },
    {
      type: 'LABEL',
      width: '12',
      name: 'label_one',
      labelFunction: Interrogation,
    },
    {
      type: 'SELECT_BOX',
      width: '6',
      name: 'unit_rate_type',
      element: {
        label: 'Select Consumption Type',
        validations: vendorFormValidations.comunication,
        isRequired: true,
        options: options,
      },
   
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'min_units',
      element: {
        label: 'Minimum Units',
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.min_units,
      },
      hideFunction: () => {
        return formData?.unit_rate_type?.value === 'Minimum' ? false : true; 
      },
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'unit_rate',
      element: {
        label: 'Rate Per Unit',
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.rate_unit,
      },
      hideFunction: () => {
        return formData?.unit_rate_type?.value === 'Minimum' ? true : false; 
      },
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'extra_unit_rate',
      element: {
        label: 'Rate Per Extra Unit',
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.extra_unit,
      },
      hideFunction: () => {
        return formData?.unit_rate_type?.value === 'Minimum' ? false : true; 
      },
    },
    {
      type: 'LABEL',
      width: '12',
      name: 'label_two',
      labelFunction: Interrogation_two,
    },
    {
      type: 'SELECT_BOX',
      width: '6',
      name: 'parking_rate_type',
      element: {
        label: 'Select Parking Type',
        isRequired: true,
        validations: vendorFormValidations.comunication,
        options: options_parking,
      },
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'parking_min_count',
      element: {
        label: 'Minimum Number',
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.min_units,
      },
      hideFunction: () => {
        return formData?.parking_rate_type?.value === 'Minimum' ? false : true; 
      },
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'parking_rate_vehicle',
      element: {
        label: 'Rate Per Unit',
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.rate_unit,
      },
      hideFunction: () => {
        return formData?.parking_rate_type?.value === 'Minimum' ? true:false; 
      },
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'parking_extra_rate_vehicle',
      element: {
        label: 'Rate Per Extra Unit',
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.extra_unit,
      },
      hideFunction: () => {
        return formData?.parking_rate_type?.value === 'Minimum' ? false : true; 
      },
    },
    {
      type: 'DATE',
      width: '6',
      name: 'effective_date',
      element: {
        label: 'Select Effective Date',
        placeHolder: 'DD-MM-YYYY',
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.dates,
      },
    },
  ];

  return (
    <>
      <div className="">
        {/* <SmartHeader title={"Vendor Rates Form"} /> */}
      </div>
      <SmartSoftForm
        formData={formData}
        setFormData={handleInputChange}
        elements={formElements}
        formSubmit={formSubmit}
        handleErrorChange={handleErrorChange}
      />
      <div className="has-text-right">
        <SmartSoftButton
          label="Cancel"
          classList={['button', 'mt-4 mr-4']}
          onClick={closeModal}
        />
        <SmartSoftButton
          label="Submit"
          classList={['button ', 'mt-4']}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default VendorRatesForms;
