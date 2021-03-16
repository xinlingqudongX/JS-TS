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
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var WebServer = express_1.default();
var port = 8081;
var host = '0.0.0.0';
var ApiUrl = 'https://way.jd.com/TONGLI/MDetailGetDetail?num_iid=aaa&appkey=0023323165a1b9d9dd8a14376d812b90';
var testKey = '0023323165a1b9d9dd8a14376d812b90';
WebServer.use(body_parser_1.default.urlencoded({ limit: '20mb', extended: true }));
WebServer.use(body_parser_1.default.json({ limit: '20mb' }));
// const redisCli = redis.createClient()
var authToken = '';
WebServer.get('/tbItem', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, itemid, itemData, msg, resData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.query.itemid, itemid = _a === void 0 ? '' : _a;
                    return [4 /*yield*/, axios_1.default.get(ApiUrl, {
                            params: { num_iid: itemid, appKey: testKey },
                        })];
                case 1:
                    itemData = _b.sent();
                    msg = '查询成功';
                    if (!itemData.data) {
                        msg = '获取数据错误';
                        res.json({ err: 500, msg: msg });
                        return [2 /*return*/];
                    }
                    //  查询成功，记录次数
                    if (itemData.data.charge) {
                        console.log('查询成功');
                    }
                    if (itemData.data.remain <= 10) {
                        msg = "\u5269\u4F59\u6B21\u6570\u4E0D\u8DB3\uFF0C\u8BF7\u5C3D\u5FEB\u5145\u503C";
                    }
                    try {
                        resData = JSON.parse(itemData.data.ret_body);
                    }
                    catch (jrr) {
                        res.json({ err: 501, msg: '解析数据错误' });
                        return [2 /*return*/];
                    }
                    res.json({ err: 0, res: resData, remain: itemData.data.remain, msg: msg });
                    return [2 /*return*/];
            }
        });
    });
});
// WebServer.listen((res:unknown)=>{
//     console.log(`start webServer `,res)
// })
WebServer.listen(8081, function () {
    console.log("start webServer:" + host + ":" + port + " ");
});
//# sourceMappingURL=server.js.map