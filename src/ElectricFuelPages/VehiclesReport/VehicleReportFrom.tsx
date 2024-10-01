import React, { useEffect, useState } from 'react';
import { SmartSoftInput, SmartTable, SmartTableNewInterface } from 'soft_digi';
import { useSiteContext } from '../../contexts/SiteProvider';
import { SmartSoftButton } from '../../core';
import { sumOfArrayObjectsWithIndex } from '../../services/core/FilterService';
import { showAlertAutoClose } from '../../services/notifyService';
import { post } from '../../services/smartApiService';

interface FormErrors {
    [key: string]: string | null;
}
interface HeaderProps {
    loadTableData: () => void;
    date: any,
    hub_id: any

}
const VehicleReportFrom: React.FC<HeaderProps> = ({ loadTableData, date, hub_id }) => {
    const [formData, setFormData] = useState<any[]>([]);
    const [formSubmit, setFormSubmit] = useState<boolean>(false);
    const { closeModal } = useSiteContext();

    const loadData = () => {
        let _data = {
            hub_id: hub_id,
            date: date
        };
        const subscription = post("/efl_vehicles/get_one_parking_data", _data).subscribe((response) => {
            setFormData(response.data);
        });
        return () => {
            subscription.unsubscribe();
        };
    };

    const dummy_data = [
        {
            id:1,
            name:"ARROW",
            count:100
        },
        {
            id:2,
            name:"SDS",
            count:0
        }
    ]

    useEffect(() => {   
        loadData()   
       // setFormData(dummy_data);
    }, [date, hub_id]);

    /**
     *  submit the update data to backend
     * 
     * @returns 
     */
    const handleSubmit = () => {
        setFormSubmit(true);
        let _data = {
            hub_id:hub_id,
            date:date,
            input_data:formData
        }      
        const subscription = post("/efl_vehicles/insert", _data).subscribe(
            (response) => {
                loadTableData();
                showAlertAutoClose("Data Saved Successfully", "success");
                closeModal();
            }
        );
        return () => {
            subscription.unsubscribe();
        };
    };

    const updateVehicleCount=(id:number,count:any)=>{
        //console.log("id " , id , " count " , count);
        const updatedItems = formData.map(item =>
            item.ID === id ? { ...item, vehicle_count: parseFloat(count) } : item
          );
        //  console.log(" updated items " , updatedItems)
          setFormData(updatedItems);
    }


   
    const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
        { title: "S.NO", index: "s_no", type: "sno", width: "5" },
        {
            title: "Vendor Company Name",
            index: "vendor_company",
            width: "70"
        },
        {
            title: "Vehicles Count",
            index: "vehicle_count",
            width: "25",
            valueFunction:(item)=>{
              return  <SmartSoftInput value={item?.vehicle_count} onChange={(value)=>updateVehicleCount(item.ID,value)}/>
            }
        },       
    ];

    const footerComponent=(sortdata:any[])=>{
        let total_foot_count = sumOfArrayObjectsWithIndex(formData,"vehicle_count");
        return <tfoot>
             <tr>
              <td colSpan={2} className="has-text-right">Total Count</td>          
              <td>{total_foot_count}</td>             
             </tr>
        </tfoot>
      }

    return (
        <> <SmartTable
                columns={columns}
                data={formData}
                paginationProps={{
                    pageSize: 1
                }}
                footerFunction={(sortdata)=>footerComponent(sortdata)}
            />
            <div className="has-text-right">
                <SmartSoftButton
                    label="Cancel"
                    classList={["button","mt-4 mr-4","smart-third-button"]}
                    onClick={closeModal}
                />
                <SmartSoftButton
                    label="Submit"
                     rightIcon='fa fa-arrow-right'
                    classList={["button ","mt-4","smart-action-button"]}
                    onClick={handleSubmit}
                />
            </div>
        </>
    )
}

export default VehicleReportFrom