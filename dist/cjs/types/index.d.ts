/// <reference types="react" />
import './styles/main.scss';
import { AnimationType } from './interfaces';
import HybridRoute from './componets/route';
import HybridLink from './componets/link';
export declare const HybridStackContext: import("react").Context<any>;
declare const Index: ({ children }: {
    children: any;
}) => import("react/jsx-runtime").JSX.Element;
export { HybridRoute, HybridLink, AnimationType };
export default Index;
