import React, { useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftForm,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { INVOICE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";

import SmartFileDisplay from "../../components/site/SmartFileDisplay";
import { post } from "../../services/smartApiService";
import { showAlertAutoClose } from "../../services/notifyService";
// interface HeaderProps {
//   loadTableData: () => void;
// }
interface FormErrors {
  [key: string]: string | null;
}
interface componentProps {
  loadData: () => void;
  id: string | undefined;
}
const VendorDetailsImport: React.FC<componentProps> = ({ loadData, id }) => {
  const [formData, setFormData] = useState<any>({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const { closeModal } = useSiteContext();
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [data, setData] = useState<any[]>([]);

  const handleSubmit = () => {
    setFormSubmit(true);
    let URL = INVOICE_URLS.IMPORT_EXCEL;
    let _data = { ...formData };
    _data["id"] = id;
    //console.log(formData);
    const subscription = post(URL, _data).subscribe((response) => {
      setData(response.data);
      loadData();
      if (response.data.length < 1) {
        showAlertAutoClose("imported", "success");
        closeModal();
      }
      // closeModal();
      // loadTableData()
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const handleSubmitZip = () => {
    setFormSubmit(true);
    let URL = INVOICE_URLS.IMPORT_ZIP;
    let _data = { ...formData };
    _data["id"] = id;
    // console.log(formData);
    const subscription = post(URL, _data).subscribe((response) => {
      setData(response.data);
      loadData();
      if (response.data.length < 1) {
        showAlertAutoClose("imported", "success");
        closeModal();
      }
      // closeModal();
      // loadTableData()
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const ImportForm = () => {
    const handleInputChange = (name: string, value: any) => {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    };
    const filePreviewFunctionDisplay = (name: string = "excel") => {
      return (
        <SmartFileDisplay
          files={formData[name] || []}
          updateImages={(images: any) => handleInputChange(name, images)}
          isMulti={false}
          index={0}
        />
      );
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
    const formElements: SmartFormInterFace.SmartFormElementProps[] = [
      {
        type: "FILE",
        width: "6",
        name: "excel",
        element: {
          placeHolder: (
            <p>
              Browser Excel <span className="smart-error">*</span>
            </p>
          ),
          fileNameEnable: false,
          leftIcon: "fa fa-cloud-upload",
          accept: "application/excel",
          //  isMulti: true,
          isRequired: true,
          filePreview: true,
          filePreviewFunction: () => filePreviewFunctionDisplay("excel"),
          classList: [""],
        },
      },
      {
        type: "BUTTON",
        width: "6",
        name: "button",
        element: {
          classList: ["button ", "smart-action-button"],
          label: "Upload EXCEL",
          onClick: () => {
            handleSubmit();
          },
        },
      },

      {
        type: "FILE",
        width: "6",
        name: "import_zip",
        element: {
          placeHolder: (
            <p>
              Browser ZIP <span className="smart-error">*</span>
            </p>
          ),
          fileNameEnable: false,
          leftIcon: "fa fa-cloud-upload",
          accept: "application/zip",
          //  isMulti: true,
          isRequired: true,
          filePreview: true,
          filePreviewFunction: () => filePreviewFunctionDisplay("import_zip"),
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
        width: "6",
        name: "button",
        element: {
          classList: ["button ", "smart-action-button"],
          label: "Upload ZIP",
          onClick: () => {
            handleSubmitZip();
          },
        },
      },
    ];
    return (
      <>
        <SmartSoftForm
          formData={formData}
          setFormData={handleInputChange}
          elements={formElements}
          formSubmit={formSubmit}
          handleErrorChange={handleErrorChange}
          className="is-gapless"
        />
      </>
    );
  };

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: "Invoice Number",
      index: "invoice_number",
      width: "15",
    },
    {
      title: "Status",
      index: "status",
      width: "15",
    },
    {
      title: "Remarks",
      index: "msg",
      width: "15",
    },
  ];
  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-12",
      custom: <>{ImportForm()}</>,
    },
  ];

  return (
    <>
      {ImportForm()}
      {data && data.length > 0 && (
        <SmartTable
          columns={columns}
          data={data}
          paginationProps={{
            pageSize: 0,
          }}
          tableProps={{
            className: " is-hoverable is-bordered is-striped ",
            isResponsive: true,
          }}
          //tableTop={tableTop}
        />
      )}
      {/* <div className="has-text-centered">
        <SmartSoftButton
          label="Cancel"
          classList={["button", "mt-4 mr-4", "smart-third-button"]}
          onClick={closeModal}
        />
      </div> */}
    </>
  );
};

export default VendorDetailsImport;
