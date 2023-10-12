export interface IHybridRouter {
    push?: (to: string) => void;
    go?: (to: number) => void;
}
declare const useHybridRouter: () => IHybridRouter;
export default useHybridRouter;
