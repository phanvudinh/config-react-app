import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './components/Loading'

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ './components/Home'),
  loading: Loading,
});

const About = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ './components/About'),
  loading: Loading,
});

const Detail = Loadable({
    loader: () => import(/* webpackChunkName: "detail" */ './components/Detail'),
    loading: Loading,
});

class App extends React.Component {
   render() {
       return  <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/detail" component={Detail}/>
                    </Switch>
                </Router>
   } 
}

export default App;

