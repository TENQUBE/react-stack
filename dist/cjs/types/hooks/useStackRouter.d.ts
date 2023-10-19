export interface RoutePushState {
    clear: boolean;
}
export interface IStackRouter {
    push: (to: string, state?: RoutePushState) => void;
    replaceState: (to: string) => void;
    back: (to?: number) => void;
}
declare const useStackRouter: () => IStackRouter;
export default useStackRouter;
