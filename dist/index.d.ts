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

interface IScreen {
    readonly route: string;
    readonly component: ReactElement | null;
    readonly animation: AnimationType;
    readonly className?: string;
    pathVariable: unknown;
    URIPath: string;
    hash: string;
    setPathVariable(pathVariable: unknown): void;
    setURIPath(path: string): void;
    setHash(hash: string): void;
}

interface INavigationPushState {
    clear: boolean;
}
interface INavigation {
    push: (to: string, state?: INavigationPushState) => void;
    replace: (to: string) => void;
    back: (to?: number) => void;
}
declare const useNavigaiton: () => INavigation;

declare function useLoading(): () => void;

declare const useStacks: () => IScreen[];

interface IProps$3 {
    route: string;
    component: ReactElement;
    animation?: AnimationType;
    className?: string;
}
declare const Screen: ({ route, component, animation, className }: IProps$3) => any;

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
    className?: string;
}
declare const BottomSheet: ({ route, component, isExpandabled, height, className }: IProps$1) => any;

interface IProps {
    route: string;
    component: ReactElement;
    animation?: AnimationType;
    className?: string;
}
declare const Toast: ({ route, component, className }: IProps) => any;

interface IStackProvider {
    duration?: number;
    delay?: number;
    progressIndicator: boolean;
    loadingComponent?: ReactElement;
    children: any;
}
declare const ReactStackProvider: ({ duration, delay, children, progressIndicator, loadingComponent }: IStackProvider) => react_jsx_runtime.JSX.Element;

export { AnimationType, BottomSheet, type INavigation, type INavigationPushState, type IScreen, type IStackProvider, Link, Screen, Toast, ReactStackProvider as default, useLoading, useNavigaiton as useNavigation, useStacks };
