import React, { Component } from 'react';
import './styles.css';

function withFunding(PlatformSpecificComponent) {
  return class extends Component {

    render() {

      return (
        <React.Fragment>
          <div className="funding">

            <div className="flex-col">

              <a href="https://www.paypal.me/thepandariot" target="_blank">

                <div className="flex-row">
                  <p className="orange center black bold">Paypal | Buy Me A Beer</p>
                  <img src={require('../Icons/beer.png')} className="funding__img" alt="beer" />
                </div>

              </a>

              <a href="https://www.patreon.com/thePandaRiot?fan_landing=true" target="_blank">

                <div className="flex-row">
                  <p className="orange center black bold">Patreon | suppport TPR</p>
                  <img src={require('../Icons/more_info.png')} className="funding__img" alt="patreon" />
                </div>

              </a>

            </div>
          </div>

          <PlatformSpecificComponent {...this.props} />

        </React.Fragment>
      )
    }

  }
}

export default withFunding;
