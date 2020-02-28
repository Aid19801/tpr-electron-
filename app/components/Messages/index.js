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
      const localVersion = parseInt(packageJson.version.match( dirtyRegex ).join(''));

      try {
        const res = await fetch(`https://api.github.com/gists/6a121ce3f2a7491ec00513136c102588`);
        const json = await res.json();
        const rawUrl = json.files["tpr-electron-version"].raw_url

        const req = await fetch(rawUrl);
        const reqJson = await req.json();
        const gistVersion = parseInt(reqJson.tpr_version.match( dirtyRegex ).join(''));
        this.setState({ localVersion, gistVersion });
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

      const { endpoint, shouldUpdate } = this.state;

      console.log('AT | STATE yo:', this.state);
      return (
        <React.Fragment>
          { shouldUpdate && <a href={`https://www.thePandaRiot.com/downloads/${endpoint}`} className="messages__container">👨🏻‍💻New app version available now - Download? 👨🏻‍💻</a> }
          <MyComponent />
        </React.Fragment>
      )
    }
  }
}

export default withMessagesHOC;
