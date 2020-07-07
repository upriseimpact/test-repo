import React from 'react';

import CampaignWizardLayout from './CampaignWizardLayout.jsx';

require('./CampaignsScreen.scss');

function CampaignsScreen({ baseUrl, location }) {
    return <div className="campaigns-screen">
        <CampaignWizardLayout baseUrl={baseUrl} location={location} />
    </div>;
}

export default CampaignsScreen;
