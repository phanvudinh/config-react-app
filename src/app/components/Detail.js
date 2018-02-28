import React from 'react'
import {Link, Route} from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from './Loading'

const Content = Loadable({
    loader: () => import(/* webpackChunkName: "content" */ './Content'),
    loading: Loading,
});

class Detail extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const {match} = this.props;
        return <div>
                    <div>Home</div>
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

export default Detail;