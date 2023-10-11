import { useLocationHistory, ILocationHistory, ILocationVO } from '@tenqube/location-history';
import './styles/main.scss';
import { AnimationType } from './interfaces';
import HybridRoute from './componets/route';
import HybridLink from './componets/link';
declare const Index: ({ children }: {
    children: any;
}) => import("react/jsx-runtime").JSX.Element;
export { HybridRoute, HybridLink, AnimationType, useLocationHistory, ILocationHistory, ILocationVO };
export default Index;
