import React from "react";
interface OwnProps {
    children: React.ReactNode;
    timeout?: number;
}
export declare function Provider({ children, timeout }: OwnProps): JSX.Element;
export {};
