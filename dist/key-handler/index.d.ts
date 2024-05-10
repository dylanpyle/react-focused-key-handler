import { ReactNode } from "react";
export declare enum Modifier {
    Meta = "Meta",
    Shift = "Shift",
    Control = "Control",
    Alt = "Alt"
}
export interface Trigger {
    key: typeof KeyboardEvent.prototype.code;
    modifiers?: Modifier[];
    shouldTriggerInInputs?: boolean;
}
declare type KeyboardEventHandler = (event: KeyboardEvent) => void;
interface LeafProp {
    handler: KeyboardEventHandler;
    preventDefault?: boolean;
}
interface NodeProp {
    children: ReactNode;
}
export declare type KeyHandlerProps = {
    triggers: Trigger[];
} & (LeafProp | NodeProp);
export declare function KeyHandler(props: KeyHandlerProps): JSX.Element | null;
export {};
