import { createUseStyles } from 'react-jss';
import { fadeInAnim, fadeInKeyframes } from '../../globalStyles';

const useStyles = createUseStyles({
  modalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
    background: 'rgba(0, 0, 0, 0.5)',
    // border: '1px solid white',
    borderRadius: 12,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    ...fadeInAnim,
  },

  modalContentContainer: {
    border: '1px solid white',
    background: 'rgba(0, 0, 0, 0.9)',
    width: '65%',
    height: 'auto',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
  },
  modalHeading: {
    fontFamily: 'Arial',
    fontWeight: 700,
    color: 'orange',

  },
  modalBody: {
    fontFamily: 'Arial',
    fontWeight: 300,
    color: 'white',
  },
  ...fadeInKeyframes,
})

export default useStyles;
