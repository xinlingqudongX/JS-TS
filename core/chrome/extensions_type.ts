// manifestJSON文件声明 V2
export interface ExtensionsManifest {
    manifest_version: number
    name: string
    default_locale?: 'en'
    description: string
    version: string
    version_code?: number
    permissions: ExtensionsPermissions[] | string[]
    //  可选权限
    optional_permissions?: ExtensionsPermissions[] | string[]
    brower_action?: {
        default_icon?: { [key: string]: string }
        default_popup: string
        default_title: string
    }
    page_action?: {
        default_icon?: { [key: string]: string }
        default_popup: string
        default_title: string
    }
    update_url?: string
    icons?: { [key: number]: string }
    action?: {
        default_icon?: { [key: string]: string }
        default_popup: string
        default_title: string
    }
    //  作者
    author: string
    automation?: string
    bluetooth?: {
        uuids: string[]
        socket?: boolean
        low_energy?: boolean
    }
    background?: {
        persistent: boolean
        service_worker?: string
        scripts: string[]
    }
    chrome_settings_overrides?: {
        homepage: string
        search_provider?: object
        startup_pages: string[]
    }
    chrome_url_overrides?: {
        bookmarks: string
        history: string
        newtab: string
    }
    commands?: {
        [key: string]: {
            suggested_key: {
                default: string
                mac: string
                windows: string
                linux: string
                chromeos: string
            }
            description: string
        }
    }
    content_capabilities?: object
    content_scripts: {
        matches: string[]
        css?: string
        js: string[]
    }[]
    //     default-src 'self';
    // connect-src * data: blob: filesystem:;
    // style-src 'self' data: 'unsafe-inline';
    // img-src 'self' data:;
    // frame-src 'self' data:;
    // font-src 'self' data:;
    // media-src * data: blob: filesystem:;
    // 配置CSP
    content_security_policy?: 'policyString'
    converted_from_user_script?: object
    current_locale?: object
    declarative_net_request?: object
    devtools_page?: string
    differential_fingerprint?: object
    event_rules?: {
        event: string
        actions: { type: string }[]
        conditions: { type: string; css: string[] }[]
    }[]
    externally_connectable?: {
        matches: string[]
        ids: string[]
        accepts_tls_channel_id: boolean
    }
    file_brower_handlers?: {
        id: string
        default_title: string
        file_filters: string[]
    }[]
    file_system_provider_capabilities?: {
        configurable: true
        multiple_mounts: true
        source: 'network'
        watchable: false
    }
    homepage_url?: string
    host_permissions?: object
    import?: {
        id: string
        minimum_version: string
    }[]
    export?: {
        allowlist: string[]
    }
    incognito?: 'spanning, split, or not_allowed'
    input_components?: object
    key?: string
    manimum_chrome_version?: string
    nacl_modules?: {
        path: string
        mime_type: string
    }[]
    natively_connectable?: object
    oath2?: object
    offline_enabled?: true
    omnibox?: {
        keyword: string
    }
    options_page?: string
    options_ui?: {
        chrome_style: true
        page: string
        open_in_tab: boolean
    }
    platforms?: object
    replacement_web_app?: object
    requirements?: {
        plugins: {
            naapi: true
        }
    }
    sandbox?: {
        pages: string[]
        content_security_policy: string
    }[]
    short_name: string
    storage?: {
        managed_schema: 'schema.json'
    }
    system_indicator?: object
    tts_engine?: {
        voices: {
            voice_name: string
            lang: string
            event_types: string[]
        }[]
    }
    version_name: string
    web_accessible_resources: string[]
}

/**
 * 插件扩展权限
 */
export enum ExtensionsPermissions {
    Alarms = 'alarms',
    Storage = 'storage',
    Cookies = 'cookies',
    Tabs = 'tabs',
    Debugger = 'debugger',
    DeclarativeNetRequest = 'declarativeNetRequest',
    Devtools = 'devtools',
    Experimental = 'experimental',
    Geolocation = 'geolocation',
    Mdns = 'mdns',
    Proxy = 'proxy',
    Tts = 'tts',
    TtsEngine = 'ttsEngine',
    Wallpaper = 'wallpaper',
    ActiveTab = 'activeTab',
    ContextMenus = 'contextMenus',
    Http = 'http://*/*',
    Https = 'https://*/*',
    AllProtocol = '*://*/*',
    AllUrls = '<all_urls>',
    Bookmarks = 'bookmarks',
    ClipboardRead = 'clipboardRead',
    ClipboardWrite = 'clipboardWrite',
    ContentSettings = 'contentSettings',
    DesktopCapture = 'desktopCapture',
    Downloads = 'downloads',
    History = 'history',
    Management = 'management',
    NativeMessaging = 'nativeMessaging',
    Notifications = 'notifications',
    PageCapture = 'pageCapture',
    Privacy = 'privacy',
    SystemCpu = 'system.cpu',
    SystemDisplay = 'system.display',
    SystemMemory = 'system.memory',
    SystemStorage = 'system.storage',
    SystemNetwork = 'system.network',
    TabCapture = 'tabCapture',
    TopSites = 'topSites',
    FileBrowserHandler = 'fileBrowserHandler',
    DeclarativeWebRequest = 'declarativeWebRequest',
    BrowsingData = 'browsingData',
    CertificateProvider = 'certificateProvider',
    DeclarativeContent = 'declarativeContent',
    DeclarativeNetRequestFeedback = 'declarativeNetRequestFeedback',
    DocumentScan = 'documentScan',
    EnterpriseDeviceAttributes = 'enterprise.deviceAttributes',
    EnterpriseHardwarePlatform = 'enterprise.hardwarePlatform',
    EnterpriseNetworkingAttributes = 'enterprise.networkingAttributes',
    EnterprisePlatformKeys = 'enterprise.platformKeys',
    FileSystemProvider = 'fileSystemProvider',
    FielSystem = 'fielSystem',
    fontSettings = 'fontSettings',
    Gcm = 'gcm',
    Identity = 'identity',
    Idle = 'idle',
    LoginState = 'loginState',
    PlatformKeys = 'platformKeys',
    Power = 'power',
    PrinterProvider = 'printerProvider',
    Printing = 'printing',
    PrintingMetrics = 'printingMetrics',
    Scripting = 'scripting',
    Search = 'search',
    Sessions = 'sessions',
    SignedInDevices = 'signedInDevices',
    TabGroups = 'tabGroups',
    UnlimitedStorage = 'unlimitedStorage',
    VpnProvider = 'vpnProvider',
    WebRequestBlocking = 'webRequestBlocking',
    AppWindowAlwaysOnTop = 'app.window.alwaysOnTop',
    AppWindowFullscreen = 'app.window.fullscreen',
    AppWindowShape = 'app.window.shape',
    AppWindowFullscreenOverrideEsc = 'app.window.fullscreen.overrideEsc',
    ChromeFavicon = 'chrome://favicon/',
    PointerLock = 'pointerLock',
    AccessibilityFeaturesRead = 'accessibilityFeatures.read',
    AccessibilityFeaturesModify = 'accessibilityFeatures.modify',
    Hid = 'hid',
    MediaGalleries = 'mediaGalleries',
    Serial = 'serial',
    SyncFileSystem = 'syncFileSystem',
    Usb = 'usb',
    VideoCapture = 'videoCapture',
}
