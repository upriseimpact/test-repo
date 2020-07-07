import React, {PureComponent} from 'react';

import CornflowerCheckboxInput from '../FormElements/CornflowerCheckboxInput.jsx';
import TitleBar from '../TitleBar/TitleBar';

import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';
import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square';
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square';
import FaInstagram from 'react-icons/lib/fa/instagram';
import IoAndroidArrowDropdown from 'react-icons/lib/io/android-arrow-dropdown';
import IoAndroidArrowDropup from 'react-icons/lib/io/android-arrow-dropup';
import IoAndroidArrowDropright from 'react-icons/lib/io/android-arrow-dropright';
import MdCheck from 'react-icons/lib/md/check';

import * as apiHelper from '../api-helper/index.jsx';

import _ from 'lodash';

import './Advocates.scss';
import { advocates } from '../api-helper/mockData.jsx'; // should this be  an api call?

class Advocates extends PureComponent {
    constructor(props) {
        super(props);

        //JSON.parse(localStorage.getItem('contacts'))
        // can we dynamically use localstorage or bakcend call?
        // should the highest parent component make all nessisary calls
        //     push that to localstorage
        //     and have all lower component strictly use locastorage
        // as long as lower components are called only after parent then data should be valid.
        this.state = {
            contacts: null,
            filteredContacts: null,
            sortState: ''
        };

        apiHelper.listAdvocates(3) 
            .then((aList) => {
                //console.log(aList);
                const contacts = aList;
                _.forEach(contacts, (contact) => {
                    _.set(contact, 'selected', '');
                });
                this.setState({
                    contacts,
                    filteredContacts: contacts
                }, () => {
                    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
                });
            });
    }

    // this function is called after uploading new advocates
    // so it is used as a 'refresh' on the list (to assign unique ids)
    // if radically changed check spots where it is manually called
    componentDidMount() {
        //console.log("Mounted");
    }

    filterContacts = (value) => {
        const contacts = this.state.contacts;
        const filteredContacts = _.filter(contacts, (contact) => {
            return (_.includes(contact.FirstName.toLowerCase(), value) ||
            _.includes(value, contact.FirstName.toLowerCase()) ||
            _.includes(contact.LastName.toLowerCase(), value) ||
            _.includes(value, contact.LastName.toLowerCase()) ||
            _.includes(contact.City.toLowerCase(), value) ||
            /*_.includes(contact.industry.toLowerCase(), value) ||*/ 
            _.includes(contact.Country.toLowerCase(), value));
        });
        this.setState({
            filteredContacts: value ? filteredContacts : contacts
        });
    };

    // if paramName does not exist return nothing
    // otherwise sorts and setState with filtered by paramName
    sortContacts = (paramName, reverse=false) => {
        // deep copy
        const contacts = this.state.contacts.map(contact => ({...contact}));
        let sortedContacts = this.state.filteredContacts.map(filteredContacts => ({...filteredContacts}));

        if (sortedContacts.length <= 0) return;
        //console.log("sorting by: " + paramName + ", " + reverse);
        if (sortedContacts[0].hasOwnProperty(paramName)) {
            // assumes all contacts have identical structure

            // sort sortedContacts with viable paramName
            // reverse sorting determined by?
            sortedContacts.sort((a,b) => {
                let det = a[paramName] < b[paramName] ? 1 : (a[paramName] > b[paramName] ? -1 : 0);
                return reverse ? -det : det;
            });
            this.setState({
                contacts,
                filteredContacts: sortedContacts,
                sortState: paramName + (reverse ? 'R' : '')
            });
        }
    }

    checkUncheckContacts = (event, index) => {
        const filteredContacts = this.state.filteredContacts.map(filteredContacts => ({...filteredContacts}));
        const contacts = this.state.contacts.map(contact => ({...contact}));

        if (index == -1) {
            _.forEach(filteredContacts, (fc) => {
                fc.selected = event.target.checked;
            });
            _.forEach(contacts, (c) => {
                c.selected = event.target.checked;
            });
        } else {
            filteredContacts[index].selected = event.target.checked;
            _.forEach(contacts, (contact) => {
                if (contact.Id === filteredContacts[index].Id) {
                    contact.selected = event.target.checked;
                }
            });
        }

        // return list of selected Ids only
        if (this.props.selectCallback) {
            this.props.selectCallback(contacts.filter(ctact => ctact.selected == true).map(s_ctact => s_ctact.Id));
        }

        this.setState({
            filteredContacts,
            contacts
        });
    };

