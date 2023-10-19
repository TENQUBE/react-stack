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
declare const Route: ({ route, component, animation }: IProps$1) => any;

interface IProps {
    to: string;
    target?: string;
    children?: ReactNode;
}
declare const Link: ({ to, target, children }: IProps) => react_jsx_runtime.JSX.Element;

interface RoutePushState {
    clear: boolean;
}
interface IStackRouter {
    push: (to: string, state?: RoutePushState) => void;
    replaceState: (to: string) => void;
    back: (to?: number) => void;
}
declare const useStackRouter: () => IStackRouter;

interface IStack {
    readonly route: string | null;
    readonly component: ReactElement;
    readonly animation: AnimationType;
    pathVariable: unknown;
    setPathVariable(pathVariable: unknown): void;
}

declare const useStacks: () => [IStack, IStack | string];

declare const Index: ({ children }: {
    children: any;
}) => react_jsx_runtime.JSX.Element;

export { AnimationType, type IStack, type IStackRouter, Link, Route, Index as default, useStackRouter, useStacks };
