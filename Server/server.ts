import bodyParser from 'body-parser'
import express from 'express'
import * as redis from 'redis'
import axios from 'axios'
import fs from 'fs';

const WebServer = express()
const port = 9200
const host = '0.0.0.0'
const ApiUrl = 'https://way.jd.com/TONGLI/MDetailGetDetail'
const testKey = '0023323165a1b9d9dd8a14376d812b90'
const authToken1 = '2053a32054a8267'
const redisConfig = {
    host: '127.0.0.1',
    port: 6379,
}

WebServer.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
WebServer.use(bodyParser.json({ limit: '20mb' }))

const redisCli = redis.createClient(redisConfig)
// redisCli.incrby(authToken1, 1)

WebServer.get('/tbItem', async function (req, res) {
    let { itemid = '', token = '' } = req.query
    let msg = '查询成功'

    if (!itemid || !token) {
        msg = '无效的参数'
        res.json({ err: 502, res: '0', msg })
        return
    }

    if (token !== authToken1) {
        msg = '无效的token'
        res.json({ err: 504, res: '0', msg })
        return
    }
    let itemData = await axios.get<{
        code: string
        charge: boolean
        remain: number
        msg: string
        result: {
            ret_id: number
            ret_code: number
            ret_body: string
            ret_message: string
        }
        ret_id: number
        ret_body: string
    }>(ApiUrl, {
        params: { num_iid: itemid, appkey: testKey },
    })

    if (!itemData.data || itemData.data.code != '10000') {
        msg = '获取数据错误'
        console.log(itemData.data.result.ret_message)
        res.json({ err: 500, msg })
        return
    }

    //  查询成功，记录次数
    if (itemData.data.charge) {
        console.log(`${Date.now()}查询商品成功:${itemid}`)
        redisCli.incrby(authToken1, 1)
    }

    fs.writeFileSync('./test.json',itemData.data.result.ret_body)

    if (!itemData.data.result.ret_message.indexOf('item not found')) {
        console.log(`查询商品不存在:${itemid}`)
        msg = '查询商品已下架'
        res.json({ err: 404, res: '0', msg })
        return
    }

    if (itemData.data.remain <= 100) {
        msg = `剩余次数不足，请尽快充值`
    }
    if (itemData.data.result && itemData.data.result.ret_body) {
        var resData: {
            apiStack: {
                name: string
                value: string
            }[]
            item: {
                sellCount: string
            }
        }
        var globalData: {
            global: {
                data: {
                    item: {
                        vagueSellCount: string
                    }
                }
            }
        }
        try {
            resData = JSON.parse(itemData.data.result.ret_body)
        } catch (jrr) {
            res.json({ err: 501, msg: '解析数据错误' })
            return
        }

        // if (!resData || !resData.apiStack || !resData.apiStack.length) {
        //     res.json({ err: 501, msg: '解析数据错误' })
        //     return
        // }

        // try {
        //     globalData = JSON.parse(resData.apiStack[0].value)
        // } catch (error) {
        //     res.json({ err: 501, msg: '解析数据错误' })
        //     return
        // }

        res.json({
            err: 0,
            // res: resData.item.sellCount,
            res: resData,
            // remain: itemData.data.remain,
            msg,
            // sellCount: resData.item.sellCount,
        })
        return
    }
    msg = '获取数据错误'
    res.json({
        err: 503,
        res: '0',
        // remain: itemData.data.remain,
        msg,
        sellCount: '0',
    })
    return
})

// WebServer.listen((res:unknown)=>{
//     console.log(`start webServer `,res)
// })
WebServer.listen(port, () => {
    console.log(`start webServer:${host}:${port} `)
})
