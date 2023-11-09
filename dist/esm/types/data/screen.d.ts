import { ReactElement } from 'react';
import { AnimationType } from '../interfaces';
export interface IScreen {
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
interface IScreenParams {
    readonly route?: string | null;
    readonly component?: ReactElement | null;
    readonly animation?: AnimationType;
}
declare class Screen implements IScreen {
    readonly route: string;
    readonly component: ReactElement | null;
    readonly animation: AnimationType;
    pathVariable: unknown;
    URIPath: string;
    hash: string;
    constructor({ route, component, animation }: IScreenParams);
    static hashScreen(allPath: string): Screen;
    setPathVariable(pathVariable: unknown): void;
    setURIPath(path: string): void;
    setHash(hash: string): void;
}
export default Screen;
