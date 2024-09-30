import React, { useState } from 'react'
import { useSiteContext } from '../../contexts/SiteProvider';
import { CONSUMPTION_URL } from '../../api/UserUrls';
import { post } from '../../services/smartApiService';
import { showAlertAutoClose } from '../../services/notifyService';
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm, SmartTable, SmartTableNewInterface } from 'soft_digi';
import SmartFileDisplay from '../../core/forms/SmartFileDisplay';
interface HeaderProps {
    loadTableData: () => void;
   

}
interface FormErrors {
    [key: string]: string | null;
  }
const ImportVehiclesReport: React.FC<HeaderProps> = ({ loadTableData}) => {
    const [formData, setFormData] = useState<any[]>([]);
    const [formSubmit, setFormSubmit] = useState<boolean>(false);
    const { closeModal } = useSiteContext();
    const [formErrors, setFormErrors] = useState<FormErrors>({});
  




   
    const handleSubmit = () => {
        setFormSubmit(true);
        let _data = {
        
            data:formData
        } 
        let URL=CONSUMPTION_URL.INSERT     
        const subscription = post(URL, _data).subscribe(
            (response) => {
                loadTableData();
                showAlertAutoClose(response.data.msg, "success");
                closeModal();
            }
        );
        return () => {
            subscription.unsubscribe();
        };
    };
  
     
    const ImportForm=()=>{
     
        const handleInputChange = (name: string, value: any) => {
            setFormData((prev:any) => ({ ...prev, [name]: value }));
            
          };
        //   const filePreviewFunctionDisplay = (inputValue:any) => {
         
        //     return (
        //       <SmartFileDisplay
        //         files={formData?.excel}
        //         updateImages={(images) => handleInputChange("excel", images)}
        //       />
        //     );
        //   };
          const handleErrorChange = (name:string|any, value: any) => {
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
          const formElements:SmartFormInterFace.SmartFormElementProps[] = [
            {
                type: "FILE",
                width: "6",
                name: "excel",
                element: {
                  placeHolder: (
                    <p>
                     Browser Excel  <span className="smart-error">*</span>
                    </p>
                  ),
                  fileNameEnable: false,
                  leftIcon: "fa fa-cloud-upload",
                  accept: "application/excel",
                  //  isMulti: true,
                  isRequired: true,
                  filePreview: true,
                
                //    filePreviewFunction: filePreviewFunctionDisplay,
                  classList: [""],
                },
              },
        ]
        return(
            <>
              <SmartSoftForm
        formData={formData}
        setFormData={handleInputChange}
        elements={formElements}
        formSubmit={formSubmit}
        handleErrorChange={handleErrorChange}
      /> 
            </>
        )
    }
  

   
    const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
        { title: "S.NO", index: "s_no", type: "sno", width: "5" },
        {
            title: "Hub",
            index: "hub",
            width: "15"
        },
        {
            title: "Vendors",
            index: "vendors",
            width: "15", 
        },   
        {
            title: "Date",
            index: "data",
            width: "15", 
        }, 
        {
            title: "Units",
            index: "units",
            width: "15", 
        },  
        {
            title: "Status",
            index: "status",
            width: "15", 
        }, 
    ];
    const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
        {
          type: "CUSTOM",
          widthClass: "is-10",
          custom: <p className="is-size-4">{ImportForm()}</p>,
        },
        {
          type: "BUTTONS",
          widthClass: "is-2",
          align: "RIGHT",
          buttons: [        
            {
              label:"Upload",
              icon:"fa-plus",
              type:"CUSTOM",
              
            },
          ],
          
        },
       
    ]
    

    return (
        <> <SmartTable
                columns={columns}
                data={formData}
                paginationProps={{
                    pageSize: 1
                }}
                tableProps={{
                    className: " is-hoverable is-bordered is-striped smart-efl-table",
                    isResponsive: true,
                  }}
                  tableTop={tableTop}
               
            />
            <div className="has-text-right">
                <SmartSoftButton
                    label="Cancel"
                    classList={["button", "mt-4 mr-4"]}
                    onClick={closeModal}
                />
                <SmartSoftButton
                    label="Submit"
                    classList={["button ", "mt-4"]}
                    onClick={handleSubmit}
                />
            </div>
        </>
    )
}


export default ImportVehiclesReport
