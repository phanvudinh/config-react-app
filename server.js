import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import helmet from 'react-helmet';
import App from './src/app/App';
const app = express();
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/app/reducers/combine';
import { StaticRouter as Router, matchPath } from 'react-router';
import thunk from './src/app/middleware/thunk';
import routeConfig from './src/app/router/routes';
import { getLoadableState } from 'loadable-components/server';

app.get('*.js|html|css', function (req, res, next) {
    console.log("gzip",req.url);
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.use(express.static(__dirname + '/dist'));

app.get('*', async (req, res) => {
	try {
		//create new redux store on each request
		const store = createStore(reducers, {}, applyMiddleware(thunk));
		let foundPath = null;
		// match request url to our React Router paths and grab component
		let { path, component } = routeConfig.routes.find(
			({ path, exact }) => {
				foundPath = matchPath(req.url,
					{
						path,
						exact,
						strict: false
					}
				)
				return foundPath;
			}) || {};
		// safety check for valid component, if no component we initialize an empty shell.
		if (!component)
			component = {};
		// safety check for fetchData function, if no function we give it an empty promise
		if (!component.fetchData)
			component.fetchData = () => new Promise(resolve => resolve());
		// meat and bones of our isomorphic application: grabbing async data
		await component.fetchData({ store, params: (foundPath ? foundPath.params : {}) });
		//get store state (js object of entire store)
		let preloadedState = store.getState();
		//context is used by react router, empty by default
		let context = {};
		const html = ReactDOM.renderToString(
			<Provider store={store}>
				<Router context={context} location={req.url}>
					<App />
				</Router>
			</Provider>
        )
		//render helmet data aka meta data in <head></head>
		const helmetData = helmet.renderStatic();
		//check context for url, if url exists then react router has ran into a redirect
		if (context.url)
			//process redirect through express by redirecting
			res.redirect(context.status, 'http://' + req.headers.host + context.url);
		else if (foundPath && foundPath.path == '/404')
			//if 404 then send our custom 404 page with initial state and meta data, this is needed for status code 404
			res.status(404).send(renderFullPage(html, preloadedState, helmetData))
		else
			//else send down page with initial state and meta data
			res.send(renderFullPage(html, preloadedState, helmetData))
	} catch (error) {
		res.status(400).send(renderFullPage('An error occured.', {}, {}));
	}
});

app.listen(8181, function () {
	console.log('app running on localhost 8181');
});

function renderFullPage(html, preloadedState, helmet) {
	return `
    <!doctype html>
    <html>
      <head>
        <link rel="icon" href="/dist/favicon.ico" type="image/ico" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body>
		<div id="root">
		${html}
		</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="common.js"></script>        
        <script src="app.js"></script>        
      </body>
    </html>
    `
}