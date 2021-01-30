import { Md5 } from 'ts-md5/dist/md5'
import Fly from 'flyio'

export class YouDao {
    private static _instance: YouDao
    public static get instance() {
        if (!YouDao._instance) {
            YouDao._instance = new YouDao()
        }
        return YouDao._instance
    }

    private _api: string =
        'http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'
    public get api() {
        return this._api
    }

    private _sign: string = ''
    public get signStr() {
        return this._sign
    }

    private _params: YouDaoParams = new YouDaoParams()
    public get params() {
        return this._params
    }

    private _header: YouDaoHeader = new YouDaoHeader()
    public get header() {
        return this._header
    }

    private _length: number = 0
    public get length() {
        return this._length
    }

    public readonly maxLength: number = 5e3

    private _appVersion: string =
        '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    public get appVersion() {
        return this._appVersion
    }

    private _cookie: string[] = []
    public get cookie() {
        return this._cookie
    }

    private async getCookie() {
        let response = await Fly.get('http://fanyi.youdao.com/')
        console.log(response)
        for (let key in response.headers) {
            if (key !== 'set-cookie') continue
            let cookies = Reflect.get(
                response.headers,
                'set-cookie'
            ) as string[]
            for (let cookieStr of cookies) {
                let valArray = cookieStr.split(';')
                if (!valArray.length) continue

                this.cookie.push(valArray[0])
            }
        }
    }

    /**
     * 翻译 中文->英文 英文->中文
     * @param content
     */
    public async translation(content: string): Promise<string> {
        this._length = content.length
        if (content.length > this.maxLength) {
            throw Error(`翻译字符串长度超过${this.maxLength}字`)
        }

        if (!this.cookie.length) {
            await this.getCookie()
        }
        this.params.i = content
        let result = this.sign(content)
        this.params.salt = result.salt
        this.params.sign = String(result.sign)
        this.params.bv = String(result.bv)
        this.params.lts = result.ts

        let arr: string[] = []
        for (let key in this.params) {
            arr.push(`${key}=${Reflect.get(this.params, key)}`)
        }

        let response = await Fly.post<YouDaoRes>(this.api, arr.join('&'), {
            headers: Object.assign(
                {
                    'Content-Type':
                        'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
                    // Cookie: `OUTFOX_SEARCH_USER_ID_NCOO=397526214.1366013; _ga=GA1.2.46702647.1574774420; OUTFOX_SEARCH_USER_ID="2013089821@10.108.160.17"; JSESSIONID=aaaDEfuS0KOBY60mHMiBx; ___rl__test__cookies=1611985539450`,
                    // Cookie: `_ga=GA1.2.46702647.1574774420; OUTFOX_SEARCH_USER_ID="2013089821@10.108.160.17"; JSESSIONID=aaaDEfuS0KOBY60mHMiBx; ___rl__test__cookies=1611985539450`,
                    // Cookie: `OUTFOX_SEARCH_USER_ID="2013089821@10.108.160.17"; JSESSIONID=aaaDEfuS0KOBY60mHMiBx; ___rl__test__cookies=1611985539450`,
                    // Cookie: `OUTFOX_SEARCH_USER_ID="2013089821@10.108.160.17"; JSESSIONID=aaaDEfuS0KOBY60mHMiBx; ___rl__test__cookies=1611985539450`,
                    // Cookie: `OUTFOX_SEARCH_USER_ID="2013089821@10.108.160.17"`,
                    Cookie: this.cookie.join(';'),
                },
                this.header
            ),
        })
        let res = response.data
        if (res.errorCode != YouDaoError.success) {
            throw Error(`请求错误`)
        }
        return res.translateResult[0].tgt
    }

    private sign(content: string) {
        let now = Date.now()
        let md5Str = Md5.hashStr(content)
        let salt = `${now}${parseInt(`${10 * Math.random()}`, 10)}`
        let signStr = Md5.hashStr(
            `fanyideskweb${content}${salt}Tbh5E8=q6U3EXe+&L[4c@`
        )
        return { ts: now, bv: md5Str, salt, sign: signStr }
    }
}

export class YouDaoParams {
    i: string = ''
    from: string = 'AUTO'
    to: string = 'AUTO'
    smartresult: string = 'dict'
    client: string = 'fanyideskweb'
    salt: string = ''
    sign: string = ''
    lts: number = 0
    bv: string = ''
    doctype: string = 'json'
    version: number = 2.1
    keyfrom: string = 'fanyi.web'
    // action: string = 'FY_BY_REALTlME'
    // action: string = 'FY_BY_DEFAULT';
    action: string = 'FY_BY_CLICKBUTTION'
}

export class YouDaoHeader {
    Host: string = 'fanyi.youdao.com'
    Origin: string = 'http://fanyi.youdao'
    Referer: string = 'http://fanyi.youdao'
}

export class YouDaoRes {
    errorCode: YouDaoError = 0
    type: string = ''
    smartResult: { entries: string[]; type: number } = { entries: [], type: 1 }
    translateResult: { tgt: string; src: string }[] = []
}

export enum YouDaoError {
    success = 0,
    fail = 50,
}

// YouDao.instance.translation('测试')
