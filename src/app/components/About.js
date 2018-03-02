import React from 'react'
import {Link} from 'react-router-dom'

class About extends React.Component {
    state = {total: 0}

    total(){
        import(/* webpackChunkName: "function" */ "./function").then((method) => {
            let add = method.default
            this.setState({total: add(1,5)})
          });
    }

    render(){
        return <div>
                    <div>{this.state.total}</div>
                    <button onClick={this.total.bind(this)}>total</button>
                    <Link to='/detail'>Detail</Link>
                </div>
    }
}

export default About;