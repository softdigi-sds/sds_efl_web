import React, { useState } from 'react';
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm, SmartTable, SmartTableNewInterface } from 'soft_digi';
import { VEHICLES_URL } from '../../api/UserUrls';
import { useSiteContext } from '../../contexts/SiteProvider';

import SmartFileDisplay from '../../components/site/SmartFileDisplay';
import { post } from '../../services/smartApiService';
interface HeaderProps {
  loadTableData: () => void;
}
interface FormErrors {
  [key: string]: string | null;
}
const ImportVehiclesReport: React.FC<HeaderProps> = ({ loadTableData }) => {
  const [formData, setFormData] = useState<any>({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const { closeModal } = useSiteContext();
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [data, setData] = useState<any[]>([]);
  const handleSubmit = () => {
    setFormSubmit(true);
    let URL = VEHICLES_URL.IMPORT_EXCEL
    const subscription = post(URL, formData).subscribe(
      (response) => {
        setData(response.data);
        loadTableData()
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };


  const ImportForm = () => {

    const handleInputChange = (name: string, value: any) => {
      setFormData((prev: any) => ({ ...prev, [name]: value }));

    };
    const filePreviewFunctionDisplay = () => {
      return (
        <SmartFileDisplay
          files={formData.excel || []}
          updateImages={(images: any) => handleInputChange("excel", images)}
          isMulti={false}
          index={0}
        />
      );
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
    const formElements: SmartFormInterFace.SmartFormElementProps[] = [
      {
        type: "FILE",
        width: "4",
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
          filePreviewFunction: filePreviewFunctionDisplay,
          classList: [""],
        },
      },
      // {
      //   type: "LABEL",
      //   width: "4",
      //   name: "file_dispaly",
      //   labelFunction: () => {
      //     return <SmartFileDisplay files={formData.excel} />
      //   }
      // },
      {
        type: "BUTTON",
        width: "2",
        name: "button",
        element: {
          classList: ["button ", "smart-action-button"],
          label: "Upload",
          onClick: () => {
            handleSubmit();
          }
        }
      }

    ]
    return (
      <>
        <SmartSoftForm
          formData={formData}
          setFormData={handleInputChange}
          elements={formElements}
          formSubmit={formSubmit}
          handleErrorChange={handleErrorChange}
          className='is-gapless'
        />
      </>
    )
  }

  const statusTags = [
    { value: 5, label: "Success", class: "is-success" },
    { value: 10, label: "Error", class: "is-danger" },
  ];

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: "Hub",
      index: "hub_name",
      width: "15",
    },
    {
      title: "Vendors",
      index: "vendor",
      width: "15",
    },
    {
      title: "Date",
      index: "date",
      width: "15",
    },   
    {
      title: "Status",
      index: "status",
      type:"tags",
      tags:statusTags
      ,
      width: "15",
    },   
  ];
 
  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-10",
      custom: <p className="is-size-4"></p>,
    },
   
    {
      type: "BUTTONS",
      widthClass: "is-2",
      align: "CENTER",
      buttons: [
        {
          type: "FILTER",
        },
       
      ],
    },
  ];
  const filterFields:SmartFormInterFace.SmartFormElementProps[] = [
   
    {
      type: "SELECT_BOX",
      width: "12",
      name: "status",
      element: {
        label: "Status",
        options: [
          { value: "5", label: "Success" },
          { value: "10", label: "Error" },
        ],
      },
    },
  ]

  return (
    <>

      {ImportForm()}
      {data && data.length > 0 &&
      <>
        <SmartTable
          columns={columns}
          data={data}
          tableTop={tableTop}
          filterFields={filterFields}
          paginationProps={{
            pageSize: 10
          }}
          tableProps={{
            className: " is-hoverable is-bordered is-striped ",
            isResponsive: true,
          }}
        //tableTop={tableTop}

        />
      
      <div className="has-text-centered">
        <SmartSoftButton
          label="Cancel"
          classList={["button", "mt-4 mr-4", "smart-third-button"]}
          onClick={closeModal}
        />

      </div>
      </>
      }
    </>
  )
}


export default ImportVehiclesReport
