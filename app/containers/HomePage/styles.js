import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5,
    },
    animationName: '$slideRight',
    animationDuration: 1000,
  },
  title: {
    border: '1px solid purple',
  },
  '@keyframes slideRight': {
    from: {opacity: 0},
    to: {opacity: 1}
  },
})

export default useStyles;
