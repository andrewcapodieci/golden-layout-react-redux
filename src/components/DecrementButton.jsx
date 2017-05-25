// Pure react component. Should not be connected to redux store; its container
// should be connected to the store.
import {decrementCount} from '../ActionCreators';
import {connect} from 'react-redux';

class DecrementButton extends React.Component {
    render() {
        return (
            <button onClick={() => this.props.decrementCount()}>Decrement Count</button>
        );
    }
}

export const DecrementButtonContainer = connect(
    decrementCount
)(DecrementButton);
