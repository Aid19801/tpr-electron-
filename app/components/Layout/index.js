import React from 'react';
import useStyles from './styles';

const withLayout = Component => props => {
  const classes = useStyles();
  return (
    <div className={classes.pageContainer}>
      <Component {...props} />
    </div>
  );
};

export default withLayout;
