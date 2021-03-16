"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromeExtensions = exports.ChromeManifest = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ChromeManifest = /** @class */ (function () {
    function ChromeManifest() {
        this.manifest_version = 1.0;
        this.name = '';
        this.description = '';
        this.version = '';
        this.permissions = [];
        this.page_action = {
            default_title: '测试',
            default_popup: 'popup_html',
        };
        this.author = '测试';
        this.content_scripts = [];
        this.version_name = '1.0_test';
        this.short_name = '测试';
        this.web_accessible_resources = ['resources'];
    }
    return ChromeManifest;
}());
exports.ChromeManifest = ChromeManifest;
var ChromeExtensions = /** @class */ (function () {
    function ChromeExtensions() {
        this.manifest = new ChromeManifest();
    }
    Object.defineProperty(ChromeExtensions.prototype, "name", {
        get: function () {
            return this.manifest.name;
        },
        set: function (val) {
            this.manifest.name = val;
        },
        enumerable: false,
        configurable: true
    });
    ChromeExtensions.prototype.createManifest = function (dirPath) {
        dirPath = path_1.default.join(dirPath, 'default');
        var manifestPath = path_1.default.join(dirPath, 'manifest.json');
        var manifestStr = JSON.stringify(this.manifest);
        if (!fs_1.default.existsSync(manifestPath)) {
            fs_1.default.writeFileSync(manifestPath, manifestStr);
        }
    };
    ChromeExtensions.prototype.createDir = function (dirPath) {
        var defaultPath = path_1.default.join(dirPath, 'default');
        var optionsPath = path_1.default.join(defaultPath, 'options');
        var popupPath = path_1.default.join(defaultPath, 'popup');
        var browserPath = path_1.default.join(defaultPath, 'browser');
        var contentPath = path_1.default.join(defaultPath, 'content');
        var resourcesPath = path_1.default.join(defaultPath, 'resources');
        var backgroundPath = path_1.default.join(defaultPath, 'background');
        if (!fs_1.default.existsSync(defaultPath)) {
            fs_1.default.mkdirSync(defaultPath);
        }
        if (!fs_1.default.existsSync(resourcesPath)) {
            fs_1.default.mkdirSync(resourcesPath);
        }
        if (!fs_1.default.existsSync(contentPath)) {
            fs_1.default.mkdirSync(contentPath);
        }
        if (!fs_1.default.existsSync(browserPath)) {
            fs_1.default.mkdirSync(browserPath);
        }
        if (!fs_1.default.existsSync(popupPath)) {
            fs_1.default.mkdirSync(popupPath);
        }
        if (!fs_1.default.existsSync(optionsPath)) {
            fs_1.default.mkdirSync(optionsPath);
        }
        if (!fs_1.default.existsSync(backgroundPath)) {
            fs_1.default.mkdirSync(backgroundPath);
        }
    };
    ChromeExtensions.prototype.createFile = function (dirPath) {
        dirPath = path_1.default.join(dirPath, 'default');
        var browserPath = path_1.default.join(dirPath, 'browser/browser.html');
        var popupPath = path_1.default.join(dirPath, 'popup/popup.html');
        var optionsPath = path_1.default.join(dirPath, 'options/options.html');
        if (!fs_1.default.existsSync(browserPath)) {
            fs_1.default.writeFileSync(browserPath, '', { flag: 'w+' });
        }
        if (!fs_1.default.existsSync(popupPath)) {
            fs_1.default.writeFileSync(popupPath, '', { flag: 'w+' });
        }
        if (!fs_1.default.existsSync(optionsPath)) {
            fs_1.default.writeFileSync(optionsPath, '', { flag: 'w+' });
        }
    };
    ChromeExtensions.prototype.createExtension = function (dirPath) {
        if (!path_1.default.isAbsolute(dirPath)) {
            dirPath = path_1.default.resolve('.', dirPath);
        }
        this.createDir(dirPath);
        this.createFile(dirPath);
        this.createManifest(dirPath);
    };
    return ChromeExtensions;
}());
exports.ChromeExtensions = ChromeExtensions;
var ts = new ChromeExtensions();
ts.name = '测试';
ts.createExtension('./public');
//# sourceMappingURL=main.js.map