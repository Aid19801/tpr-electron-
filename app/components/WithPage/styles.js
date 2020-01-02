import { createUseStyles } from 'react-jss';
import { fadeInAnim, fadeInKeyframes } from '../../globalStyles';

const useStyles = createUseStyles({
  withPageContainer: {
    width: '98vw',
    height: 'auto',
    border: '1px solid white',
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    alignContent: 'center',
    paddingTop: 25,
    paddingBottom: 25,
  },
  offlineBanner: {
    position: 'fixed',
    bottom: 0,
    width: '102%',
    padding: 20,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Arial',
    background: 'black',
    color: 'white',
    marginLeft: 25,
    ...fadeInAnim,
  },
  ...fadeInKeyframes,
})

export default useStyles;
