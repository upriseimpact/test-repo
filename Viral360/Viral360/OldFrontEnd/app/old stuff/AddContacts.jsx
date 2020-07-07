import React, { PureComponent } from 'react';
import { Map, Preview } from 'react-collectable';
import { Task } from 'react-dynamics';

import CheckboxInput from './CheckboxInput.jsx';
import Searchbox from './Searchbox.jsx';
import ActionButton from './ActionButton.jsx';
import ActionOverlay from './ActionOverlay.jsx';
import AddContactForm from './AddContactForm.jsx';
import ImportContactForm from './ImportContactForm.jsx';

import MdPerson from 'react-icons/lib/md/person';

import './AddContacts.scss';
import mockContacts from './add-contacts-mock-data.js';

class AddContacts extends PureComponent {
    constructor() {
        super();

        this.state = {
            contacts: mockContacts
        };
    }

    _addNewContacts(newContacts) {
        this.setState(prevState => ({
            contacts: prevState.contacts.concat(newContacts)
        }));
    }

    render() {
        return <Preview>{(lastValue, requestPrefetch) =>
            <div className="add-contacts">
                <div className="_header">
                    <div className="_searchbar">
                        <Searchbox placeholder="Search Contacts" />
                    </div>
                    <Task then={newContacts => this._addNewContacts(newContacts)}>
                        {(popupState, invokePopup) => <React.Fragment>
                            <ActionButton
                                buttonText="Add Contact"
                                isSmall
                                isInverse
                                onClick={() => invokePopup()}
                            />

                            {popupState && <ActionOverlay
                                taskState={popupState}
                                action={(newContacts) => new Promise(resolve => setTimeout(resolve, 500)).then(() => {
                                    let newContactsArray = [];
                                    if (Array.isArray(newContacts)) {
                                        newContactsArray = newContacts;
                                    } else {
                                        newContactsArray = [ newContacts ];
                                    }
                                    const contactsWithIds = newContactsArray.map(contact => {
                                        return { ...contact, id: Math.random().toString() };
                                    });
                                    return contactsWithIds;
                                })}
                                then={(newContacts) => popupState.resolve(newContacts)}
                                title="Add Contacts"
                                submitLabel="Save"
                                navItems={{
                                    addContact: 'Add Contact',
                                    importContacts: 'Import Contacts'
                                }}
                            >
                                {(currentTab) => {
                                    switch (currentTab) {
                                    case 'addContact':
                                        return <AddContactForm />;
                                    case 'importContacts':
                                        return <ImportContactForm />;
                                    default:
                                        throw new Error('missing navItems');
                                    }
                                }}
                            </ActionOverlay>}
                        </React.Fragment>}
                    </Task>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody className="_list">
                        <Map filter={(value) => Object.keys(value).filter(item => value[item])}>{(Parameter) => <React.Fragment>
                            {this.state.contacts.map(contact =>
                                <tr
                                    className="_contact"
                                    key={contact.id}
                                    data-selected={lastValue && lastValue.includes(contact.id)}
                                >
                                    <td className="_checkbox">
                                        <Parameter name={contact.id}>
                                            <CheckboxInput
                                                onChange={() => requestPrefetch()}
                                            />
                                        </Parameter>
                                    </td>
                                    <td className="_name">
                                        <span className="_image">
                                            <MdPerson />
                                        </span>
                                        {`${contact.firstName} ${contact.lastName}`}
                                    </td>
                                    <td className="_location">
                                        {`${contact.city}, ${contact.province}, ${contact.country}`}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>}</Map>
                    </tbody>
                </table>
            </div>
        }</Preview>;
    }
}

export default AddContacts;
