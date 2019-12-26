import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  pageContainer: {
    background: 'linearGradient(grey, black)',
    border: '2px solid orange',
    height: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  }
});

export default useStyles;
