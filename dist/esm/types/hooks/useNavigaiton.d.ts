export interface INavigationPushState {
    clear: boolean;
}
export declare const DELAY_MARGIN = 10;
export interface INavigation {
    push: (to: string, state?: INavigationPushState) => void;
    replace: (to: string) => void;
    back: (to?: number) => void;
}
declare const useNavigaiton: () => INavigation;
export default useNavigaiton;
