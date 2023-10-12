import { ReactNode } from "react";
import { AnimationType } from "../interfaces";
export interface IStack {
    readonly route: string | null;
    readonly component: ReactNode;
    readonly animation: AnimationType;
}
declare class Stack implements IStack {
    readonly route: string | null;
    readonly component: ReactNode;
    readonly animation: AnimationType;
    constructor({ route, component, animation }: {
        route: any;
        component: any;
        animation: any;
    });
}
export default Stack;
