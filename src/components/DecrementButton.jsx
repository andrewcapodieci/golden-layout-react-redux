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

function mapDispatchToProps(dispatch) {
    return {
        decrementCount: () => dispatch(decrementCount())
    };
}

export const DecrementButtonContainer = connect(
    null,
    mapDispatchToProps
)(DecrementButton);
