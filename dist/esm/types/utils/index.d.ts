import { IScreen } from '../data/screen';
export declare const isHashRoute: (route: string | number) => boolean;
export declare const matchRouteToPathname: (stacks: IScreen[], pathname: string) => IScreen;
export declare const matchLastSingleRoute: (stacks: IScreen[], pathname: string) => boolean;
