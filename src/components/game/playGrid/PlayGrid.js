import React, { Component } from 'react';

import Cell from '../cell';
import './playGrid.css';

export default class PlayGrid extends Component {
    render() {
        const {
            activeCellIndex,
            isCurrentCellGuessedCorrectly,
            numberOfDimensions,
            dimensionSize,
            onClick,
        } = this.props;
        return (
            <div
                onClick={onClick}
                className="play-grid"
                style={{
                    '--dimension-size': dimensionSize,
                }}
            >
                {Array(dimensionSize)
                    .fill()
                    .map((value, index) => index)
                    .map(cellIndex => {
                        const isActive = activeCellIndex === cellIndex;
                        const isCorrect = isActive && isCurrentCellGuessedCorrectly;
                        return <Cell key={cellIndex} isActive={isActive} isCorrect={isCorrect} />;
                    })}
            </div>
        );
    }
}