    deleteSelection = () => {
        const filteredContacts = this.state.filteredContacts.map(filteredContact => ({...filteredContact}));
        const contacts = this.state.contacts.map(contact => ({...contact}));

        const isSelected = _.filter(filteredContacts, (filteredContacts) => {
            return (filteredContacts.selected === true);
        });

        if (isSelected.length) {
            if (window.confirm('Are you sure you wish to delete these items?')) {
                //remove from backend, on success remove from local
                //apiHelper.deleteAdvocate(id)
                _.forEach(filteredContacts, (checkAdv) => {
                    if (checkAdv.selected == true) {
                        apiHelper.deleteAdvocate(checkAdv.Id)
                            .then((response) => {
                                if (response.success == 'true') {
                                    _.remove(filteredContacts, {Id: filteredContacts[index].Id});
                                    _.remove(contacts, {Id: filteredContacts[index].Id});
                                
                                    // can this be unfied to 1 setState call?
                                    this.setState({
                                        filteredContacts,
                                        contacts
                                    }, () => {
                                        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
                                    });
                                } else {
                                    console.log('failed to remove contact: ' + filteredContacts[index].Id)
                                }
                            })
                            .catch(err => {
                                alert(err);
                            });
                    }
                });

                //_.remove(filteredContacts, {selected: true});
                //_.remove(contacts, {selected: true});

                // setState after all apiHelper calls have finished...
                /*
                this.setState({
                    filteredContacts,
                    contacts
                }, () => {
                    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
                });
                */
            }
        }
        else {
            alert('Please select contact(s) for this operation.');
        }
    };

    convertCSVtoJSON = (readerResult) => {
        const arr = readerResult.split('\n');
        let jsonObj = [];
        let headers = arr[0].split(',');
        for (let i = 1; i < arr.length; i++) {
            let data = arr[i].split(',');
            let obj = {};
            for (let j = 0; j < data.length; j++) {
                if (headers[j]) {
                    obj[headers[j].trim()] = data[j].trim();
                }
            }
            jsonObj.push(obj);
        }
        return jsonObj;
    };

    uploadContacts = (file) => {
        //console.log(file);
        if (!file) {
            // failed upload, error out
            alert("failed to load file");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const JsonObj = this.convertCSVtoJSON(reader.result);
            let flag = true;
            // validation?
            for (let i = 0; i < JsonObj.length; i++) {
                flag = _.has(JsonObj[i], 'Platform') && _.has(JsonObj[i], 'Email');
            }
            if (flag) {
                //upload to backend, if success add to local
                // NEED to obtain id for sorting and keying so I need to either
                // get created advocates in response and append,
                // OR make a call for all entire list again
                apiHelper.advocateBatchImport(3, file)
                    .then((aResponse) => {

                        //grab all advocates again (to have assigned id's)
                        // could just recieve newly added in response and append?
                        apiHelper.listAdvocates(3) 
                            .then((aList) => {
                                const contacts = aList;
                                _.forEach(contacts, (contact) => {
                                    _.set(contact, 'selected', '');
                                });
                                this.setState({
                                    contacts,
                                    filteredContacts: contacts
                                }, () => {
                                    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
                                });
                            });
                    })
                    .catch((err) => {
                        alert("Advocates Upload failed (Connection failed)");
                    });
            } else {
                alert('Please check the data');
            }
        };
        reader.readAsText(file);
    }

