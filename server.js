import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import helmet from 'react-helmet';
import App from './src/app/App';
const app = express();
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './src/app/reducers/combine';
import { StaticRouter as Router, matchPath } from 'react-router';
import thunk from './src/app/middleware/thunk';
import routeConfig from './src/app/router/routes';
import { getLoadableState } from 'loadable-components/server';
import * as actions from './src/app/actions/user-actions'

function fetchData({ store }) {
	return store.dispatch(actions.getName(1));
}
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.get('*.js|html|css', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.use(express.static(__dirname));

app.get('*', async (req, res) => {
	try {
		const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
		let foundPath = null;
		let { path, component } = routeConfig.routes.find(
			({ path, exact }) => {
				foundPath = matchPath(req.path,
					{
						path,
						exact,
						strict: false
					}
				)
				return foundPath;
			}) || {};

		if (!component)
			component = {};

		if (!component.fetchData)
			component.fetchData = () => new Promise(resolve => resolve());

		await fetchData({ store, params: (foundPath ? foundPath.params : {}) });
		let preloadedState = store.getState();
		let context = {};
		const html = ReactDOM.renderToString(
			<Provider store={store}>
				<Router context={context} location={req.url}>
					<App />
				</Router>
			</Provider>
        )
		const helmetData = helmet.renderStatic();
		if (context.url)
			res.redirect(context.status, 'http://' + req.headers.host + context.url);
		else if (foundPath && foundPath.path == '/404')
			res.status(404).send(renderFullPage(html, preloadedState, helmetData))
		else
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
		<base href="/">
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