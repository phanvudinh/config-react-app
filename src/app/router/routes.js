import Loadable from 'react-loadable';
import Loading from '../components/Loading'

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ '../components/Home'),
  loading: Loading,
});

const About = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ '../components/About'),
  loading: Loading,
});

const Detail = Loadable({
    loader: () => import(/* webpackChunkName: "detail" */ '../components/Detail'),
    loading: Loading,
});

export default {
    routes: [
        {
            path: '/',
            component: Home,
            exact: true
        },
        {
            path: '/about',
            component: About,
            exact: true
        },
        {
            path: '/detail',
            component: Detail,
            exact: false
        }
    ]
} 