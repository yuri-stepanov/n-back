import React from 'react';
import classNames from 'classnames';
import './cell.css';

export default function Cell({ isActive, isCorrect }) {
    return (
        <div
            className={classNames('cell', { 'cell--active': isActive, 'cell--correct': isCorrect })}
        />
    );
}
