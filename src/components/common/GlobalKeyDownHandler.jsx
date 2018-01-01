import { Component } from 'react';

export default class GlobalKeyDownHandler extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.props.onKeyDown);
    }

    render() {
        return null;
    }
}
