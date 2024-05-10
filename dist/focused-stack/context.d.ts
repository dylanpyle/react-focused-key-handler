import { ReactNode } from "react";
import { FocusedStack, FocusedStackOptions as FocusedStackProps } from "./index";
interface OwnProps {
    children: ReactNode;
}
export declare function Provider(props: OwnProps & Partial<FocusedStackProps>): JSX.Element;
export declare function useFocusedStack(): FocusedStack;
export {};
