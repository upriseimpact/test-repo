import React, { PureComponent } from 'react';

import './Card.scss';

class Card extends PureComponent {
    render() {
        let className = 'card';
        className += this.props.p30 ? ' -p30' : '';
        className += this.props.f1 ? ' -f1' : '';
        className += this.props.f3 ? ' -f3' : '';
        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}

export default Card;
