import React, { PureComponent } from 'react';
import ThankYou from './ThankYou.jsx';

import './CornflowerFeedbackModal.scss';

export default class CornflowerFeedbackModal extends PureComponent {

    constructor() {
        super();

        this.animDuration = 1500;
        this.EMAILJS_SERVICE = "gmail";
        this.EMAILJS_TEMPLATE = "feedback_template";

        this.state = { subject: '', message: '' , messageSent: false, subjectError: false, messageError: false};

        document.addEventListener('click', this.handleClick, false);
    }

    handleClick = (e) => {
        this.setState({ subjectError: false, messageError: false });

        if (this.notifDisplay != null && this.notifDisplay.contains(event.target)) {
            return;
        }
        document.removeEventListener('click', this.handleClick, false);
        this.props.closeFunc();
    }

    handleSubjectChange = (e) => {
        this.setState({ subject: e.target.value });
    }
    handleMessageChange = (e) => {
        this.setState({ message: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // bad code golf
        if (this.state.subject == '') {
            this.setState({subjectError: true});
        }
        if (this.state.message == '') {
            this.setState({messageError: true});
        }
        if (this.state.message == '' || this.state.subject == '') {
            return;
        }


        //window.emailjs.send(this.EMAILJS_SERVICE, this.EMAILJS_TEMPLATE, this.state)
        //                   .catch(err => console.error('EmailJS failed: ', err));

        document.removeEventListener('click', this.handleClick, false);
        this.setState({messageSent: true});
        console.log(this.state);
        setTimeout(() => this.props.closeFunc(), this.animDuration);
    }

    render() {
      return (
        <div className="cornflower-popup-back">
          {this.state.messageSent
            ? <ThankYou duration={this.animDuration}/>
            : <div className="cornflower-popup-inner" ref={notifDisplay => this.notifDisplay = notifDisplay}>
            
                <button className="close" onClick={this.handleClick} >&times;</button>
                <div className="title">
                  HELP DESK
                </div>
                <div className="subtitle">
                  Hey {this.props.firstName}! How can we help you?
                </div>
                <form className="feedback-form" onSubmit={this.handleSubmit}>
                  <label className="label">
                    Subject
                  </label>
                  <div className="subject_wrapper" >
                    <input type='text' className="subject_field" placeholder="Add subject" onChange={this.handleSubjectChange} 
                      style= {this.state.subjectError ? {"animation": "error-animation 500ms linear"} : null} />
                  </div>

                  <label className="label">
                    Message
                  </label>
                  <div className="message_wrapper" >
                    <textarea className="message_field" placeholder="Add message" onChange={this.handleMessageChange} 
                      style= {this.state.messageError ? {"animation": "error-animation 500ms linear"} : null} />
                  </div>

                  <div className="button_wrapper" >
                    <input className="button" type="submit" value="SUBMIT"/>
                  </div>
                </form>
              </div>
            }
        </div>
      );
    }
}