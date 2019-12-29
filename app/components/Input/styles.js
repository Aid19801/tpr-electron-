import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  inputContainer: {
    margin: 10,
    background: 'orange',
    border: '0',
    borderRadius: 12,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transform: 'skewY(-1deg)',
    width: '65%',
  },
  inputTitle: {
    color: 'white',
    margin: 2,
    textAlign: 'end',
    fontFamily: 'monospace',
    fontSize: 20,
    position: 'absolute',
    top: 1,
    right: 1,
  },
  input: {
    color: 'white',
    background: 'grey',
    border: '0',
    borderRadius: 12,
    fontFamily: 'Arial',
    fontSize: 50,
    margin: 2,
    width: '100%',
  }
})

export default useStyles;
