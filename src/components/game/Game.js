import React, { Component } from 'react';
import GlobalKeyDownHandler from 'components/common/GlobalKeyDownHandler';
import PlayGrid from './playGrid';
import {
    DEFAULT_ROUND_TIME,
    DEFAULT_NUMBER_OF_ROUNDS,
    DIMENSION_SIZE,
    DEFAULT_DIFFICULTY,
} from './gameConstants';
// TODO: Use swipe to present user with UI controls

const ENTER_CODE = 'Enter';
const SPACE_CODE = 'Space';
const ESCAPE_CODE = 'Escape';

const USER_INPUT_CODES = [ENTER_CODE, SPACE_CODE];
const STOP_CODES = [ESCAPE_CODE];

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRound: 0,
            currentActiveCell: 0,
            numberOfCorrectAnswers: 0,
            previousActiveCells: [],
        };

        this.updateGameState = this.updateGameState.bind(this);
        this.processUserInput = this.processUserInput.bind(this);
        this.handlerKeyDown = this.handlerKeyDown.bind(this);
        this.stopGame = this.stopGame.bind(this);
    }

    componentDidMount() {
        this.startGameTimer();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    startGameTimer() {
        this.updateGameState();
        this.timer = setInterval(this.updateGameState, DEFAULT_ROUND_TIME);
    }

    clearTimer() {
        clearInterval(this.timer);
    }

    clearState() {}

    getNextRandomCell() {
        const { currentActiveCell } = this.state;
        let nextActiveCell = -1;
        do {
            nextActiveCell = Math.floor(Math.random() * DIMENSION_SIZE);
        } while (currentActiveCell === nextActiveCell);
        return nextActiveCell;
    }

    updateGameState() {
        const { currentRound, previousActiveCells, currentActiveCell } = this.state;
        const nextActiveCell = this.getNextRandomCell();

        console.log('current round: ' + (currentRound + 1));
        console.log('current index: ' + nextActiveCell);

        this.setState({
            isCurrentCellGuessedCorrectly: false,
            currentRound: currentRound + 1,
            currentActiveCell: nextActiveCell,
            previousActiveCells: [...previousActiveCells, ...[currentActiveCell]],
        });
    }

    processUserInput() {
        const { previousActiveCells, currentActiveCell } = this.state;
        const previousNAnswer =
            previousActiveCells[previousActiveCells.length - DEFAULT_DIFFICULTY];
        if (previousNAnswer === currentActiveCell) {
            this.setState({
                isCurrentCellGuessedCorrectly: true,
                numberOfCorrectAnswers: this.state.numberOfCorrectAnswers + 1,
            });
        }
    }

    handlerKeyDown({ key }) {
        if (USER_INPUT_CODES.includes(key)) {
            this.processUserInput();
        }
        if (STOP_CODES.includes(key)) {
            this.stopGame();
        }
    }

    stopGame() {
        this.clearTimer();
        console.log('THE END: ' + this.state.numberOfCorrectAnswers);
    }

    render() {
        return (
            <main>
                <GlobalKeyDownHandler onKeyDown={this.handlerKeyDown} />
                <PlayGrid
                    activeCellIndex={this.state.currentActiveCell}
                    isCurrentCellGuessedCorrectly={this.state.isCurrentCellGuessedCorrectly}
                    onClick={this.processUserInput}
                    dimensionSize={DIMENSION_SIZE}
                />
            </main>
        );
    }
}
