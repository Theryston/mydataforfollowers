"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;
var _VerifyEmail = require("./templates/VerifyEmail");
function App() {
  return {
    VerifyEmail: {
      componentFunction: _VerifyEmail.VerifyEmail,
      props: {
        code: "F3F2B5"
      }
    }
  };
}