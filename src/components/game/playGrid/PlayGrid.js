import React, { Component } from 'react';

import { NUMBER_OF_CELLS } from '../gameConstants';
import Cell from '../cell';
import './playGrid.css';

const cells = Array(NUMBER_OF_CELLS)
    .fill()
    .map((value, index) => index);

export default class PlayGrid extends Component {
    render() {
        const { activeCellIndex } = this.props;
        return (
            <div className="play-grid">
                {cells.map(cellIndex => (
                    <Cell key={cellIndex} isActive={activeCellIndex === cellIndex} />
                ))}
            </div>
        );
    }
}
