import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  li: {
    transform: 'skewX(-4deg)',
  },
  navOption: {
    textDecoration: 'none',
    margin: 5,
    background: 'black',
    padding: 5,
    color: 'orange',
    border: 0,
    height: 30,
    fontWeight: 700,
    fontFamily: 'Arial',
    fontSize: 17,
  },
})

export default useStyles;
