"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _module = require("module");
var _http = _interopRequireDefault(require("http"));
var _https = _interopRequireDefault(require("https"));
var _url = _interopRequireDefault(require("url"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = (0, _module.createRequire)(import.meta.url);
var Bralve = /*#__PURE__*/function () {
  function Bralve() {
    _classCallCheck(this, Bralve);
  }
  _createClass(Bralve, [{
    key: "makeRequest",
    value: function makeRequest(config) {
      var _url$parse = _url["default"].parse(config.url),
        protocol = _url$parse.protocol,
        hostname = _url$parse.hostname,
        port = _url$parse.port,
        path = _url$parse.path;
      var protocolModule = protocol === 'https:' ? _https["default"] : _http["default"];
      var requestOptions = {
        method: config.method || 'GET',
        headers: _objectSpread(_objectSpread({}, config.headers), {}, {
          'x-powered-by': 'Bralve By Nicat-dcw.',
          'x-request-date': Date.now()
        }),
        hostname: hostname,
        port: port,
        path: path
      };
      return new Promise(function (resolve, reject) {
        var req = protocolModule.request(requestOptions, function (res) {
          var responseData = '';
          res.on('data', function (chunk) {
            responseData += chunk;
          });
          res.on('end', function () {
            var response = {
              data: responseData,
              status: res.statusCode,
              bralveConfig: config,
              statusText: res.statusMessage,
              headers: res.headers
            };
            resolve(response);
          });
        });
        req.on('error', function (error) {
          reject(error);
        });
        if (config.data) {
          req.write(config.data);
        }
        req.end();
      });
    }
  }, {
    key: "get",
    value: function get(url, config) {
      return this.makeRequest(_objectSpread(_objectSpread({}, config), {}, {
        method: 'GET',
        url: url
      }));
    }
  }, {
    key: "post",
    value: function post(url, data, config) {
      return this.makeRequest(_objectSpread(_objectSpread({}, config), {}, {
        method: 'POST',
        url: url,
        data: data
      }));
    }
  }, {
    key: "patch",
    value: function patch(url, data, config) {
      return this.makeRequest(_objectSpread(_objectSpread({}, config), {}, {
        method: 'PATCH',
        url: url,
        data: data
      }));
    }
  }, {
    key: "put",
    value: function put(url, data, config) {
      return this.makeRequest(_objectSpread(_objectSpread({}, config), {}, {
        method: 'PUT',
        url: url,
        data: data
      }));
    }
  }, {
    key: "delete",
    value: function _delete(url, config) {
      return this.makeRequest(_objectSpread(_objectSpread({}, config), {}, {
        method: 'DELETE',
        url: url
      }));
    }
  }, {
    key: "head",
    value: function head(url, config) {
      return this.makeRequest(_objectSpread(_objectSpread({}, config), {}, {
        method: 'HEAD',
        url: url
      }));
    }
  }]);
  return Bralve;
}();
var _default = Bralve;
exports["default"] = _default;