import React from 'react';

require('./Spinner.scss');

function Spinner() {
    return <div className="spinner">
        <div className="_spinner-animation"></div>
    </div>;
}

export default Spinner;
