import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactElement, ReactNode } from 'react';

declare enum AnimationType {
    None = 0,
    ToLeft = 1,
    ToTop = 2,
    Scale = 3,
    Fade = 4
}

interface IProps$1 {
    route: string;
    component: ReactElement;
    animation?: AnimationType;
}
declare const Screen: ({ route, component, animation }: IProps$1) => any;

interface IProps {
    to: string;
    target?: string;
    children?: ReactNode;
}
declare const Link: ({ to, target, children }: IProps) => react_jsx_runtime.JSX.Element;

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
    readonly route?: string;
    readonly component?: ReactElement | null;
    readonly animation?: AnimationType;
    pathVariable: unknown;
    setPathVariable(pathVariable: unknown): void;
}

declare const useStacks: () => IScreen[];

interface IStackProvider {
    duration?: number;
    children: ReactElement;
}
declare const ReactStackProvider: ({ duration, children }: IStackProvider) => react_jsx_runtime.JSX.Element;

export { AnimationType, type INavigation, type INavigationPushState, type IScreen, type IStackProvider, Link, Screen, ReactStackProvider as default, useNavigaiton as useNavigation, useStacks };
