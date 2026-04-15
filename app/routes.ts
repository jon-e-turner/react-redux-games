import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [index('routes/home.tsx'), route('tetris', './tetris/tetris.tsx')] satisfies RouteConfig;
