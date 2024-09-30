import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SmartSoftForm, SmartSoftInput, SmartSoftSelect } from "..";
import SmartButton from "../forms/SmartButton";
import { SmartFormElementProps } from "../forms/SmartFormInterface";
import { formatDate } from "../services/CommonService";
import {
  filterArrayOfObject,
  filterArrayOfObjectSearch,
  SmartSortData,
} from "../services/FilterService";
import SmartPagination from "./SmartPagination";
import {
  SmartHeadButton,
  SmartTableNewColumnConfig,
  SmartTableNewDataRow,
  SmartTableNewProps,
  SmartTableNewTopProps,
} from "./SmartTableNewInterface";
import "./SmartTableStyle.scss";

interface SearchItem {
  index: string;
  value: string;
  type: string;
  condition?: string;
}

// Define the dynamic filters type
interface Filters {
  [key: string]: string | undefined | { value: string; label: string }; // Dynamic keys with optional values
}

const SmartTableNew: React.FC<SmartTableNewProps> = (props) => {
  const {
    tableTop,
    columns,
    data,
    tableProps,
    paginationProps,
    footerConfig,
    footerFunction,
    filterFields = [],
    noResutls
  } = props;
  //console.log("pagination props " , paginationProps);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState<number>(
    paginationProps?.pageSize ? paginationProps?.pageSize:  10
  );
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
    dataType?: any;
  } | null>(null);

  const [filterConfig, setFilterConfig] = useState<SearchItem[] | null>(null);
  const [filterInputs, setFilterInputs] = useState<Filters>({});
  const [globalSearch, setGlobalSearch] = useState<SearchItem[] | null>(null);
  const [enableFilter, setFilterEnable] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Handle dynamic input/select change
  const handleInputChange = (index: string, value: any) => {
    setFilterInputs((prevInputs) => ({
      ...prevInputs,
      [index]: value,
    }));
  };

  const getDataTypeWithIndex = (index: string) => {
    let column_index = columns.find((item) => item.index == index);
    return column_index && column_index.dataType
      ? column_index.dataType
      : "STRING";
  };

  const getFilterConditionIndex = (index: string) => {
    let column_index = columns.find((item) => item.index == index);
    return column_index && column_index.filterCondition
      ? column_index.filterCondition
      : "includes";
  };

  const updateFilterProps = () => {
    let globalConfig: SearchItem[] = [];
    if (filterInputs) {
      Object.keys(filterInputs).forEach((key) => {
        const value = filterInputs[key];
        let finalValue = "";
        if (typeof value === "string" && value.length > 0) {
          finalValue = value;
        } else if (typeof value === "object" && value?.value?.length > 0) {
          finalValue = value.value;
        }
        //console.log("value = ", value);
        if (finalValue && finalValue.length > 0) {
          globalConfig.push({
            index: key,
            value: finalValue,
            type: getDataTypeWithIndex(key),
            condition: getFilterConditionIndex(key),
          });
        }
      });
    }
    //console.log("search global ", globalConfig);
    setFilterConfig(globalConfig);
  };

  const updateGlobalSearchProps = () => {
    const searchIndexs = tableProps?.searchIndexes
      ? tableProps.searchIndexes
      : [];
    if (searchIndexs.length < 1) {
      columns.forEach((item) => {
        searchIndexs.push(item.index);
      });
    }
    // loop over search index and preapre the things with search values
    let globalConfig: SearchItem[] = [];
    searchIndexs.forEach((itemIndex) => {
      globalConfig.push({
        index: itemIndex,
        value: search,
        type: getDataTypeWithIndex(itemIndex),
        condition: getFilterConditionIndex(itemIndex),
      });
    });
   // console.log("search global ", globalConfig);
    setGlobalSearch(globalConfig);
  };

  const sortedData = useMemo(() => {
    let sorted = [...data];
    setCurrentPage(1);
    if (globalSearch && globalSearch.length > 0) {
      sorted = filterArrayOfObjectSearch(sorted, globalSearch);
    }
    // first filter should happen
    if (filterConfig) {
      sorted = filterArrayOfObject(sorted, filterConfig);
      // const { key, value } = filterConfig;
      // sorted = sorted.filter((item) =>
      //   String(item[key]).toLowerCase().includes(value.toLowerCase())
      // );
    }
    // now sort can happen
    if (sortConfig && sortConfig.key) {
      sorted = SmartSortData(sorted, sortConfig);
    }

    return sorted;
  }, [data, sortConfig, filterConfig, globalSearch]);

 

  const handleClickOutside = (event: MouseEvent) => {
    // Check if click is outside the ref element
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as Node)
    ) {
      setFilterEnable(false);
    }
  };

  useEffect(() => {
      setPageSize(paginationProps?.pageSize ? paginationProps?.pageSize : 10)
  }, [paginationProps]);

  useEffect(() => {
    if (search.length > 0) {
      updateGlobalSearchProps();
    } else {
      setGlobalSearch([]);
    }
  }, [search]);

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pageCount = pageSize > 1 ? Math.ceil(sortedData.length / pageSize) : 1;

  const handleSort = (key: string, dataType: any) => {
    if (sortConfig && sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
        dataType: dataType,
      });
    } else {
      setSortConfig({
        key,
        direction: "asc",
        dataType: dataType,
      });
    }
  };

  const setPageSizeHandle = (size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const startIndex: number = (currentPage - 1) * pageSize;
  const endIndex: number = startIndex + pageSize;

  const visibleData = useMemo(() => {
    if(pageSize > 1){
      return sortedData.slice(startIndex, endIndex);
    }else{
      return sortedData;
    }
    //console.log("s ", startIndex, " e=", endIndex);
   
  }, [sortedData, startIndex, endIndex]);

  const handleSortColumn = (column: SmartTableNewColumnConfig) => {
    if (column.isSortable) {
      handleSort(column.index, column.dataType);
    }
  };

  const displaySortingArrow = (column: SmartTableNewColumnConfig) => {
    let direction = "desc";
    if (sortConfig && sortConfig.key === column.index) {
      direction = sortConfig.direction;
    }
    return direction === "asc" ? (
      <span className="icon sorticon" onClick={() => handleSortColumn(column)}>
        <i className="fa fa-arrow-down"></i>
      </span>
    ) : (
      <span className="icon sorticon" onClick={() => handleSortColumn(column)}>
        <i className="fa fa-arrow-up"></i>
      </span>
    );
  };

  const tableHeadTdClasses = (column: SmartTableNewColumnConfig) => {
    let class_list = ["smart-table-column-" + column.index];
    if (column.width) {
      class_list.push("smart-table-column-width-" + column?.width);
    }
    if (column.classHead) {
      class_list.push(column.classHead);
    }
    if (column.isSortable) {
      class_list.push("smart-table-sortable");
    }
    return class_list.join(" ");
  };

  const tableHeadDisp = () => {
    return (
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={column.index + "_" + index}
              className={tableHeadTdClasses(column)}
            >
              {column.isSortable && displaySortingArrow(column)}
              {typeof column.title === "string" ? (
                <>{column.title}</>
              ) : (
                column.title // Directly render the React element
              )}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const getValue = (
    column: SmartTableNewColumnConfig,
    row: SmartTableNewDataRow
  ) => {
    if (column.valueFunction) {
      return column.valueFunction(row);
    } else {
      return row[column.index] !== undefined ? row[column.index] : null;
    }
  };

  const tagsDisplay = (column: SmartTableNewColumnConfig, value: any) => {
    let tags = Array.isArray(column?.tags) ? column?.tags : [];
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].value && tags[i].value === value) {
        return (
          <span className={"tag " + tags[i].class}>
            {tags[i].label ? tags[i].label : tags[i].value}
          </span>
        );
      }
    }
    return "";
  };

  const profileCardDisplay = (
    column: SmartTableNewColumnConfig,
    value: any
  ) => {};

  const progressDisplay = (column: SmartTableNewColumnConfig, value: any) => {
    return (
      <progress
        className={
          "progress " + column.progressClass
            ? column.progressClass
            : "is-primary"
        }
        value={value}
        max={column.progressMax ? column.progressMax : 100}
      >
        {value + "%"}
      </progress>
    );
  };

  const displayButtons = (
    column: SmartTableNewColumnConfig,
    row: SmartTableNewDataRow
  ) => {
    let buttons =
      column.buttons && Array.isArray(column.buttons) ? column.buttons : [];
    return buttons.map((item, index) => {
      let hide = item.hideFunction ? item.hideFunction(row) : false;
      let onClick = () => item.onClick(row);
      return !hide && <SmartButton key={index} {...item} onClick={onClick} />;
    });
  };

  const actionButton = (
    column: SmartTableNewColumnConfig,
    row: SmartTableNewDataRow
  ) => {
    return (
      <div className="smart-action-tooltip-button">
        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        <div className="smart-action-buttons">
          {displayButtons(column, row)}
        </div>
      </div>
    );
  };

  const displayBodyCell = (
    column: SmartTableNewColumnConfig,
    row: SmartTableNewDataRow,
    rowIndex: number
  ) => {
    const value = getValue(column, row);
    switch (column.type) {
      case "sno":
        return startIndex + rowIndex + 1;
      case "date":
        return formatDate(
          value,
          column.dateFormat || "MM-DD-YYYY",
          column.autoTimeZone || false
        );
      case "tags":
        return tagsDisplay(column, value);
      case "progress":
        return progressDisplay(column, value);
      case "buttons":
        return displayButtons(column, row);
      case "action":
        return actionButton(column, row);
      default:
        return value;
    }
  };

  const defaultFooterConfig = () => {
    return [
      {
        className: "is-1 p-2 is-3-mobile",
        footerType: "PAGE_SIZE_SELECT",
      },
      {
        className: "is-5 p-5 is-9-mobile",
        footerType: "SHOW_ENTRIES",
      },

      {
        className: "is-6 is-12-mobile",
        footerType: "PAGINATION",
      },
    ];
  };

  const showEntries = () => {
    return (
      <>
        Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of{" "}
        {sortedData.length} entries{" "}
      </>
    );
  };

  const paginationDisplay = () => {
    return (
      <SmartPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={pageCount}
        navigationIcon={paginationProps?.navigationIcon}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    );
  };

  const pageSizeOptions = () => {
    let _default = [
      { value: 5, label: 5 },
      { value: 10, label: 10 },
      { value: 15, label: 15 },
      { value: 20, label: 20 },
    ];
    return _default;
  };

  const pageSizeSelect = () => {
    return (
      <SmartSoftSelect
        options={pageSizeOptions()}
        onChange={(value) => {
          if (value.value) {
            setCurrentPage(1);
            setPageSize(parseInt(value.value));
          }
        }}
        value={{ value: "" + pageSize, label: "" + pageSize }}
      ></SmartSoftSelect>
    );
  };

  const singleFooter = (item: any) => {
    switch (item.footerType) {
      case "PAGE_SIZE_SELECT":
        return data && data.length > 0 && pageSize > 1 && pageSizeSelect();
      case "SHOW_ENTRIES":
        return (
          data && data.length > 0 && pageSize > 1 &&  data.length > pageSize && showEntries()
        );
      case "PAGINATION":
        return (
          data &&
          pageSize > 1 && 
          data.length > 0 &&
          data.length > pageSize &&
          paginationDisplay()
        );
      case "FUNCTION":
        return item.footerFunction(
          pageCount,
          setCurrentPage,
          setPageSizeHandle,
          startIndex,
          endIndex,
          sortedData.length
        );
      default:
        return "";
    }
  };

  const singleFooterDisplay = (index: any, item: any) => {
    const class_list = ["column"];
    if (item?.className) {
      class_list.push(item.className);
    }
    return (
      <div key={index} className={class_list.join(" ")}>
        {singleFooter(item)}
      </div>
    );
  };

  const footerDisplay = () => {
    const footerConfigFinal = footerConfig
      ? footerConfig
      : defaultFooterConfig();
    return footerConfigFinal.map((item, index) => {
      return singleFooterDisplay(index, item);
    });
  };

  /**
   *
   * @returns
   */
  const searchButton = () => {
    const rightIconFunction = () => {
      return search && search.length > 0 ? (
        <span onClick={() => setSearch("")} className="icon is-small is-right">
          <i className="fa fa-close"></i>
        </span>
      ) : (
        ""
      );
    };
    return (
      <SmartSoftInput
        value={search}
        onChange={(val) => setSearch(val)}
        leftIcon="fa-search"
        placeHolder={tableProps?.searchPlaceHolder}
        classList={["smart-table-search"]}
        rightIconFunction={rightIconFunction}
      />
    );
  };

  const singleHeadButton = (obj: SmartHeadButton) => {
    const buttonAction = () => {
      if (obj.action && obj.action instanceof Function) {
        obj.action(data, "");
      }
    };
    const defaultButtonDisplay = (icon: string | ReactElement | undefined) => {
      if (obj.label) {
        return (
          <button className={`button ${obj.className ? obj.className : ''}`} onClick={buttonAction}>
            <span className="icon">
              {typeof icon === "string" ? (
                <i className={"fa " + icon}></i>
              ) : (
                icon
              )}
            </span>
            <span className="label">{obj.label}</span>
          </button>
        );
      } else {
        return (
          <span onClick={buttonAction} className="icon ">
            {typeof icon === "string" ? <i className={"fa " + icon}></i> : icon}
          </span>
        );
      }
    };

    const filterConfigProps = () => {
      let applyButtonProps: SmartFormElementProps = {
        type: "BUTTON",
        width: "6",
        name: "appButton",
        element: {
          label: tableProps?.filterButtonLabel
            ? tableProps.filterButtonLabel
            : "Filter",
          classList: [
            "is-fullwidth",
            "smart-table-primary-button",
            "mt-2 mr-1",
          ],
          onClick: () => {
            updateFilterProps();
          },
        },
      };

      let clearButtonProps: SmartFormElementProps = {
        type: "BUTTON",
        width: "6",
        name: "appButton",
        element: {
          label: tableProps?.ClearButtonLabel
            ? tableProps.ClearButtonLabel
            : "Clear",
          classList: ["is-fullwidth", "smart-table-secondary-button", "mt-2"],
          onClick: () => {
            setFilterConfig([]);
            setFilterEnable(false);  
          },
        },
      };

      if (filterFields) {
        return [...filterFields, applyButtonProps, clearButtonProps];
      } else {
        return [];
      }
    };

    const filterButton = (icon: string | ReactElement | undefined) => {
      return (
        <div
          ref={filterRef}
          className={`dropdown is-right smart-table-filter-form ${
            enableFilter ? "is-active" : ""
          }`}
        >
          <div className="dropdown-trigger">
            <span
              className="ml-2"
              aria-haspopup="true"
              aria-controls="dropdown-menu2"
            >
              <span
                className="icon is-small"
                onClick={() => setFilterEnable(!enableFilter)}
              >
                {typeof icon === "string" ? (
                  <i className={"fa " + icon}></i>
                ) : (
                  icon
                )}
              </span>
            </span>
          </div>
          <div className="dropdown-menu" id="dropdown-menu2" role="menu">
            <div className="dropdown-content p-3">
              <SmartSoftForm
                formData={filterInputs}
                setFormData={handleInputChange}
                elements={filterConfigProps()}
                className="is-gapless"
              />
            </div>
          </div>
        </div>
      );
    };

    switch (obj.type) {
      case "REFRESH":
        return defaultButtonDisplay("fa-refresh");
      case "FILTER":
        return filterButton("fa-filter");
      case "CUSTOM":
        return defaultButtonDisplay(obj.icon);
      default:
        return <></>;
    }
  };

  const headButtonsDisplay = (row: SmartTableNewTopProps) => {
    return (
      row.buttons &&
      row.buttons.map((obj, index) => {
        return (
          <span
            key={"table_head_buttons_" + index}
            className="smart-table-head-buttons"
          >
            {singleHeadButton(obj)}
          </span>
        );
      })
    );
  };

  /**
   *
   * @param row
   * @returns
   */
  const headTopDisplaySingle = (row: SmartTableNewTopProps) => {
    switch (row.type) {
      case "SEARCH":
        return searchButton();
      case "BUTTONS":
        return headButtonsDisplay(row);
      case "CUSTOM":
        return row.custom instanceof String ? <>{row.custom}</> : row.custom;
      default:
        return <></>;
    }
  };

  const headElementsDisplay = () => {
    return (
      tableTop && (
        <div className="columns is-gapless smart-table-head">
          {tableTop.map((row, index) => (
            <div
              key={"index_" + index}
              className={`column ${row.widthClass} ${
                row?.align
                  ? "smart-table-head-column smart-table-head-" +
                    row.align.toLowerCase()
                  : ""
              }`}
            >
              {headTopDisplaySingle(row)}
            </div>
          ))}
        </div>
      )
    );
  };

  const noResultsFound=()=>{
    if(sortedData.length!=0){
      return null;
    }
    if(sortedData.length==0){
       return noResutls ? noResutls : <div className="has-text-centered"> No Results Found </div>
    }
  }

  return (
    <div  className={
      "smart-table-container " + tableProps?.className + "_main_container"
    } >
      {headElementsDisplay()}
      <div
        className={
          "smart-table-container " + tableProps?.className + "_container"
        }
      >
        <table
          className={`table is-fullwidth smart-table ${
            tableProps?.className ? tableProps?.className : ""
          } ${tableProps?.isResponsive ? "smart-table-responsive" : ""}`}
        >
          {tableHeadDisp()}
          <tbody>
            {visibleData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={column.index + "+" + colIndex}
                    className={column?.classBody}
                    data-label={
                      column.titleMobile ? column.titleMobile : column?.title
                    }
                  >
                    {displayBodyCell(column, row, rowIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {footerFunction && <>{footerFunction([...sortedData])}</>}
        </table>
        {noResultsFound()}
      </div>
      <div className="columns is-multiline is-vcentered p-0 smart-table-footer">
        {footerDisplay()}
      </div>
    </div>
  );
};

export default SmartTableNew;
