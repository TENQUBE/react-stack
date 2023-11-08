import { AnimationType } from './interfaces';
import Screen from './componets/screen';
import Link from './componets/link';
import useNavigation, { INavigation, INavigationPushState } from './hooks/useNavigaiton';
import useStacks from './hooks/useStacks';
import { IScreen } from './data/screen';
import './styles/main.scss';
interface IStackProvider {
    duration?: number;
    delay?: number;
    children: any;
}
declare const ReactStackProvider: ({ duration, delay, children }: IStackProvider) => import("react/jsx-runtime").JSX.Element;
export { IStackProvider, Screen, Link, AnimationType, useNavigation, INavigation, INavigationPushState, useStacks, IScreen };
export default ReactStackProvider;
