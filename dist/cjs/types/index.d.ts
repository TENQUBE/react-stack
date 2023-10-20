import { AnimationType } from './interfaces';
import Screen from './componets/screen';
import Link from './componets/link';
import useNavigation, { INavigation, INavigationPushState } from './hooks/useNavigaiton';
import useStacks from './hooks/useStacks';
import { IScreen } from './data/screen';
import './styles/main.scss';
declare const ReactStackProvider: ({ children }: {
    children: any;
}) => import("react/jsx-runtime").JSX.Element;
export { Screen, Link, AnimationType, useNavigation, INavigation, INavigationPushState, useStacks, IScreen };
export default ReactStackProvider;
