import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, ReactElement } from 'react';

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
    children?: ReactNode;
}
declare const HybridLink: ({ to, target, children }: IProps) => react_jsx_runtime.JSX.Element;

interface RoutePushState {
    clear: boolean;
}
interface IHybridRouter {
    push: (to: string, state?: RoutePushState) => void;
    replaceState: (to: string) => void;
    back: (to?: number) => void;
}
declare const useHybridRouter: () => IHybridRouter;

interface IStack {
    readonly route: string | null;
    readonly component: ReactElement;
    readonly animation: AnimationType;
    pathVariable: unknown;
    setPathVariable(pathVariable: unknown): void;
}

declare const useHybridStack: () => [IStack, IStack | string];

declare const Index: ({ children }: {
    children: any;
}) => react_jsx_runtime.JSX.Element;

export { AnimationType, HybridLink, HybridRoute, type IHybridRouter, type IStack, Index as default, useHybridRouter, useHybridStack };
