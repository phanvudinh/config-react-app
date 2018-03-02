import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import add from './function'

class Home extends React.Component {
    render(){
        return <div>
                    <Link to='/about'>About..{add(10,10)}</Link>
               </div>
    }
}

export default Home;