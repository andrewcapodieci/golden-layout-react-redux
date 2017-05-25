import {incrementCount} from '../ActionCreators';
import {connect} from 'react-redux';

// Pure react component. Should not be connected to redux store; its container
// should be connected to the store.
class IncrementButton extends React.Component {
    render() {
        return (
            <button onClick={() => this.props.incrementCount()}>Increment Count</button>
        );
    }
}

function mapDispatchToProps(dispatch) {
    decrementCount: dispatch(decrementCount())
}

export const IncrementButtonContainer = connect(
    incrementCount
)(IncrementButton);
