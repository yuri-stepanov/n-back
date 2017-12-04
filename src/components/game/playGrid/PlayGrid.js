import React, { Component } from 'react';
import classNames from 'classnames';
import Cell from './cell';
import { USER_ANSWER_RESULT } from '../gameConstants';
import './playGrid.css';

export default class PlayGrid extends Component {
    render() {
        const {
            activeCellIndex,
            userAnswer,
            numberOfDimensions,
            numberOfCells,
            tickTime,
            onClick,
        } = this.props;
        const answeredCorrectly = userAnswer === USER_ANSWER_RESULT.CORRECT;
        return (
            <div
                onClick={onClick}
                className={classNames('play-grid', {
                    'play-grid--answered-wrong': userAnswer === USER_ANSWER_RESULT.INCORRECT,
                    'play-grid--answered-correctly': answeredCorrectly,
                })}
                style={{
                    '--tick-time': `${tickTime}ms`,
                    '--dimension-size': Math.sqrt(numberOfCells),
                }}
            >
                {Array(numberOfCells)
                    .fill()
                    .map((value, index) => index)
                    .map(cellIndex => {
                        const isActive = activeCellIndex === cellIndex;
                        const isCorrect = isActive && answeredCorrectly;
                        return (
                            <Cell
                                key={cellIndex}
                                isActive={isActive}
                                isCorrect={isCorrect}
                                tickTime={tickTime}
                            />
                        );
                    })}
            </div>
        );
    }
}
