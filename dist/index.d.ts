import * as react_jsx_runtime from 'react/jsx-runtime';
export { ILocationHistory, ILocationVO, useLocationHistory } from '@tenqube/location-history';
import { ReactNode } from 'react';

declare enum AnimationType {
    None = 0,
    ToLeft = 1,
    ToTop = 2,
    Scale = 3
}

interface IProps$1 {
    route: string;
    component: ReactNode;
    animation?: AnimationType;
}
declare const HybridRoute: ({ route, component, animation }: IProps$1) => any;

interface IProps {
    to: string;
    target?: string;
    state?: unknown;
    children?: ReactNode;
}
declare const HybridLink: ({ to, target, state, children }: IProps) => react_jsx_runtime.JSX.Element;

interface IHybridRouter {
    push?: (to: string, state?: unknown) => void;
}
declare const useHybridRouter: () => IHybridRouter;

declare const Index: ({ children }: {
    children: any;
}) => react_jsx_runtime.JSX.Element;

export { AnimationType, HybridLink, HybridRoute, type IHybridRouter, Index as default, useHybridRouter };
