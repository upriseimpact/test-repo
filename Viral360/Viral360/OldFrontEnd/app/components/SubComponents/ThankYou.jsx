import React, { PureComponent } from 'react';

require('./ThankYou.scss');

export default class ThankYou extends PureComponent {
    render() {
        return (
            <div className="thanker">
              <div className="_thanker-animation" style={{"animationDuration": this.props.duration.toString().concat("ms")}}>Thank you for your feedback!</div>
            </div>
        );
    }
}

