import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  withPageContainer: {
    width: '98vw',
    height: '100vh',
    border: '1px solid white',
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    alignContent: 'center',
  },
})

export default useStyles;
