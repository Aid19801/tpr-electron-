import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  pageContainer: {
    background: 'linearGradient(grey, black)',
    border: '2px solid orange',
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  }
});

export default useStyles;
