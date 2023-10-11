import * as react_jsx_runtime from 'react/jsx-runtime';
export { ILocationHistory, ILocationVO, useLocationHistory } from '@tenqube/location-history';

declare enum AnimationType {
    None = 0,
    ToLeft = 1,
    ToTop = 2,
    Scale = 3
}

declare const HybridRoute: ({ route, component, animation }: {
    route: any;
    component: any;
    animation: any;
}) => any;

declare const HybridLink: ({ to, target, state, children }: {
    to: any;
    target?: string;
    state?: {};
    children: any;
}) => react_jsx_runtime.JSX.Element;

declare const Index: ({ children }: {
    children: any;
}) => react_jsx_runtime.JSX.Element;

export { AnimationType, HybridLink, HybridRoute, Index as default };
