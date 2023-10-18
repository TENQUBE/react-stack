import { ReactElement } from "react";
import { AnimationType } from "../interfaces";
export interface IStack {
    readonly route: string | null;
    readonly component: ReactElement;
    readonly animation: AnimationType;
    pathVariable: unknown;
    setPathVariable(pathVariable: unknown): void;
}
declare class Stack implements IStack {
    readonly route: string | null;
    readonly component: ReactElement;
    readonly animation: AnimationType;
    pathVariable: unknown;
    constructor({ route, component, animation }: {
        route: any;
        component: any;
        animation: any;
    });
    setPathVariable(pathVariable: unknown): void;
}
export default Stack;
