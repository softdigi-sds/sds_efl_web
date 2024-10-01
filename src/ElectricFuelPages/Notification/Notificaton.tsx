import { useEffect, useRef, useState } from "react";
import "../../EFSubLayout/EFSubLayout.scss";
import { ADMIN_USER_LOGO } from "../../services/ImageService"; // Assuming this is a valid image import
import { SmartSoftButton } from "soft_digi";

const Notification = () => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const notifications = [
    {
      id: 1,
      user: "Ray Arnold",
      avatar: ADMIN_USER_LOGO, // Correctly using the ADMIN_USER_LOGO
      action: "left 6 comments on Isla Nublar SOC2 compliance report",
      time: "Last Wednesday at 9:42 am",
    },
    {
      id: 2,
      user: "Denise Nedry",
      avatar: ADMIN_USER_LOGO,
      message:
        "Oh, I finished de-bugging the phones, but the system's compiling for eighteen minutes, or...",
      time: "Last Wednesday at 9:42 am",
    },
    {
      id: 3,
      user: "John Hammond",
      avatar: ADMIN_USER_LOGO,
      action: "attached a file to Isla Nublar SOC2 compliance report",
      // file: { name: "EY_review.pdf", size: "2mb" },
      time: "Last Wednesday at 9:42 am",
    },
  ];
  const clear_btn = () =>{
    console.log("data")
  }

  const notificationCard = () => {
    return (
      <div className="card p-0">
        <header className="card-header">
          <p className="card-header-title">
            <span>Notifications</span>{" "}
          </p>
        </header>
        <div className="card-content p-0">
          <div className="content customer-notification-body">
            {notifications.map((notification) => (
              <div className="notification-item" key={notification.id}>
                <div className="notification-header is-flex">
                  {/* Notification avatar */}
                  <img
                    className="notification-avatar is-rounded"   
                    src={notification.avatar}
                    alt={`${notification.user}'s avatar`}
                  />
                  <div className="notification-info">
                    <div className="is-flex  is-align-items-center">

                    <strong>{notification.user}</strong>{" "}
                    <div>{notification.action}</div>
                    </div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                </div>
                {/* Notification message */}
                {notification.message && (
                  <div className="notification-message">
                    <p>{`"${notification.message}"`}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <footer className="card-footer">
          <SmartSoftButton
            label="View all"
            classList={["button","card-footer-item", "mt-4 mr-4" ]}
            onClick={clear_btn}
          />
          <SmartSoftButton
            label=" Clear all"
            classList={["button is-danger card-footer-item mt-4 mr-4"  ]}
            onClick={clear_btn}
          />
        </footer>
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

export default Notification;
