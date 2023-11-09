/// <reference types="react" />
interface IProps {
    minHeightFromTop: number;
    maxHeightFromTop: number;
}
export declare function useBottomSheet({ minHeightFromTop, maxHeightFromTop }: IProps): {
    eventRef: import("react").MutableRefObject<HTMLDivElement>;
    sheetRef: import("react").MutableRefObject<HTMLDivElement>;
    contentRef: import("react").MutableRefObject<HTMLDivElement>;
    isExit: boolean;
};
export {};
