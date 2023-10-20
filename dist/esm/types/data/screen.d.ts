import { ReactElement } from 'react';
import { AnimationType } from '../interfaces';
export interface IScreen {
    readonly route?: string;
    readonly component?: ReactElement | null;
    readonly animation?: AnimationType;
    pathVariable: unknown;
    setPathVariable(pathVariable: unknown): void;
}
interface IScreenParams {
    readonly route?: string | null;
    readonly component?: ReactElement | null;
    readonly animation?: AnimationType;
}
declare class Screen implements IScreen {
    readonly route: string;
    readonly component?: ReactElement | null;
    readonly animation?: AnimationType;
    pathVariable: unknown;
    constructor({ route, component, animation }: IScreenParams);
    setPathVariable(pathVariable: unknown): void;
}
export default Screen;
