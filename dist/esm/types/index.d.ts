import { AnimationType } from './interfaces';
import HybridRoute from './componets/route';
import HybridLink from './componets/link';
import useHybridRouter, { IHybridRouter } from './hooks/useHybridRouter';
import useHybridStack from './hooks/useHybridStack';
import { IStack } from './data/stack';
import './styles/main.scss';
declare const Index: ({ children }: {
    children: any;
}) => import("react/jsx-runtime").JSX.Element;
export { HybridRoute, HybridLink, AnimationType, useHybridRouter, IHybridRouter, useHybridStack, IStack };
export default Index;
