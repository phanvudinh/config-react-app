import React, {Component} from 'react'
import {Link} from 'react-router-dom'
class Home extends React.Component {
    render(){
        return <div>
                    <Link to='/about'>About..</Link>
               </div>
    }
}

export default Home;