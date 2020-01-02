import { createUseStyles } from 'react-jss';
import { bounceInKeyframes, bounceInAnim } from '../../globalStyles';

const useStyles = createUseStyles({
  funkyTitleContainer: {
    margin: 10,
    background: 'black',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    transform: 'skewY(-2deg)',
    maxWidth: 350,
    ...bounceInAnim,
  },
  funkyTitle: {
    color: 'orange',
    fontFamily: 'Arial',
    fontSize: 70,
    margin: 2,
  },
  ...bounceInKeyframes,
})

export default useStyles;
