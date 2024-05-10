import { Trigger } from "../key-handler";
declare type Handler = (event: KeyboardEvent) => void;
export interface FocusedStackOptions {
    timeout: number;
}
export declare class FocusedStack {
    private keyGenId;
    private stack;
    private teardownHandler;
    private timeout;
    private clock;
    constructor(options?: Partial<FocusedStackOptions>);
    getGroupId: () => number;
    getKeyCodeFromEvent: (e: KeyboardEvent) => string;
    fireEvent: (e: KeyboardEvent) => void;
    pushGroup: (groupId: number) => void;
    registerTeardown: (callback: () => void) => void;
    pushHandler: (groupId: number, handler: Handler, trigger: Trigger) => void;
    removeAtIdAndTrigger: (groupId: number, trigger: Trigger, handler: Handler) => void;
    removeGroup: (groupId: number) => void;
    private getKey;
    tearDown: () => void;
    startClock: () => void;
}
export {};
