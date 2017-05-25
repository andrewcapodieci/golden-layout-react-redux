// Pure react component. Should not be connected to redux store; its container
// should be connected to the store.
import {decrementCount} from '../ActionCreators';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class DecrementButton extends React.Component {
    render() {
        return (
            <button onClick={() => this.props.decrementCount()}>Decrement Count</button>
        );
    }
}

DecrementButton.PropTypes = {
    decrementCount: PropTypes.func.isRequired
}

export const DecrementButtonContainer = connect(
    decrementCount
)(DecrementButton);
