import React from "react";
import './Tracker.css';

interface Step {
  id: number;
  label: string;
  icon: string;
}

interface TrackerProps {
  currentStep: number;
}

const Tracker: React.FC<TrackerProps> = ({ currentStep }) => {
  const steps: Step[] = [
    { id: 0, label: "New User", icon: "fa fa-check-circle" },
    { id: 1, label: "Details", icon: "fa fa-refresh" },
    { id: 2, label: "Quality Check", icon: "fa fa-search" },
    { id: 3, label: "Dispatched Item", icon: "fa fa-truck" },
  ];

  return (
    <div className="custom-order-tracker">
      <div className="custom-tracker-line">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`custom-tracker-step ${
              index < currentStep ? "custom-completed" : ""
            } ${index === currentStep ? "custom-current" : ""}`}
          >
            <div
              className={`custom-circle ${
                index < currentStep ? "custom-completed-circle" : ""
              } ${index === currentStep ? "custom-current-circle" : ""}
              ${index === steps.length - 1 ? "custom-final-circle" : ""}`}
            >
              <i className={step.icon}></i>
            </div>
            {index < steps.length - 1 && (
              <hr className={`custom-line ${index < currentStep ? "custom-completed-line" : ""}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracker;
