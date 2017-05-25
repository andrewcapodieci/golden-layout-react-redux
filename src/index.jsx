import GoldenLayoutWrapper from './components/GoldenLayoutWrapper';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {setState} from './ActionCreators';

const store = createStore(reducer);
store.dispatch(setState({ 'count': 0 })); 

ReactDOM.render(
    <Provider store={store}>
        <GoldenLayoutWrapper/>
    </Provider>,
    document.getElementById('root')
);
