import React from 'react';

import './CornflowerActionButton.scss';

function CornflowerActionButton({
    className,
    buttonText,
    highlight,
    type,
    onClick
}) {
    return <button className={'cornflower-action-button ' + className}
        type={type || 'button'}
        data-highlight={highlight}
        onClick={onClick}
    >
        {buttonText}
    </button>;
}

export default CornflowerActionButton;
