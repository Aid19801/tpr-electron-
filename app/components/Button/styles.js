import { createUseStyles } from 'react-jss';
import { fadeInKeyframes, fadeInAnim } from '../../globalStyles';

const useStyles = createUseStyles({
  buttonContainer: {
    height: 45,
    width: 100,
    margin: 10,
    background: 'orange',
    border: '0',
    borderRadius: 12,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    transform: 'skewY(1deg)',
    ...fadeInAnim,
  },
  disabledContainer: {
    height: 45,
    width: 100,
    margin: 10,
    background: 'grey',
    border: '0',
    borderRadius: 12,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    transform: 'skewY(1deg)',
  },
  button: {
    background: 'green',
    color: 'white',
    border: '0',
    fontFamily: 'Arial',
    fontSize: 20,
    margin: 2,
    width: '100%',
    ...fadeInAnim,
  },
  disabledButton: {
    color: 'grey',
    background: '#500505',
    border: '0',
    fontFamily: 'Arial',
    fontSize: 20,
    margin: 2,
    width: '100%',
  },
  ...fadeInKeyframes,
})

export default useStyles;
