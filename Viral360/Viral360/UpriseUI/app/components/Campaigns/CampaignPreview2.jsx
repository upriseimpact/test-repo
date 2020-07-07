/* eslint-disable linebreak-style */
import React, {PureComponent} from 'react';

import FaEdit from 'react-icons/lib/fa/edit';
import FaPlus from 'react-icons/lib/fa/plus';
import FaEye from 'react-icons/lib/fa/eye';
import FaTrash from 'react-icons/lib/fa/trash';
import IoAndroidArrowDropdown from 'react-icons/lib/io/android-arrow-dropdown';
import IoAndroidArrowDropup from 'react-icons/lib/io/android-arrow-dropup';
import * as apiHelper from '../api-helper/index.jsx';

import CornflowerCampaignPreview from '../PostPreview/CornflowerCampaignPreview.jsx';

import './Campaigns.scss';

const statusEnum = {
    0: 'Pending',
    1: 'Upcoming',
    2: 'Live',
    3: 'Complete',
}

const monthEnum = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
}


export default class CampaignPreview2 extends PureComponent {

    constructor(props) {
        super(props);
        let currStatus = statusEnum[0];
        
        // add check for pending field
        if (props.campaign.LaunchDate && props.campaign.TargetDate) {
            let now = new Date();
            let launchYear = parseInt(props.campaign.LaunchDate.split('-')[0]);
            let launchMonth = parseInt(props.campaign.LaunchDate.split('-')[1]);
            let launchDay = parseInt(props.campaign.LaunchDate.split('-')[2].split('T')[0]);
            let goalYear = parseInt(props.campaign.TargetDate.split('-')[0]);
            let goalMonth = parseInt(props.campaign.TargetDate.split('-')[1]);
            let goalDay = parseInt(props.campaign.TargetDate.split('-')[2].split('T')[0]);

            // not published -> Pending
            // before launch -> Upcoming
            // after launch before goal -> Live
            // after goal -> Complete.

            // now.getMonth() STARTS AT 0!!!!!
            if (props.campaign.Disabled != true) {
                if (now.getFullYear() > launchYear || (now.getFullYear() == launchYear && (now.getMonth() + 1 > launchMonth || (now.getMonth() + 1 == launchMonth && now.getDate() >= launchDay)))) {
                    if (now.getFullYear() > goalYear || (now.getFullYear() == goalYear && (now.getMonth() + 1 > goalMonth || (now.getMonth() + 1 == goalMonth && now.getDate() >= goalDay)))) {
                        currStatus = statusEnum[3];
                    } else {
                        currStatus = statusEnum[2];
                    }
                } else {
                    currStatus = statusEnum[1];
                }
            }
        }
        this.state = {
            expand: false,
            status: currStatus,
        }
    }

    toggleExpand = () => {
        this.setState({
            expand: !this.state.expand,
        });
    }

    render() {
        const { campaign, distributor } = this.props;
        const { currState } = this.state;
        const previewStateExists = (Object.keys(campaign).length > 0);
        return <div className="campaign-table-row" >
            <div className="row-header" onClick={this.toggleExpand}>
                <div className="date-container">
                    <h1>{campaign.LaunchDate ? campaign.LaunchDate.split('-')[2].split('T')[0] : '--'}</h1>
                    <h2>{campaign.LaunchDate ? monthEnum[parseInt(campaign.LaunchDate.split('-')[1])] : '--'}</h2>
                </div>
                <div className="title-container">
                    {previewStateExists ? campaign.CampaignTitle : ':('}
                </div>
                <div className={'statusOrb ' + this.state.status}/>
                <div className="status-container">
                    {this.state.status}
                </div>
                <div className="dropdown-container">
                    {this.state.expand ? <IoAndroidArrowDropup/> : <IoAndroidArrowDropdown/>}
                </div>
            </div>
            
            {this.state.expand ? 
                <div className="campaign-dropdown">
                    <div className="body">
                        <div className="left-panel">
                            <div className="dropdown-header">
                                <a href={"/splash/" + campaign.Id} className="footer-element">
                                    <FaEye/><span>View</span>
                                </a>
                                <a href="#" className="footer-element">
                                    <FaEdit/><span><s>Edit</s></span>
                                </a>
                            </div>
                            <div className="dropdown-header">
                                <a href="#" className="footer-element">
                                    <FaPlus/><span><s>Clone</s></span>
                                </a>
                                <a href="#" className="footer-element">
                                    <FaTrash/><span><s>Delete</s></span>
                                </a>
                            </div>
                            <p>Launch date: {new Date(Date.parse(campaign.LaunchDate)).toDateString()}</p>
                            <p>Target date: {new Date(Date.parse(campaign.TargetDate)).toDateString()}</p>
                            <p>Location: {campaign.CampaignLocation.Region}</p>
                            <p>Platforms: 
                            {Object.values(campaign.Posts).map((post) => {
                                return apiHelper.socialMediaInfo(post.SocialMediaId).iconComponent;
                            })}
                            </p>
                        </div>

                        <div className="right-panel">
                            {/* maybe campaigns should grab all relevant distributors to avoid too many calls? */}
                            <CornflowerCampaignPreview previewState={this.props} publicView={false} />
                        </div>
                    </div>
                </div>
                :
                null}
        </div>;
    }
}
