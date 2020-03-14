electron version of tpr


upload json deets to firestore on firebase, from raw json.
https://levelup.gitconnected.com/firebase-import-json-to-firestore-ed6a4adc2b57

# Build

Windows - `yarn package-win`
MacStore - `./build-mas.sh`
Mac - `./build-mac.sh`

Build all - `./build.sh`


For Windows:
WIN_CSC_LINK: link to the win certificate link
WIN_CSC_KEY_PASSWORD: the password used to encrypt the win certificate

For Mac:
Certificates in keychain

# Release

Change version number in app/package.json to 1.0.xxx (+1)

1. Run the build, Including sign it

2. Place in root of the-panda-riot webapp repo.

3. Change version number in gist file [https://gist.github.com/username/${process.env.REACT_APP_TPR_VERSIONS}]

4. add a txt msg that old/legacy users will see

```
{
   "tpr_version":"x.x.x",
   "text": "this is a string that old app users will see"
}
```