    render() {
        const { filteredContacts } = this.state;

        return <div className="advocates-screen">
            <div className="_title">
                <TitleBar
                    title="Advocates List"
                    actionItem="Delete Selection"
                    searchPlaceholder="Search Contacts"
                    filter={this.filterContacts}
                    entity="advocates"
                    deleteSelection={this.deleteSelection}
                    importHandler={this.uploadContacts}
                    importInfo={'Upload file must be .csv file with manditory fields: "Platform"(Integer) and "Email"(String). \n Optional Fields: "FirstName", "LastName", "City", "Country", "Gender", "Age".'}
                />
            </div>

            <table>
                <thead>
                <tr>
                    <th className="-checkbox">
                        <CornflowerCheckboxInput onChange={(event) => this.checkUncheckContacts(event, -1)}/>
                    </th>
                    <th className="-wide">
                        <button onClick={() => this.sortContacts("FirstName", this.state.sortState == "FirstName")} type="button">
                            <span className="_label">Name</span>
                            {this.state.sortState == "FirstName" ?
                                <IoAndroidArrowDropdown className="_arrow-icon"/>
                                :
                                (this.state.sortState == "FirstNameR" ?
                                    <IoAndroidArrowDropup className="_arrow-icon"/>
                                    :
                                    <IoAndroidArrowDropright className="_arrow-icon"/>)}
                        </button>
                    </th>
                    <th className="-narrow">
                        <button onClick={() => this.sortContacts("Platform", this.state.sortState == "Platform")} type="button">
                            <span className="_label">Platform</span>
                            {this.state.sortState == "Platform" ?
                                <IoAndroidArrowDropdown className="_arrow-icon"/>
                                :
                                (this.state.sortState == "PlatformR" ?
                                    <IoAndroidArrowDropup className="_arrow-icon"/>
                                    :
                                    <IoAndroidArrowDropright className="_arrow-icon"/>)}
                        </button>
                    </th>
                    <th className="-wide">
                        <button onClick={() => this.sortContacts("City", this.state.sortState == "City")} type="button">
                            <span className="_label">Location</span>
                            {this.state.sortState == "City" ?
                                <IoAndroidArrowDropdown className="_arrow-icon"/>
                                :
                                (this.state.sortState == "CityR" ?
                                    <IoAndroidArrowDropup className="_arrow-icon"/>
                                    :
                                    <IoAndroidArrowDropright className="_arrow-icon"/>)}
                        </button>
                    </th>
                    <th className="-narrow">
                        <button onClick={() => this.sortContacts("Age", this.state.sortState == "Age")} type="button">
                            <span className="_label">Age</span>
                            {this.state.sortState == "Age" ?
                                <IoAndroidArrowDropdown className="_arrow-icon"/>
                                :
                                (this.state.sortState == "AgeR" ?
                                    <IoAndroidArrowDropup className="_arrow-icon"/>
                                    :
                                    <IoAndroidArrowDropright className="_arrow-icon"/>)}
                        </button>
                    </th>
                    <th className="-narrow">
                        <button onClick={() => this.sortContacts("Gender", this.state.sortState == "Gender")} type="button">
                            <span className="_label">Gender</span>
                            {this.state.sortState == "Gender" ?
                                <IoAndroidArrowDropdown className="_arrow-icon"/>
                                :
                                (this.state.sortState == "GenderR" ?
                                    <IoAndroidArrowDropup className="_arrow-icon"/>
                                    :
                                    <IoAndroidArrowDropright className="_arrow-icon"/>)}
                        </button>
                    </th>
                    <th className="-narrow">
                        <button type="button">
                            {/* no Reach stored on backend */}
                            <span className="_label"><s>Reach</s></span>
                            <IoAndroidArrowDropdown className="_arrow-icon"/>
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {/* Throws key warning, can add to individual text if desired */}
                {filteredContacts != null && filteredContacts.map((contact, index) =>
                    <tr key={contact.id}>
                        <td key={'checkboxCell' + contact.id} className="-checkbox">
                            <label key={'checkboxLabel' + contact.id}
                                className="cornflower-checkbox-input"
                            >
                                <input key={'checkboxInput' + contact.id}
                                    type="checkbox"
                                    checked={contact.selected}
                                    onChange={(event) => this.checkUncheckContacts(event, index)}
                                />
                                <span key={'checkboxIcon' + contact.id} className="_icon">
                                    <MdCheck/>
                                </span>
                            </label>
                        </td>
                        <td key={'nameCell' + contact.id} className="-name-and-networks">
                            <span key={'name' + contact.id} className="_name">{`${contact.FirstName} ${contact.LastName}`}</span>

                        </td>
                        <td key={'platformCell' + contact.id}>
                            {apiHelper.socialMediaInfo(contact.Platform).iconComponent}
                        </td>
                        <td key={'locationCell' + contact.id}>
                            {`${contact.City}, ${contact.Country}`}
                        </td>
                        <td key={'ageCell' + contact.id}>
                            {contact.Age}
                        </td>
                        <td key={'genderCell' + contact.id}>
                            {['Male', 'Female', 'Other'][contact.Gender]}
                        </td>
                        <td key={'reach' + contact.id}>
                            0
                            {/*contact.reach*/}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>;
    }
}

export default Advocates;
