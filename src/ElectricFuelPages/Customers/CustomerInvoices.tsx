import React, { useEffect, useState } from 'react'
import { CUSTOMER_URLS } from '../../api/UserUrls';
import { get, post } from '../../services/smartApiService';
import { SmartFormInterFace, SmartTable, SmartTableNewInterface } from 'soft_digi';


interface IDProps {
  rowId: any;
}
const CustomerInvoices:React.FC<IDProps> = ({rowId}) => {
    const [tabData, setTabData] = useState([]);
    const loadTableData = () => {
      // let sd_customer_id = { value: rowId };
      let  sd_customer_id =rowId
     
        let URL = CUSTOMER_URLS.GET_ALL_INVOICE;
        const subscription = post(URL,{sd_customer_id}).subscribe((response) => {
          setTabData(response.data);
        });
        return () => {
          subscription.unsubscribe();
        };
      };
        useEffect(() => {
        loadTableData();
      }, []);
      const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
        { title: "S.NO", index: "s_no", type: "sno", width: "5" },
        {
          title: "Invoice Number",
          index: "invoice_number",
        },
        {
          title: "Customer",
          index: "vendor_company",
        },
        { title: "Hub", index: "hub_id" },
        {
          title: "Total Taxable",
          index: "total_taxable",
        },
        {
          title: "Total Amount",
          index: "total_amount",
        },
        
        // {
        //   title: "Pending",
        //   index: "pending_amount",
        // },
        // { title: "Status", index: "status", type: "tags", tags: statusTags },
        // {
        //   title: "Action",
        //   index: "action",
        //   type: "buttons",
        //   buttons: buttons,
        //   width: "10",
        // },
      ];
      const options = [
        { value: "1", label: "Test" },
        { value: "2", label: "Test" },
        { value: "3", label: "test" },
      ];
      const filterFields: SmartFormInterFace.SmartFormElementProps[] = [
        // {
        //   type: "SELECT_BOX",
        //   width: "12",
        //   name: "office_city",
        //   element: {
        //     label: "Office City",
        //   },
        // },
        {
          type: "SELECT_BOX",
          width: "12",
          name: "state_name",
          element: {
            label: "State",
            options: options,
          },
        },
      ];
    
      const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
        // {
        //   type: "CUSTOM",
        //   widthClass: "is-10",
        //   custom: (
        //     <p className="is-size-4">
        //       {" "}
        //       <i className="fa fa-file-text is-link"></i>{" "}
        //       <span className="ml-3"> Invoice / Payment</span>
        //     </p>
        //   ),
        // },
        // {
        //     type: "CUSTOM",
        //     widthClass: "is-2 ",
        //     custom: <p className="is-size-7">Offices & Location</p>,
        //   },
      ];
      return (
        <>
          <div className="smart-elf-table">
            <SmartTable
              columns={columns}
              data={tabData}
              tableTop={tableTop}
              filterFields={filterFields}
              tableProps={{
                className: " is-hoverable is-bordered is-striped ",
                isResponsive: true,
                searchPlaceHolder: "Search",
              }}
              paginationProps={{
                pageSize: 10,
              }}
            />
          </div>
        </>
      );
    };

export default CustomerInvoices