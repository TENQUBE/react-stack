import * as react_jsx_runtime from 'react/jsx-runtime';

declare enum AnimationType {
    None = 0,
    ToLeft = 1,
    Scale = 2
}

declare const HybridRoute: ({ route, component, animation }: {
    route: any;
    component: any;
    animation: any;
}) => any;
declare const HybridStackProvider: ({ children }: {
    children: any;
}) => react_jsx_runtime.JSX.Element;

export { AnimationType, HybridRoute, HybridStackProvider as default };
