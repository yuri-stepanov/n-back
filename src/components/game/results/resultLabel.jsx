import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    color: 'white',
    padding: '10px',
  },
};

function ResultLabel({ title, classes }) {
  return <Typography classes={classes}>{title}</Typography>;
}

export default withStyles(styles)(ResultLabel);
