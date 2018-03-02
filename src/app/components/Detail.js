import React from 'react'
import {Link, Route} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import Loadable from 'react-loadable'
import Loading from './Loading'
import { Helmet } from 'react-helmet';
import * as actions from '../actions/user-actions'
import { connect } from 'react-redux';

const Content = Loadable({
    loader: () => import(/* webpackChunkName: "content" */ './Content'),
    loading: Loading,
});

class Detail extends React.Component {
    constructor(props){
        super(props);
    }

    static fetchData({ store }) {
        return store.dispatch(actions.getName(1));
    }

    componentDidMount() {
        this.props.getName(1);
    }
    
    render(){
        const {match} = this.props;
        return <div>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Detail</title>
                    </Helmet>
                    <div>Detail</div>
                    <Link to={`${match.url}/info`}>Info</Link>
                    <Link to={`${match.url}/contacts`}>Contact</Link>
                    <Link to='/'>Home..</Link>
                    <Route path={`${match.url}/:content`} component={Content}/>
                    <Route
                        exact
                        path={match.url}
                        render={() => <h3>Please select a topic.</h3>}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);