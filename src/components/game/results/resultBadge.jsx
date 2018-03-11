import React from 'react';
import Badge from 'material-ui/Badge';
import { withStyles } from 'material-ui/styles';
import ResultLabel from './resultLabel';

function ResultsBadge({ result, color, title, badgeClasses, classes }) {
  return (
    <div className="results__label">
      <Badge badgeContent={result} color={color} classes={badgeClasses}>
        <ResultLabel title={title} />
      </Badge>
    </div>
  );
}

export default ResultsBadge;
