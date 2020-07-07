import React, { PureComponent } from 'react';

import CornflowerCheckboxInput from '../FormElements/CornflowerCheckboxInput.jsx';
import CornflowerMainTitleBar from '../SubComponents/CornflowerMainTitleBar.jsx';

import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';
import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square';
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square';
import FaInstagram from 'react-icons/lib/fa/instagram';
import IoAndroidArrowDropdown from 'react-icons/lib/io/android-arrow-dropdown';

// eslint-disable-next-line id-length
import _ from 'lodash';

import './AdvocatesScreen.scss';
import mockContacts from './advocates-mock-data.js';

class AdvocatesScreen extends PureComponent {
    constructor() {
        super();

        this.state = {
            contacts: mockContacts,
            filteredContacts: mockContacts
        };
    }

    filterContacts = (value) => {
        const contacts = this.state.contacts;
        const filteredContacts = _.filter(contacts, (contact) => {
            return (_.includes(contact.firstName.toLowerCase(), value) || _.includes(contact.lastName.toLowerCase(), value) || _.includes(contact.city.toLowerCase(), value) || _.includes(contact.industry.toLowerCase(), value) || _.includes(contact.country.toLowerCase(), value));
        });
        this.setState({
            filteredContacts: value ? filteredContacts : contacts
        });
    };

    render() {
        return <div className="advocates-screen">
            <div className="_title">
                <CornflowerMainTitleBar
                    title="Advocates List"
                    actionItem="Delete Selection"
                    searchPlaceholder="Search Contacts"
                    searchCallback={(value) => {
                        this.filterContacts(value.toLowerCase());
                    }}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th className="-checkbox">
                            <CornflowerCheckboxInput />
                        </th>
                        <th className="-wide">
                            <button type="button">
                                <span className="_label">Name</span>
                                <IoAndroidArrowDropdown className="_arrow-icon" />
                            </button>
                        </th>
                        <th className="-wide">
                            <button type="button">
                                <span className="_label">Industry</span>
                                <IoAndroidArrowDropdown className="_arrow-icon" />
                            </button>
                        </th>
                        <th className="-wide">
                            <button type="button">
                                <span className="_label">Location</span>
                                <IoAndroidArrowDropdown className="_arrow-icon" />
                            </button>
                        </th>
                        <th className="-narrow">
                            <button type="button">
                                <span className="_label">Age</span>
                                <IoAndroidArrowDropdown className="_arrow-icon" />
                            </button>
                        </th>
                        <th className="-narrow">
                            <button type="button">
                                <span className="_label">Gender</span>
                                <IoAndroidArrowDropdown className="_arrow-icon" />
                            </button>
                        </th>
                        <th className="-narrow">
                            <button type="button">
                                <span className="_label">Reach</span>
                                <IoAndroidArrowDropdown className="_arrow-icon" />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.filteredContacts.map(contact =>
                        <tr key={contact.id}>
                            <td className="-checkbox">
                                <CornflowerCheckboxInput />
                            </td>
                            <td className="-name-and-networks">
                                <span className="_name">{`${contact.firstName} ${contact.lastName}`}</span>
                                <span className="_networks">
                                    {contact.socialNetworks.includes('facebook') && <FaFacebookSquare /> }
                                    {contact.socialNetworks.includes('linkedIn') && <FaLinkedinSquare /> }
                                    {contact.socialNetworks.includes('twitter') && <FaTwitterSquare /> }
                                    {contact.socialNetworks.includes('instagram') && <FaInstagram /> }
                                </span>
                            </td>
                            <td>
                                {contact.industry}
                            </td>
                            <td>
                                {`${contact.city}, ${contact.country}`}
                            </td>
                            <td>
                                {contact.age}
                            </td>
                            <td>
                                {contact.gender}
                            </td>
                            <td>
                                {contact.reach}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>;
    }
}

export default AdvocatesScreen;
