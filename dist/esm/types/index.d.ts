import { AnimationType } from './interfaces';
declare const HybridRoute: ({ route, component, animation }: {
    route: any;
    component: any;
    animation: any;
}) => any;
declare const HybridStackProvider: ({ children }: {
    children: any;
}) => import("react/jsx-runtime").JSX.Element;
export { HybridRoute, AnimationType };
export default HybridStackProvider;
