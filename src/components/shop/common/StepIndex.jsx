import React from "react";

const StepIndex = (props) => {
  var { index } = props;
  const classStep = "step-text label";
  const classStepCurrent = "step-text label current-step";

  return (
    <div className="step-index">
      <div className="step-grid">
        <div className={index === "1" ? classStepCurrent : classStep}>Cart</div>
        <div className={index === "2" ? classStepCurrent : classStep}>
          Shipping
        </div>
        <div className={index === "3" ? classStepCurrent : classStep}>
          Payment
        </div>
        <div className={index === "4" ? classStepCurrent : classStep}>
          Done!
        </div>

        <div className="step-line"></div>

        <div
          className={index === "1" ? "step1 current-step-circle" : "step1 "}
        ></div>
        <div
          className={index === "2" ? "step2 current-step-circle" : "step2 "}
        ></div>
        <div
          className={index === "3" ? "step3 current-step-circle" : "step3 "}
        ></div>
        <div
          className={index === "4" ? "step4 current-step-circle" : "step4 "}
        ></div>
      </div>
    </div>
  );
};

export default StepIndex;
