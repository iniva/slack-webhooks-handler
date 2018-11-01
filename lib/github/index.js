"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("./helpers");

var _events = require("./events");

const github = (headers, payload) => {
  const event = (0, _helpers.getEventFromHeaders)(headers);

  if (!_events.EVENTS_AVAILABLE.includes(event)) {
    throw new Error(`Event [${event}] is not available in Github webhooks`);
  }

  if (!payload) {
    throw new Error(`Event [${event}] has no payload`);
  }

  return (0, _events.buildData)(event, payload);
};

var _default = github;
exports.default = _default;