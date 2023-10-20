import { IScreen } from '../data/screen';
declare const useStacks: () => {
    stacks: IScreen[];
    allStacks: Array<IScreen | string>;
};
export default useStacks;
