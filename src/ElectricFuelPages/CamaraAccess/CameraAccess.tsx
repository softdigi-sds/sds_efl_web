import { useEffect, useState } from "react";
import { HUBS_URLS } from "../../api/UserUrls";
import { get } from "../../services/smartApiService";
import { SmartTable, SmartTableNewInterface } from "soft_digi";



const CameraAccess = () => {
  const [tabData, setTabData] = useState([]);


  const loadTableData = () => {
    let URL = HUBS_URLS.GET_ALL;
    const subscription = get(URL).subscribe((response) => {
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
      title: "Hub Id",
      index: "hub_id",
      width: "15",
    },
    {
      title: "Status",
      index: "hub_id",
      width: "15",
    },
  ];
  
  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-6",
      custom: <p className="is-size-4">Camera</p>,
    },
    {
      type: "SEARCH",
      widthClass: "is-3",
      align: "JUSTIFY",
    },
    {
      type: "BUTTONS",
      widthClass: "is-3",
      align: "CENTER",
      buttons: [
        {
          type: "REFRESH",
          action: loadTableData,
        },
      ],
    },
  ];

  return (
    <>
      <div className="smart-elf-table">
        <SmartTable
          columns={columns}
          data={tabData}
          // filterFields={filterFields}
          tableTop={tableTop}
          tableProps={{
            className: " is-hoverable is-bordered is-striped smart-efl-table",
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


export default CameraAccess