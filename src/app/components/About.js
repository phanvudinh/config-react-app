import React from 'react'
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import * as actions from '../actions/user-actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class About extends React.Component {
    constructor(props){
        super(props)
        this.state = {total: 0}
    }

    total(){
        import(/* webpackChunkName: "function" */ "./function").then((method) => {
            let add = method.default
            this.setState({total: add(1,5)})
          });
    }

    componentWillReceiveProps(nextProps){
        console.log("About component will receive props");
        console.log(this.props, nextProps)
    }

    componentDidMount() {
        console.log("About compoent did mount")
        this.props.getName(4);
    }

    render(){
        return <div>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>About</title>
                    </Helmet>
                    <div>{this.state.total}</div>
                    <button onClick={this.total.bind(this)}>total</button>
                    <Link to='/detail'>Detail</Link>
                </div>
    }
}

function mapStateToProps(state) {
    return {
        ...state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(About);