import GoldenLayout from 'golden-layout';
import {Provider} from 'react-redux';
import {IncrementButtonContainer} from './IncrementButton';
import {DecrementButtonContainer} from './DecrementButton';
import {TestComponentContainer} from './TestComponent';
import '../index.styl'

class GoldenLayoutWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.setNode = this.setNode.bind(this);
        this.updateDimensions=this.updateDimensions.bind(this);
        this.state = {
            ht:500,
        }
    }
    setNode(node) {
        this.node = node;
    }
    updateDimensions() {
        if (this.node && this.myLayout) {
            this.setState({
                ht: $(window).height() - this.node.getBoundingClientRect().top-5,
            });

            this.myLayout.updateSize();
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

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

        var layout = new GoldenLayout(config, this.node);
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

        window.addEventListener("resize", this.updateDimensions);
        this.myLayout=layout;
        this.updateDimensions();
    }

    render() {
        return (
            <div ref={this.setNode} style={{height:this.state.ht+'px'}}/>
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
