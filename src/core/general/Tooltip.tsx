import React, { useState } from 'react';
import './general.scss';
import { smartTooltipProps } from './SmartGeneralInterface';

const Tooltip:React.FC< smartTooltipProps> = (props) => {
    const {children, content, position}=props
    const [visible, setVisible] = useState(false);

    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return (
        <div className="tooltip-wrapper"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}>
            {children}
            {visible && (
                <div className={`tooltip-box tooltip-${position}`}>
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip
