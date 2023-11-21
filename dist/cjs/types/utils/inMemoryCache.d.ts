import { IScreen } from "../data/screen";
declare class InMemoryCache {
    screens: IScreen[];
    historyIndex: number;
    constructor();
    setScreens(screens: IScreen[]): void;
    getScreens(): IScreen[];
    setHistoryIndex(index: number): void;
    getHistoryIndex(): number;
    clear(): void;
}
declare const _default: InMemoryCache;
export default _default;
