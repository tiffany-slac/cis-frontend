import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ steps, currentStep }) => {
  // Determine the index of the current step
  const activeStepIndex = steps.findIndex(step => step === currentStep);

  // Calculate the progress based on the current step index
  const progress = (activeStepIndex / (steps.length - 1)) * 100;

  return (
    <div className="progress-bar vertical">
      <div className="progress" style={{ height: `${progress}%` }}></div>
      <div className="step-indicators">
        {steps.map((step, index) => (
          <div key={index} className={`step ${index <= activeStepIndex ? 'active' : ''}`}>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.string.isRequired, // Change the type to string
};

export default ProgressBar;
