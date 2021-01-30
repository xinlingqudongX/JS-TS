import Fly from 'flyio'
import querystring from 'querystring';

export class Google {
    private static _instance: Google
    public static get instance() {
        if (!Google._instance) {
            Google._instance = new Google()
        }
        return Google._instance
    }

    private _api: string =
        'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&hl=zh-CN&dt=t&dt=bd&dj=1&source=icon&tk=234590.234590&q='
    public get api() {
        return this._api
    }

    /**
     * 翻译 英文->中文
     * @param content 
     */
    public async translation(content: string): Promise<string> {
        let query = querystring.escape(content)
        let response = await Fly.get<GoogleTranslationRes>(`${this.api}${query}`)
        if(!response.data.sentences.length){
            throw Error(`翻译错误`)
        }

        return response.data.sentences[0].trans
    }
}

export class GoogleTranslationRes {
    sentences: {
        backend: number
        orig: string
        trans: string
        translation_engine_debug_info: {
            model_tracking: {
                checkpoint_md5: string
                launch_doc: string
            }
        }[]
        model_specification: {}[]
    }[] = []
    spell: object = {}
    src: string = ''
}

Google.instance.translation('测试')
