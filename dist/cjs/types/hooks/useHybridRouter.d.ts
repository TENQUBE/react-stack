export interface IHybridRouter {
    push: (to: string) => void;
    replaceState: (to: string) => void;
    back: (to?: number) => void;
}
declare const useHybridRouter: () => IHybridRouter;
export default useHybridRouter;
