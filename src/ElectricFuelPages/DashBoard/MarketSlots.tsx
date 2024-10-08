import { useEffect, useState } from "react";
import Calendar from "react-calendar";

interface SectorOption {
  value: string;
  label: string;
}

const options: SectorOption[] = [
  { value: "1", label: "Top Ranking" },
  { value: "2", label: "Promos" },
];

const MarketSlots: React.FC = () => {
  const [tabData, setTabData] = useState<Record<
    string,
    number | undefined
  > | null>(null);
  const [dated, setDate] = useState<Date | null>(new Date());
  const [sector, setSector] = useState<SectorOption>(options[0]);

  const loadTableData = (mode: SectorOption) => {
    const simulatedData: Record<string, number> = {
      "2024-10-01": 1,
      "2024-10-02": 2,
      "2024-10-03": 1,
    };
    setTabData(simulatedData);
  };

  useEffect(() => {
    loadTableData(sector);
  }, [dated, sector]);

  const tileContent = ({
    date,
    view,
    activeStartDate,
  }: {
    date: Date;
    view: string;
    activeStartDate: Date;
  }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];

      if (date.getMonth() !== activeStartDate.getMonth()) {
        return <div className="title-content date-disabled"></div>;
      }

      const dateContent =
        tabData && tabData[formattedDate]
          ? `date-${tabData[formattedDate]}`
          : "";

      return (
        <div className={`title-content ${dateContent}`}>
          <span>{date.getDate()}</span>
        </div>
      );
    }
    return null;
  };

  const getMonthYearDisplay = () => {
    return `${
      dated ? dated.toLocaleString("default", { month: "long" }) : "Month"
    } - ${dated?.getFullYear()}`;
  };

  const topDisplay = () => (
    <div className="columns mt-5 is-multiline">
      <div className="column is-6">
        {" "}
        <div className="is-size-4 has-text-weight-bold">
          Vehicles Report
        </div>{" "}
      </div>
      <div className="column is-size-3 is-6 has-text-right admin-market-offer-table">
        <i
          className="fa fa-arrow-circle-o-left mr-3 pointer"
          aria-hidden="true"
          onClick={prevMonth}
        ></i>
        <i
          className="fa fa-arrow-circle-o-right ml-3 pointer"
          aria-hidden="true"
          onClick={nextMonth}
        ></i>
      </div>
      <div className="column is-12 has-text-centered p-0">
        <span className="market-slot-text">{getMonthYearDisplay()}</span>
      </div>
    </div>
  );

  const nextMonth = () => {
    if (dated) {
      setDate(new Date(dated.getFullYear(), dated.getMonth() + 1));
    }
  };

  const prevMonth = () => {
    if (dated) {
      setDate(new Date(dated.getFullYear(), dated.getMonth() - 1));
    }
  };

  return (
    <>
      {topDisplay()}
      {tabData && (
        <div className="market-calendar">
          <Calendar
            onChange={(value) => {
              if (Array.isArray(value)) {
                // console.log("Selected range: ", value);
              } else {
                setDate(value);
              }
            }}
            value={dated}
            tileContent={tileContent}
            showNavigation={false}
          />
        </div>
      )}
    </>
  );
};

export default MarketSlots;
