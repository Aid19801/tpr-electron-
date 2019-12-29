import { createUseStyles } from 'react-jss';

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
})

export default useStyles;
