import React, { PureComponent } from 'react';
import Card from './Card.jsx';
import './GeneralInsightsCard.scss';

class GeneralInsightsCard extends PureComponent {
    render() {
        return (
            <Card p30 f1>
                <div className="insights-card-container">
                    <div className="icon-container">
                        {this.props.icon}
                    </div>

                    <div className="text-conainer">
                        <div className="title">
                            {this.props.title}
                        </div>
                        <div className="subtitle">
                            {this.props.subtitle}
                        </div>
                    </div>
                </div>
            </Card>);
    }
}

export default GeneralInsightsCard;
