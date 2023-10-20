import { IScreen } from '../data/screen';
export declare const parseToRoute: (route: string) => string;
export declare const matchRouteToPathname: (stacks: IScreen[], pathname: string) => IScreen;
export declare const matchSingleRoute: (stack: IScreen, pathname: string) => boolean;
