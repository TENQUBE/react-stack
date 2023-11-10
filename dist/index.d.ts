import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactElement, ReactNode } from 'react';

declare enum AnimationType {
    None = 0,
    ToLeft = 1,
    ToTop = 2,
    Scale = 3,
    Fade = 4,
    BotttomSheet = 5,
    Toast = 6
}

interface IProps$3 {
    route: string;
    component: ReactElement;
    animation?: AnimationType;
}
declare const Screen: ({ route, component, animation }: IProps$3) => any;

interface IProps$2 {
    to: string;
    target?: string;
    children?: ReactNode;
}
declare const Link: ({ to, target, children }: IProps$2) => react_jsx_runtime.JSX.Element;

interface IProps$1 {
    route: string;
    component: ReactElement;
    isExpandabled?: boolean;
    height?: number;
}
declare const BottomSheet: ({ route, component, isExpandabled, height }: IProps$1) => any;

interface IProps {
    route: string;
    component: ReactElement;
    animation?: AnimationType;
}
declare const Toast: ({ route, component }: IProps) => any;

interface INavigationPushState {
    clear: boolean;
}
interface INavigation {
    push: (to: string, state?: INavigationPushState) => void;
    replace: (to: string) => void;
    back: (to?: number) => void;
}
declare const useNavigaiton: () => INavigation;

interface IScreen {
    readonly route: string;
    readonly component: ReactElement | null;
    readonly animation: AnimationType;
    pathVariable: unknown;
    URIPath: string;
    hash: string;
    setPathVariable(pathVariable: unknown): void;
    setURIPath(path: string): void;
    setHash(hash: string): void;
}

declare const useStacks: () => IScreen[];

interface IStackProvider {
    duration?: number;
    delay?: number;
    children: any;
}
declare const ReactStackProvider: ({ duration, delay, children }: IStackProvider) => react_jsx_runtime.JSX.Element;

export { AnimationType, BottomSheet, type INavigation, type INavigationPushState, type IScreen, type IStackProvider, Link, Screen, Toast, ReactStackProvider as default, useNavigaiton as useNavigation, useStacks };
