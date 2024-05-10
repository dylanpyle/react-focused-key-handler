"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchTrigger = void 0;
var key_handler_1 = require("../key-handler");
function matchModifier(event, modifier) {
    switch (modifier) {
        case key_handler_1.Modifier.Meta:
            return event.metaKey;
        case key_handler_1.Modifier.Shift:
            return event.shiftKey;
        case key_handler_1.Modifier.Control:
            return event.ctrlKey;
        case key_handler_1.Modifier.Alt:
            return event.altKey;
        default:
            return false;
    }
}
function countModifiers(event) {
    return (Number(event.altKey) +
        Number(event.ctrlKey) +
        Number(event.shiftKey) +
        Number(event.metaKey));
}
function matchTrigger(event, trigger) {
    var target = event.target;
    var isContentEditable = target
        ? target.nodeName === "INPUT" || target.isContentEditable
        : false;
    if (isContentEditable && !trigger.shouldTriggerInInputs) {
        return false;
    }
    if (!trigger.modifiers || trigger.modifiers.length === 0) {
        return countModifiers(event) === 0 && trigger.key === event.code;
    }
    return (trigger.modifiers.every(matchModifier.bind(null, event)) &&
        trigger.modifiers.length === countModifiers(event) &&
        trigger.key === event.code);
}
exports.matchTrigger = matchTrigger;
