import React, { PureComponent } from 'react';
import Card from './Card.jsx';

import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCaretUp from 'react-icons/lib/fa/caret-up';

import './GeneralLeaderboardCard.scss';

class GeneralLeaderboardCard extends PureComponent {
    render() {
        return (
            <Card p30 f1>
                <div className="learderboard-containter">
                    <div className="title">Leaderboard</div>
                    {this.props.data.map(({ name, thumbnail, score, up }, index) => (
                        <div className="learderboardItem" key={index}>
                            <img src={thumbnail} alt="" className="thumbnail"/>
                            <div className="name">{name}</div>
                            {up ? <FaCaretUp color="teal" size="15"/> : <FaCaretDown color="red" size="15"/>}
                            <div className="score">{score}</div>
                        </div>
                    ))}
                </div>
            </Card>);
    }
}

export default GeneralLeaderboardCard;
