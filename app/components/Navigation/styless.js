import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navContainer: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    zIndex: 2,
    top: 0,
    width: '100%',
    background: 'grey',
    // boxShadow: '12px 7px 12px 4px grey',

  },
  navFlexRow: {
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    zIndex: 1,
  },
  ulContainer: {
    listStyleType: 'none',
    paddingLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  li: {
    transform: 'skewX(-4deg)'
  },
  navOptionLogo: {
    color: 'white',
    textDecoration: 'none',
    fontFamily: 'monospace',
    margin: 5
  },
  navOption: {
    textDecoration: 'none',
    margin: 5,
    background: 'black',
    padding: 10,
    color: 'orange',
    height: 30,
    fontWeight: 700,
    fontFamily: 'Arial',
    fontSize: 17
  },
  offlineModeBanner: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    background: 'black',
    width: '100%',
    marginBottom: 0,
    position: 'fixed',
    bottom: '0px',
    padding: 10,
    height: 45,
    fontFamily: 'Arial',
  }
});

export default useStyles;
