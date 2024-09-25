import React, { useState } from "react";
import './VerticalOrderTracker.css';
import Tracker from "./Tracker";

interface Step {
  id: number;
  label: string;
  icon: string;
}

const VerticalOrderTracker: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(3);

  const steps: Step[] = [
    { id: 1, label: "Confirmed Order", icon: "fa fa-check-circle" },
    { id: 2, label: "Processing Order", icon: "fa fa-refresh" },
    { id: 3, label: "Quality Check", icon: "fa fa-search" },
    { id: 4, label: "Dispatched Item", icon: "fa fa-truck" },
    { id: 5, label: "Product Delivered", icon: "fa fa-gift" },
  ];

  return (
    <>
      <div className="order-tracker-vertical">
        <div className="tracker-line-vertical">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`tracker-step ${
                index < currentStep ? "completed" : ""
              } ${index === currentStep ? "current" : ""}`}
            >
              <div
                className={`circle ${
                  index < currentStep ? "completed-circle" : ""
                } ${index === currentStep ? "current-circle" : ""}
                ${index === steps.length - 1 ? "final-circle" : ""}`}
              >
                <i className={step.icon}></i>
              </div>
              {index < steps.length - 1 && (
                <hr className={`line-vertical ${index < currentStep ? "completed-line" : ""}`} />
              )}
            </div>
          ))}
        </div>
        <div className="tracker-labels-vertical">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`tracker-label ${
                index <= currentStep ? "active-label" : "inactive-label"
              }`}
            >
            </div>
          ))}
        </div>
      </div>
      <div className="">
      </div>

    </>
  );
};

export default VerticalOrderTracker;
