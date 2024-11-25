import React, { useEffect, useState } from "react";
import { SmartSoftButton, SmartSoftInput, SmartTable, SmartTableNewInterface } from "soft_digi";
import { CONSUMPTION_URL } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { roundNumber } from "../../services/core/CommonService";
import { sumOfMultiArrayObjectsWithIndex } from "../../services/core/FilterService";
import { showAlertAutoClose } from "../../services/notifyService";
import { post } from "../../services/smartApiService";

interface FormErrors {
  [key: string]: string | null;
}
interface HeaderProps {
  loadTableData: () => void;
  date: any;
  hub_id: any;
  endDate?: any
}
const ConsumptionReportForm: React.FC<HeaderProps> = ({
  loadTableData,
  date,
  hub_id,
  endDate
}) => {
  const [formData, setFormData] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const { closeModal } = useSiteContext();
  const loadData = () => {
    let _data = {
      hub_id: hub_id,
      date: date,
      end_date: endDate
    };
    let URL = endDate ? CONSUMPTION_URL.GET_ALL_CALENDER_GET_ONE_HUB : CONSUMPTION_URL.GET_ALL_CALENDER_GET_ONE;
    const subscription = post(URL, _data).subscribe((response) => {
      setFormData(response.data.data || []);
      setTypes(response.data.types || [])
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const dummy_data = [
    {
      id: 1,
      name: "ARROW",
      count: 100,
    },
    {
      id: 2,
      name: "SDS",
      count: 0,
    },
  ];

  useEffect(() => {
    loadData();
    //setFormData(dummy_data);
  }, [date, hub_id]);

  /**
   *  submit the update data to backend
   *
   * @returns
   */
  const handleSubmit = () => {
    setFormSubmit(true);
    let _data = {
      hub_id: hub_id,
      date: date,
      data: formData,
    };
    let URL = CONSUMPTION_URL.INSERT;
    const subscription = post(URL, _data).subscribe((response) => {
      loadTableData();
      showAlertAutoClose(response.data.msg, "success");
      closeModal();
    });
    return () => {
      subscription.unsubscribe();
    };
  };


  const updateCountNested = (
    mainId: number,
    subId: number,
    count: any
  ) => {
    setFormData((prevData) =>
      prevData.map((mainItem) =>
        mainItem.sd_customer_id === mainId
          ? {
            ...mainItem,
            sub_data: mainItem.sub_data.map((subItem: any) =>
              subItem.ID === subId ? { ...subItem, count: count } : subItem
            ),
          }
          : mainItem
      )
    );
  };

  const countReport = (sub_data: any, id: number) => {
    return (
      <table>
        <tbody>
          <tr>
            {sub_data.sort((a:any, b:any) => b.ID - a.ID).map((obj: any, key: number) => {
              let roundedCount = String(roundNumber(obj?.count) ?? '');
              return (
                <td className="smart-table-column-width-20">
                  <SmartSoftInput
                    // label={obj.vehicle_type}
                    // inputType="BORDER_LABEL"
                    classList={["is-small"]}
                    value={roundedCount}
                    onChange={(value) =>
                      updateCountNested(id, obj.ID, value)
                    }
                  />
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  };

  const headerLabel = () => {
    return (
      <table className="smart-table-column-width-100">
        <tbody>
          <tr>
            {types.map((obj: any, key: number) => {
              return (
                <td className="smart-table-column-width-20 has-text-centered">
                  {obj.type}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    )
  }

  const footerCount = () => {
    return (
      <table className="smart-table-column-width-100">
        <tbody>
          <tr>
            {types.map((obj: any, key: number) => {
              let _total_count = sumOfMultiArrayObjectsWithIndex(formData, "sub_data", "ID", obj.ID);
              return (
                <td key={`foot_count_${key}`} className="smart-table-column-width-20 has-text-centered">
                  {roundNumber(_total_count)}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    )
  }

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: "Company Name",
      index: "vendor_company",
      width: "70",
    },
    {
      title: headerLabel(),
      index: "unit_count",
      width: "25",
      valueFunction: (item) => {
        let _sub_data = item["sub_data"];
        return countReport(_sub_data, item["sd_customer_id"]);
      },
    },
  ];

  const footerComponent = (sortdata: any[]) => {
    return (
      <tfoot>
        <tr>
          <td colSpan={2} className="has-text-right">
            Total Count
          </td>
          <td>
            {footerCount()}
          </td>
        </tr>
      </tfoot>
    );
  };

  return (
    <>
      {" "}
      <SmartTable
        columns={columns}
        data={formData}
        paginationProps={{
          pageSize: 1,
        }}
        footerFunction={(sortdata) => footerComponent(sortdata)}
      />
      <div className="has-text-right">
        <SmartSoftButton
          label="Cancel"
          classList={["button", "mt-4 mr-4", "smart-third-button"]}
          onClick={closeModal}
        />
        <SmartSoftButton
          label="Submit"
          classList={["button ", "mt-4", "smart-action-button"]}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default ConsumptionReportForm;
