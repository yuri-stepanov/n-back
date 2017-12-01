import React, { Component } from 'react';

import Cell from '../cell';
import './playGrid.css';

export default class PlayGrid extends Component {
    render() {
        const {
            activeCellIndex,
            isCurrentCellGuessedCorrectly,
            numberOfDimensions,
            numberOfCells,
            tickTime,
            onClick,
        } = this.props;
        return (
            <div
                onClick={onClick}
                className="play-grid"
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
                        const isCorrect = isActive && isCurrentCellGuessedCorrectly;
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
