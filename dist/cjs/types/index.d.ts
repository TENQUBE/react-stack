import './styles/main.scss';
import { AnimationType } from './interfaces';
import HybridRoute from './componets/route';
import HybridLink from './componets/link';
import useHybridRouter, { IHybridRouter } from './hooks/useHybridRouter';
declare const Index: ({ children }: {
    children: any;
}) => import("react/jsx-runtime").JSX.Element;
export { HybridRoute, HybridLink, AnimationType, useHybridRouter, IHybridRouter };
export default Index;
