"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _github = _interopRequireDefault(require("./github"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const factory = type => {
  const webhooks = {
    github: _github.default
  };

  if (!Object.keys(webhooks).includes(type)) {
    throw new Error(`Webhooks for [${type}] are not available`);
  }

  return webhooks[type];
};

var _default = factory;
exports.default = _default;