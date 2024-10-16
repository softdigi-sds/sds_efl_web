import React, { useEffect, useState } from 'react'
import { useSiteContext } from '../../contexts/SiteProvider';
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm, SmartValid } from 'soft_digi';
import { hubs_get_all_select } from '../../services/site/SelectBoxServices';
import { ValidateFormNew } from 'soft_digi/dist/services/smartValidationService';
import { METER_READINGS_URLS } from '../../api/UserUrls';
import { post } from '../../services/smartApiService';
import { showAlertAutoClose } from '../../services/notifyService';


interface FormErrors {
    [key: string]: string | null;
  }

  interface HeaderProps {
    loadTableData: () => void;
    dataIn: any;
    currentDate:any
  }
const MeterReadingForm:React.FC<HeaderProps> = ({dataIn,loadTableData,currentDate}) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
    const [formSubmit, setFormSubmit] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const { closeModal } = useSiteContext();
    const [allHubs, setAllHubs] = useState([]);
  
    const handleInputChange = (name: string, value: any) => {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    };
  

    useEffect(() => {
   
      setFormData({
        meter_year: `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
       
        sd_hub_id: dataIn?.sd_hub_id || ""     
      });
      
    }, [dataIn]);
  
    const handleErrorChange = (name: string | any, value: any) => {
      setFormErrors((prev : any) => {
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
      if (!ValidateFormNew(formData, formElements)) {
        return false;
      }


      let url = METER_READINGS_URLS.INSERT;
  
  let _data={
    meter_month:currentDate.getMonth() + 1,
    meter_year:currentDate.getFullYear(),
    sd_hub_id: formData.sd_hub_id,
    meter_start: formData.meter_start,
    meter_end:formData.meter_end,
  
  
  }
      const subscription = post(url,_data).subscribe((response) => {
        //console.log("response form ", response.data);
         loadTableData();
        showAlertAutoClose("Data Saved Successfully", "success");
        closeModal();
      });
      return () => {
        subscription.unsubscribe();
      };
    };
    useEffect(() => {
        hubs_get_all_select((data: any) => setAllHubs(data));
      }, []);
    const hubFormValidations = {
        city: [SmartValid.required("City is Required")],
        hub_id: [SmartValid.required("Hub Id is Required")],
        role: [SmartValid.required("Role is Required")],
        hub_name: [SmartValid.required("Hub Name is Required")],
        locations: [SmartValid.required("Location is Required")],
        pin_code: [SmartValid.required("Pin Code is Required")],
      };


      const totalPrice = () => {
        if (formData.meter_end) {
          let  meterEnd = formData.meter_end
          let  meterStart = formData.meter_start
          let diffInDays = meterEnd - meterStart;
          
         
          return diffInDays;
        } else{
          return 0;
        }
      }
      ;
      
      const formElements: SmartFormInterFace.SmartFormElementProps[] = [
        {
          type: "TEXT_BOX",
          width: "12",
          name: "sd_hub_id",
          element: {
            label: "Hub Name",
            isRequired: true,
            // options: allHubs,
            // isHorizontal: true,
            inputProps: {disabled: true},
            inputType: "BORDER_LABEL",
            validations: hubFormValidations.city,
          },
        },
        {
          type: "TEXT_BOX",
          width: "12",
          name: "meter_year",
          element: {
            label: " Month/Year",
            isRequired: true,
            // inputProps: { isFocussed: true },
            inputProps: {disabled: true},
            // isHorizontal: true,
            inputType: "BORDER_LABEL",
            validations: hubFormValidations.hub_id,
          },
        },
    
        {
          type: "TEXT_BOX",
          width: "12",
          name: "meter_start",
          element: {
            label: "Meter Start Reading",
            isRequired: true,
            validations: hubFormValidations.role,
            // isHorizontal: true,
            inputType: "BORDER_LABEL",
          },
        },
        {
          type: "TEXT_BOX",
          width: "12",
          name: "meter_end",
          element: {
            label: "Meter End Reading",
            isRequired: true,
            // inputProps: { isFocussed: true },
            // isHorizontal: true,
            inputType: "BORDER_LABEL",
            validations: hubFormValidations.hub_name,
          },
        },
        {
            type: "TEXT_BOX",
            width: "12",
            name: "numberof_unit",
            element: {
              label: "Number of Units",
              // isRequired: true,
              // inputProps: { isFocussed: true },
            //   isHorizontal: true,
              inputType: "BORDER_LABEL",
              valueFunction: () => {
                return "" + totalPrice();
              },
              // validations: hubFormValidations.hub_name,
              inputProps: {disabled: true}
            },
          },
    ]
  return (
    <>
      <div className="sd-efl-input">
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
          classList={["button", "mt-4 mr-4", "smart-third-button"]}
          onClick={closeModal}
        />
        <SmartSoftButton
          label="Submit"
           rightIcon='fa fa-arrow-right'
          classList={["button ", "mt-4", "smart-action-button"]}
          onClick={handleSubmit}
        />
      </div>
      </div>
    </>
  )
}

export default MeterReadingForm