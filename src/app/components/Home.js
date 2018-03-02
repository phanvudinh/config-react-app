import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';

class Home extends React.Component {
    static fetchData({ store }) {
        return new Promise(resolve => resolve());
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

export default Home;