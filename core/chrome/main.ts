import { ExtensionsManifest, ExtensionsPermissions } from './extensions_type'
import fs from 'fs'
import path from 'path'

export class ChromeManifest implements ExtensionsManifest {
    manifest_version: number = 1.0
    name: string = ''
    description: string = ''
    version: string = ''
    permissions = []
    page_action = {
        default_title: '测试',
        default_popup: 'popup_html',
    }
    author = '测试'
    content_scripts = []
    version_name = '1.0_test'
    short_name = '测试'
    web_accessible_resources = ['resources']
}

export class ChromeExtensions {
    public manifest: ChromeManifest = new ChromeManifest()

    public get name() {
        return this.manifest.name
    }

    public set name(val: string) {
        this.manifest.name = val
    }

    private createManifest(dirPath: string) {
        dirPath = path.join(dirPath,'default')
        let manifestPath = path.join(dirPath, 'manifest.json')
        let manifestStr = JSON.stringify(this.manifest)
        if (!fs.existsSync(manifestPath)) {
            fs.writeFileSync(manifestPath, manifestStr)
        }
    }

    private createDir(dirPath: string) {
        let defaultPath = path.join(dirPath, 'default')
        let optionsPath = path.join(defaultPath, 'options')
        let popupPath = path.join(defaultPath, 'popup')
        let browserPath = path.join(defaultPath, 'browser')
        let contentPath = path.join(defaultPath, 'content')
        let resourcesPath = path.join(defaultPath, 'resources')
        let backgroundPath = path.join(defaultPath, 'background')

        if (!fs.existsSync(defaultPath)) {
            fs.mkdirSync(defaultPath)
        }
        if (!fs.existsSync(resourcesPath)) {
            fs.mkdirSync(resourcesPath)
        }
        if (!fs.existsSync(contentPath)) {
            fs.mkdirSync(contentPath)
        }
        if (!fs.existsSync(browserPath)) {
            fs.mkdirSync(browserPath)
        }
        if (!fs.existsSync(popupPath)) {
            fs.mkdirSync(popupPath)
        }
        if (!fs.existsSync(optionsPath)) {
            fs.mkdirSync(optionsPath)
        }
        if (!fs.existsSync(backgroundPath)) {
            fs.mkdirSync(backgroundPath)
        }
    }

    private createFile(dirPath: string) {
        dirPath = path.join(dirPath,'default')
        let browserPath = path.join(dirPath, 'browser/browser.html')
        let popupPath = path.join(dirPath, 'popup/popup.html')
        let optionsPath = path.join(dirPath, 'options/options.html')

        if (!fs.existsSync(browserPath)) {
            fs.writeFileSync(browserPath, '', { flag: 'w+' })
        }
        if (!fs.existsSync(popupPath)) {
            fs.writeFileSync(popupPath,'', {flag:'w+'})
        }
        if (!fs.existsSync(optionsPath)) {
            fs.writeFileSync(optionsPath,'', {flag: 'w+'})
        }
    }

    public createExtension(dirPath: string) {
        if (!path.isAbsolute(dirPath)) {
            dirPath = path.resolve('.', dirPath)
        }
        this.createDir(dirPath)
        this.createFile(dirPath)
        this.createManifest(dirPath)
    }
}

let ts = new ChromeExtensions()
ts.name = '测试'
ts.createExtension('./public')
