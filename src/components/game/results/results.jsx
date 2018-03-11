import React from 'react';
import { withStyles } from 'material-ui/styles';
import ResultsBadge from './resultBadge';
import './results.css';

const styles = {
  badge: {
    color: 'white',
    backgroundColor: '#009688',
  },
};

function Results({ correctAnswers, wrongAnswers, classes }) {
  return (
    <section className="results">
      <ResultsBadge
        result={correctAnswers}
        color="default"
        badgeClasses={classes}
        title="Correct answers"
      />
      <ResultsBadge result={wrongAnswers} color="error" title="Wrong answers" />
    </section>
  );
}

export default withStyles(styles)(Results);
