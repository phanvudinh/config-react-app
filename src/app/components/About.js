import React from 'react'
import {Link} from 'react-router-dom'

class About extends React.Component {
    render(){
        return <div>
                    <div>About</div>
                    <Link to='/detail'>Detail</Link>
                </div>
    }
}

export default About;