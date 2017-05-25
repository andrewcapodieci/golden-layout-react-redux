import GoldenLayout from 'golden-layout';
import {Provider} from 'react-redux';
import {IncrementButtonContainer} from './IncrementButton';
import {DecrementButtonContainer} from './DecrementButton';
import {TestComponentContainer} from './TestComponent';

class GoldenLayoutWrapper extends React.Component {
    componentDidMount() {
        // Build basic golden-layout config
        const config = {
            content: [{
                type: 'row',
                content: [{
                    type: 'react-component',
                    component: 'TestComponentContainer'
                },{
                    type: 'react-component',
                    component: 'IncrementButtonContainer'
                },{
                    type: 'react-component',
                    component: 'DecrementButtonContainer'
                }]
            }]
        };

        function wrapComponent(component, store) {
            class Wrapped extends React.Component {
                render() {
                    return (
                        <Provider store={store}>
                            <component {...this.props}/>
                        </Provider>
                    );
                }
            }
            return Wrapped;
        };

        var layout = new GoldenLayout(config, '#goldenLayout');
        layout.registerComponent('IncrementButtonContainer', 
                                 wrapComponent(IncrementButtonContainer, this.context.store)
        );
        layout.registerComponent('DecrementButtonContainer',
                                 wrapComponent(DecrementButtonContainer, this.context.store)
        );
        layout.registerComponent('TestComponentContainer',
                                 wrapComponent(TestComponentContainer, this.context.store)
        );
        layout.init();
    }

    render() {
        return (
            <div id="goldenLayout"/>
        );
    }
}

// ContextTypes must be defined in order to pass the redux store to exist in
// "this.context". The redux store is given to GoldenLayoutWrapper from its
// surrounding <Provider> in index.jsx.
GoldenLayoutWrapper.contextTypes = {
    store: React.PropTypes.object.isRequired
};


export default GoldenLayoutWrapper;
