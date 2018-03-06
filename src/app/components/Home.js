import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import * as actions from '../actions/user-actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Home extends React.Component {
    static fetchData({ store }) {
        return new Promise(resolve => resolve());
    }

    componentWillReceiveProps(nextProps){
        console.log("Home component will receive props");
        console.log(this.props, nextProps)
    }

    componentDidMount() {
        console.log(" Home compoent did mount")
        this.props.getName(2);
    }
    render(){
        return <div>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Home</title>
                    </Helmet>
                    <Link to='/about'>About..</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);