import React, { ReactNode } from "react";
export interface FocusContextValue {
    focusGroupId: number | null;
}
export declare const FocusContext: React.Context<FocusContextValue>;
interface OwnProps {
    children?: ReactNode;
}
export declare function FocusGroup(props: OwnProps): JSX.Element;
export declare const FocusContextConsumer: React.Consumer<FocusContextValue>;
export declare function useFocusGroupId(): number | null;
export {};
