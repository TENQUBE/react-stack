export interface IHybridRouter {
    push?: (to: string, state?: unknown) => void;
}
declare const useHybridRouter: () => IHybridRouter;
export default useHybridRouter;
