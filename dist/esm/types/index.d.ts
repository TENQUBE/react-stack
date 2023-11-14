import { ReactElement } from 'react';
import { AnimationType } from './interfaces';
import { IScreen } from './data/screen';
import useNavigation, { INavigation, INavigationPushState } from './hooks/useNavigaiton';
import useLoading from './hooks/useLoading';
import useStacks from './hooks/useStacks';
import Screen from './componets/screen';
import Link from './componets/link';
import BottomSheet from './componets/bottomsheet';
import Toast from './componets/toast';
import './styles/main.scss';
interface IStackProvider {
    duration?: number;
    delay?: number;
    progressIndicator?: boolean;
    loadingComponent?: ReactElement;
    children: any;
}
declare const ReactStackProvider: ({ duration, delay, children, progressIndicator, loadingComponent }: IStackProvider) => import("react/jsx-runtime").JSX.Element;
export { IStackProvider, Screen, BottomSheet, Toast, Link, AnimationType, useNavigation, useLoading, INavigation, INavigationPushState, useStacks, IScreen };
export default ReactStackProvider;
