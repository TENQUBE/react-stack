import { IStack } from "../data/stack";
export declare const parseToRoute: (route: string) => string;
export declare const matchRouteToPathname: (stacks: IStack[], pathname: string) => IStack;
export declare const matchSingleRoute: (stack: IStack, pathname: string) => boolean;
