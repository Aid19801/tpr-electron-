import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navContainer: {
    height: 40,
    display: 'flex',
    alignItems: 'center'
  },
  navFlexRow: {
    display: 'flex',
    flexDirection: 'row'
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
  }
});

export default useStyles;
