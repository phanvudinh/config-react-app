import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routeConfig from './router/routes'

class App extends React.Component {
   render() {
    const route = routeConfig.routes.map(({ path, component, exact }, i) => <Route  key={i}
                                                                        exact={exact}
                                                                        path={path}
                                                                        component={component} />);
    
    return <Switch>{route}</Switch>
   } 
}

export default App;

