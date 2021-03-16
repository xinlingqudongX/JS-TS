"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YouDaoError = exports.YouDaoRes = exports.YouDaoHeader = exports.YouDaoParams = exports.YouDao = void 0;
var md5_1 = require("ts-md5/dist/md5");
var flyio_1 = __importDefault(require("flyio"));
var YouDao = /** @class */ (function () {
    function YouDao() {
        this._api = 'http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule';
        this._sign = '';
        this._params = new YouDaoParams();
        this._header = new YouDaoHeader();
        this._length = 0;
        this.maxLength = 5e3;
        this._appVersion = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';
        this._cookie = [];
    }
    Object.defineProperty(YouDao, "instance", {
        get: function () {
            if (!YouDao._instance) {
                YouDao._instance = new YouDao();
            }
            return YouDao._instance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YouDao.prototype, "api", {
        get: function () {
            return this._api;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YouDao.prototype, "signStr", {
        get: function () {
            return this._sign;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YouDao.prototype, "params", {
        get: function () {
            return this._params;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YouDao.prototype, "header", {
        get: function () {
            return this._header;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YouDao.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YouDao.prototype, "appVersion", {
        get: function () {
            return this._appVersion;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YouDao.prototype, "cookie", {
        get: function () {
            return this._cookie;
        },
        enumerable: false,
        configurable: true
    });
    YouDao.prototype.getCookie = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, key, cookies, _i, cookies_1, cookieStr, valArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, flyio_1.default.get('http://fanyi.youdao.com/')];
                    case 1:
                        response = _a.sent();
                        console.log(response);
                        for (key in response.headers) {
                            if (key !== 'set-cookie')
                                continue;
                            cookies = Reflect.get(response.headers, 'set-cookie');
                            for (_i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
                                cookieStr = cookies_1[_i];
                                valArray = cookieStr.split(';');
                                if (!valArray.length)
                                    continue;
                                this.cookie.push(valArray[0]);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 翻译 中文->英文 英文->中文
     * @param content
     */
    YouDao.prototype.translation = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var result, arr, key, response, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._length = content.length;
                        if (content.length > this.maxLength) {
                            throw Error("\u7FFB\u8BD1\u5B57\u7B26\u4E32\u957F\u5EA6\u8D85\u8FC7" + this.maxLength + "\u5B57");
                        }
                        if (!!this.cookie.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getCookie()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.params.i = content;
                        result = this.sign(content);
                        this.params.salt = result.salt;
                        this.params.sign = String(result.sign);
                        this.params.bv = String(result.bv);
                        this.params.lts = result.ts;
                        arr = [];
                        for (key in this.params) {
                            arr.push(key + "=" + Reflect.get(this.params, key));
                        }
                        return [4 /*yield*/, flyio_1.default.post(this.api, arr.join('&'), {
                                headers: Object.assign({
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
                                    // Cookie: `OUTFOX_SEARCH_USER_ID_NCOO=397526214.1366013; _ga=GA1.2.46702647.1574774420; OUTFOX_SEARCH_USER_ID="2013089821@10.108.160.17"; JSESSIONID=aaaDEfuS0KOBY60mHMiBx; ___rl__test__cookies=1611985539450`,
                                    // Cookie: `_ga=GA1.2.46702647.1574774420; OUTFOX_SEARCH_USER_ID="2013089821@10.108.160.17"; JSESSIONID=aaaDEfuS0KOBY60mHMiBx; ___rl__test__cookies=1611985539450`,
                                    // Cookie: `OUTFOX_SEARCH_USER_ID="2013089821@10.108.160.17"; JSESSIONID=aaaDEfuS0KOBY60mHMiBx; ___rl__test__cookies=1611985539450`,
                                    // Cookie: `OUTFOX_SEARCH_USER_ID="2013089821@10.108.160.17"; JSESSIONID=aaaDEfuS0KOBY60mHMiBx; ___rl__test__cookies=1611985539450`,
                                    // Cookie: `OUTFOX_SEARCH_USER_ID="2013089821@10.108.160.17"`,
                                    Cookie: this.cookie.join(';'),
                                }, this.header),
                            })];
                    case 3:
                        response = _a.sent();
                        res = response.data;
                        if (res.errorCode != YouDaoError.success) {
                            throw Error("\u8BF7\u6C42\u9519\u8BEF");
                        }
                        return [2 /*return*/, res.translateResult[0].tgt];
                }
            });
        });
    };
    YouDao.prototype.sign = function (content) {
        var now = Date.now();
        var md5Str = md5_1.Md5.hashStr(content);
        var salt = "" + now + parseInt("" + 10 * Math.random(), 10);
        var signStr = md5_1.Md5.hashStr("fanyideskweb" + content + salt + "Tbh5E8=q6U3EXe+&L[4c@");
        return { ts: now, bv: md5Str, salt: salt, sign: signStr };
    };
    return YouDao;
}());
exports.YouDao = YouDao;
var YouDaoParams = /** @class */ (function () {
    function YouDaoParams() {
        this.i = '';
        this.from = 'AUTO';
        this.to = 'AUTO';
        this.smartresult = 'dict';
        this.client = 'fanyideskweb';
        this.salt = '';
        this.sign = '';
        this.lts = 0;
        this.bv = '';
        this.doctype = 'json';
        this.version = 2.1;
        this.keyfrom = 'fanyi.web';
        // action: string = 'FY_BY_REALTlME'
        // action: string = 'FY_BY_DEFAULT';
        this.action = 'FY_BY_CLICKBUTTION';
    }
    return YouDaoParams;
}());
exports.YouDaoParams = YouDaoParams;
var YouDaoHeader = /** @class */ (function () {
    function YouDaoHeader() {
        this.Host = 'fanyi.youdao.com';
        this.Origin = 'http://fanyi.youdao';
        this.Referer = 'http://fanyi.youdao';
    }
    return YouDaoHeader;
}());
exports.YouDaoHeader = YouDaoHeader;
var YouDaoRes = /** @class */ (function () {
    function YouDaoRes() {
        this.errorCode = 0;
        this.type = '';
        this.smartResult = { entries: [], type: 1 };
        this.translateResult = [];
    }
    return YouDaoRes;
}());
exports.YouDaoRes = YouDaoRes;
var YouDaoError;
(function (YouDaoError) {
    YouDaoError[YouDaoError["success"] = 0] = "success";
    YouDaoError[YouDaoError["fail"] = 50] = "fail";
})(YouDaoError = exports.YouDaoError || (exports.YouDaoError = {}));
// YouDao.instance.translation('测试')
//# sourceMappingURL=youdaoTranslation.js.map