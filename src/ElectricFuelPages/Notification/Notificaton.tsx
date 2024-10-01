import { useEffect, useRef, useState } from "react";
import { useSiteContext } from "../../contexts/SiteProvider";
import SmartAccordion from "../../components/site/SmartAccoding";
import "../../EFSubLayout/EFSubLayout.scss";

const Notificaton = () => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { setLoading, refreshUser, user } = useSiteContext();

  const card_body = (index: string) => {
    return (
      <>{/* <SingleNotification type={index} setActive={setActive} /> */}</>
    );
  };

  const AccountTitle = () => {
    return (
      <div>
        <div className="position-relative">Account Notification</div>
      </div>
    );
  };

  const GeneralTitle = () => {
    return (
      <div>
        <div className="position-relative">General Notification</div>
      </div>
    );
  };

  const PurchaseTitle = () => {
    return (
      <div>
        <div className="position-relative">
          Purchase & Redemption Notification
        </div>
      </div>
    );
  };

  const RequestTitle = () => {
    return (
      <div>
        <div className="position-relative">
          Request & Complaint Notification
        </div>
      </div>
    );
  };

  const data = [
    {
      title: <AccountTitle />,
      bodyFunction: () => card_body("ACCOUNT"),
    },
    {
      title: <GeneralTitle />,
      bodyFunction: () => card_body("GENERAL"),
    },
    {
      title: <PurchaseTitle />,
      bodyFunction: () => card_body("PURCHASE"),
    },
    {
      title: <RequestTitle />,
      bodyFunction: () => card_body("REQUEST"),
    },
  ];

  const notificationCard = () => {
    return (
      <div className="card p-0">
        <header className="card-header">
          <p className="card-header-title">
            <span className="">Notifications</span>{" "}
          </p>
          <button className="card-header-icon" aria-label="more options">
            <span className="customer-notification-text">Mark all as read</span>
          </button>
        </header>
        <div className="card-content p-0">
          <div className="content customer-notification-body">
            <SmartAccordion data={data} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={active ? "dropdown is-right is-active" : "dropdown is-right"}
      key="s1"
    >
      <span
        className="icon dropdown-trigger customer-header-icon"
        onClick={() => setActive((prevActive) => !prevActive)}
      >
        <i
          className="fa fa-bell"
          aria-hidden="true"
          aria-controls="dropdown-menu"
        ></i>
        <span className="user-badge">1</span>
      </span>
      {active && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">{notificationCard()}</div>
        </div>
      )}
    </div>
  );
};

export default Notificaton;
