var regeneratorRuntime = require('babel-regenerator-runtime');'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* @module HttpClient */


var _flashheart = require('flashheart');

var _flashheart2 = _interopRequireDefault(_flashheart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pkg = require('../../package.json');

/**
 * Class representing HttpClient
 */

var HttpClient = function () {
    function HttpClient(options) {
        _classCallCheck(this, HttpClient);

        this.options = {
            name: '' + pkg.name,
            timeout: 5000,
            userAgent: pkg.name + '/' + pkg.version,
            defaults: {
                json: true
            }
        };
        this.options = Object.assign(this.options, options);
        this.client = _flashheart2.default.createClient(this.options);
    }

    /**
     * Common method call to flashheart
     * @param {String} method
     * @param {String} url
     * @param [Object] body
     * @param [Object] options
     */


    _createClass(HttpClient, [{
        key: 'common',
        value: function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(method, url, body, options) {
                var _this = this;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                method = method.toLowerCase();
                                return _context.abrupt('return', new Promise(function (resolve, reject) {
                                    var args = [url, body, options];

                                    if (['get', 'delete'].indexOf(method) >= 0) {
                                        args.splice(1, 1);
                                    }

                                    args.push(function (error, body, response) {
                                        if (error) {
                                            return reject(error);
                                        }
                                        resolve({
                                            response: response,
                                            body: body
                                        });
                                    });

                                    _this.client[method].apply(_this.client, args);
                                }));

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function common(_x, _x2, _x3, _x4) {
                return ref.apply(this, arguments);
            }

            return common;
        }()

        /**
         * Request with payload
         */

    }, {
        key: 'withBody',
        value: function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(method, url) {
                var body = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                var options = arguments.length <= 3 || arguments[3] === undefined ? { headers: {} } : arguments[3];
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (/x-www-form-urlencoded/.test(options.headers['Content-Type'])) {
                                    options.form = body;
                                    options.json = this.options.json || false;
                                    body = null;
                                } else if (/form-data/.test(options.headers['Content-Type'])) {
                                    options.formData = body;
                                    options.json = this.options.json || false;
                                    body = null;
                                }
                                // this is the application/json
                                _context2.next = 3;
                                return this.common(method, url, body, options);

                            case 3:
                                return _context2.abrupt('return', _context2.sent);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function withBody(_x5, _x6, _x7, _x8) {
                return ref.apply(this, arguments);
            }

            return withBody;
        }()

        /**
         * GET
         * @param {String} url
         * @param {Object} query
         * @param {Object} options
         */

    }, {
        key: 'get',
        value: function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(url) {
                var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                options.qs = query;
                                _context3.next = 3;
                                return this.common('get', url, null, options);

                            case 3:
                                return _context3.abrupt('return', _context3.sent);

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function get(_x11, _x12, _x13) {
                return ref.apply(this, arguments);
            }

            return get;
        }()

        /**
         * POST
         * @param {String} url
         * @param {Object} body
         * @param {Object} options
         */

    }, {
        key: 'post',
        value: function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(url, body, options) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.withBody('post', url, body, options);

                            case 2:
                                return _context4.abrupt('return', _context4.sent);

                            case 3:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function post(_x16, _x17, _x18) {
                return ref.apply(this, arguments);
            }

            return post;
        }()

        /**
         * PUT
         * @param {String} url
         * @param {Object} body
         * @param {Object} options
         */

    }, {
        key: 'put',
        value: function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(url, body, options) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.withBody('put', url, body, options);

                            case 2:
                                return _context5.abrupt('return', _context5.sent);

                            case 3:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function put(_x19, _x20, _x21) {
                return ref.apply(this, arguments);
            }

            return put;
        }()

        /**
         * PATCH
         * @param {String} url
         * @param {Object} body
         * @param {Object} options
         */

    }, {
        key: 'patch',
        value: function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(url, body, options) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.withBody('patch', url, body, options);

                            case 2:
                                return _context6.abrupt('return', _context6.sent);

                            case 3:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function patch(_x22, _x23, _x24) {
                return ref.apply(this, arguments);
            }

            return patch;
        }()

        /**
         * DELETE
         * @param {String} url
         * @param {Object} query
         * @param {Object} options
         */

    }, {
        key: 'delete',
        value: function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(url) {
                var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                options.qs = query;
                                _context7.next = 3;
                                return this.common('delete', url, null, options);

                            case 3:
                                return _context7.abrupt('return', _context7.sent);

                            case 4:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function _delete(_x25, _x26, _x27) {
                return ref.apply(this, arguments);
            }

            return _delete;
        }()
    }]);

    return HttpClient;
}();

exports.default = HttpClient;