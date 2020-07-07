import React, { PureComponent } from 'react';

import CornflowerMainTitleBar from '../SubComponents/CornflowerMainTitleBar.jsx';

import GeneralInsightsCard from '../SubComponents/GeneralInsightsCard.jsx';
import GeneralReachCard from '../SubComponents/GeneralReachCard.jsx';
import GeneralLeaderboardCard from '../SubComponents/GeneralLeaderboardCard.jsx';
import GeneralUserMap from '../SubComponents/GeneralUserMap.jsx';
import GeneralAgeCard from '../SubComponents/GeneralAgeCard.jsx';
import GeneralGenderCard from '../SubComponents/GeneralGenderCard.jsx';
import insightsData from '../../mockData/insights_data.json';
import reachData from '../../mockData/reach_data.json';
import leaderboardsData from '../../mockData/leaderboards_data.json';
import ageData from '../../mockData/age_data.json';
import genderData from '../../mockData/gender_data.json';

import IoForward from 'react-icons/lib/io/forward';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import IoIosGlassesOutline from 'react-icons/lib/io/ios-glasses-outline';
import IoAndroidChat from 'react-icons/lib/io/android-chat';
import * as apiHelper from '../api-helper/index.jsx';

import './GeneralScreen.scss';

class GeneralScreen extends PureComponent {

    render() {
        return <div className="general-screen">
            <div className="_title">
                <CornflowerMainTitleBar
                    title="General Dashboard"
                />
            </div>

            <div className="grid">
                <div className="row">
                    <GeneralInsightsCard
                        icon={<IoForward size="30" color="#6580ff"/>}
                        title={insightsData.share_insights} subtitle="total shares"/>
                    <GeneralInsightsCard
                        icon={<FaThumbsOUp size="30" color="#6580ff"/>}
                        title={insightsData.likes_insights} subtitle="total likes"/>
                    <GeneralInsightsCard
                        icon={<IoIosGlassesOutline size="30" color="#6580ff"/>}
                        title={insightsData.views_insights} subtitle="total views"/>
                    <GeneralInsightsCard
                        icon={<IoAndroidChat size="30" color="#6580ff"/>}
                        title={insightsData.comments_insights} subtitle="total comments"/>
                </div>
                <div className="row">
                    <GeneralReachCard data={reachData} match={this.props.match}/>
                    <GeneralLeaderboardCard data={leaderboardsData}/>
                </div>
                <div className="row">
                    <GeneralUserMap/>
                    <GeneralAgeCard data={ageData}/>
                    <GeneralGenderCard data={genderData}/>
                </div>
            </div>
        </div>;
    }
}

export default GeneralScreen;
