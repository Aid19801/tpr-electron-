import React from 'react';
import useStyles from './styles';

const withPage = MyComponent => {

  const HOC = (props) => {
    const classes = useStyles();
    return (
      <div className={classes.withPageContainer}>
        <MyComponent {...props} />
      </div>
    )
  }

  return HOC;
}


export default withPage;
