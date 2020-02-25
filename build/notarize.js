require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { notarize } = require('electron-notarize');

exports.default = async params => {
  // Only notarize the app on Mac OS only.
  if (
    process.platform !== 'darwin' ||
    params.electronPlatformName !== 'darwin'
  ) {
    return;
  }
  console.log('afterSign hook triggered', params);

  // Same appId in electron-builder.
  const appId = 'org.develar.ElectronReact';

  const appPath = path.join(
    params.appOutDir,
    `${params.packager.appInfo.productFilename}.app`
  );
  if (!fs.existsSync(appPath)) {
    throw new Error(`Cannot find application at: ${appPath}`);
  }

  console.log(`Notarizing ${appId} found at ${appPath}`);

  try {
    return await notarize({
      appBundleId: appId,
      appPath,
      // appleId: 'oelbaga@newworldgroup.com',
      // appleIdPassword: 'MtK5bBBSp545Up3g',
      appleId: process.env.APPLEID,
      appleIdPassword: process.env.APPLEIDPASSWORD,
      ascProvider: process.env.ASCPROVIDER
    });
  } catch (error) {
    console.error(error);
  }

  console.log(`Done notarizing ${appId}`);
};
