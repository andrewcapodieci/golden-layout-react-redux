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

        function wrapComponent(Component, store) {
            class Wrapped extends React.Component {
                render() {
                    return (
                        <Provider store={store}>
                            <Component {...this.props}/>
                        </Provider>
                    );
                }
            }
            return Wrapped;
        };

        var layout = new GoldenLayout(config, this.layout);
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

        window.addEventListener('resize', () => {
            layout.updateSize();
        });
    }

    render() {
        return (
            <div className='goldenLayout' ref={input => this.layout = input}/>
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
