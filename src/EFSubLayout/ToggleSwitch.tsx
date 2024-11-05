import React from 'react';
import "./EFSubLayout.scss";

type ToggleSwitchProps = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isDark, toggleTheme }) => {
  return (
    <div className={`toggle-switch ${isDark ? 'dark' : 'light'}`} onClick={toggleTheme}>
      <div className="toggle-thumb" />
    </div>
  );
};

export default ToggleSwitch;
