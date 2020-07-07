import React from 'react';

import './DropDownActionButton.scss';

export default class DropDownActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

  handleClick =() => {
      if (this.state.active) {
          document.removeEventListener('mousedown', this.handleOutsideClick, false);
      } else {
          document.addEventListener('mousedown', this.handleOutsideClick, false);
      }

      this.setState({
          active: !this.state.active
      });
  }

  handleOutsideClick = (event) => {
      if (this.notifDisplay.contains(event.target)) {
          return;
      }

      this.handleClick();
  }

  render() {
      return (
          <div className="dropdown-action-button">
              <div className="trigger-container" onClick={this.handleClick}>
                  {this.props.trigger}
              </div>
              {this.state.active &&
                <div className="notif-display"
                    style={{ right: this.props.right }}
                    ref={notifDisplay => this.notifDisplay = notifDisplay}>
                    {this.props.children}
                </div>
              }
          </div>
      );
  }
}
