import React, { useEffect, useState } from 'react';
import packageJson from '../../package.json';

import './styles.css';

const withMessagesHOC = MyComponent => {
  return class extends React.Component {
    state = {
      endpoint: '',
      localVersion: '',
      gistVersion: '',
      shouldUpdate: false,
    }

    componentDidMount() {
      this.isMac();
      this.getVersions();
    }

    isMac = () => {
      var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

      if (isMac) {
        this.setState({ endpoint: 'mac' });
      } else {
        this.setState({ endpoint: 'pc' })
      }
    }

    getVersions = async () => {
      const dirtyRegex = /\d+/g;
      const localVersion = parseInt(packageJson.version.match(dirtyRegex).join(''));

      try {
        const res = await fetch(`https://api.github.com/gists/${process.env.REACT_APP_TPR_VERSIONS}`);
        const json = await res.json();
        const rawUrl = json.files["tpr-electron-version"].raw_url

        const req = await fetch(rawUrl);
        const reqJson = await req.json();
        console.log('AT | vreqJson:', reqJson);
        const gistVersion = parseInt(reqJson.tpr_version.match(dirtyRegex).join(''));
        this.setState({ localVersion, gistVersion, textForUser: reqJson.text });
      } catch (err) {
        console.log('Messages | try-catch error | I was trying to decide version numbers :', err);
      }
      this.shouldApplicationUpdate();
    }

    shouldApplicationUpdate = () => {
      const { localVersion, gistVersion } = this.state;
      const bool = localVersion < gistVersion ? true : false;
      this.setState({ shouldUpdate: bool });
    }


    render() {

      const { shouldUpdate, textForUser } = this.state;

      return (
        <React.Fragment>
          {shouldUpdate && (
            <div className="messages__container flex-col white">
              <a href="https://www.thePandaRiot.com/downloads" className="white">
                New version available - Download?
              <div className="flex-row black">
                <p className="bold">What's New: &nbsp;</p>
                <p>{textForUser}</p>
              </div>

              </a>
            </div>
          )}
          <MyComponent {...this.props} />
        </React.Fragment>
      )
    }
  }
}

export default withMessagesHOC;
