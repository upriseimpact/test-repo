import React from 'react';

require('./ActionButton.scss');

function ActionButton({
    buttonText,
    onClick,
    isSmall,
    isInverse,
    type,
    disabled
}) {
    return <div className="action-button">
        <button
            type={type || 'button'}
            data-small={isSmall}
            data-inverse={isInverse}
            onClick={onClick && (() => onClick())}
            disabled={disabled}
        >
            {buttonText}
        </button>
    </div>;
}

export default ActionButton;
