export interface RoutePushState {
    clear: boolean;
}
export interface IHybridRouter {
    push: (to: string, state?: RoutePushState) => void;
    replaceState: (to: string) => void;
    back: (to?: number) => void;
}
declare const useHybridRouter: () => IHybridRouter;
export default useHybridRouter;
