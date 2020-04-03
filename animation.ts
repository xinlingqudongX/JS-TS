const { ccclass, property } = cc._decorator;

/**
 *自定义的图集动画组件
 *
 * @export
 * @class Animation
 * @extends {cc.Component}
 */
@ccclass
export default class Animation extends cc.Component {

    @property({
        type: cc.SpriteAtlas,
        tooltip:'图集'
    })
    public atlas: cc.SpriteAtlas | null = null;

    public played: boolean = false;

    public autoPlay: boolean = true;

    public intervalTime: number = 0.1;

    public time: number = 0;

    public frames:Array<cc.SpriteFrame> = [];

    public sprite: cc.Sprite | null = null;
    onLoad(){
        if(this.autoPlay) this.played = true;
        if(!this.sprite) this.sprite = this.addComponent(cc.Sprite);
        if(this.atlas) this.frames = this.atlas.getSpriteFrames();
    }

    update(dt:number){
        if(!this.frames) return;

        this.time += dt;
        let index = Math.floor(this.time / this.intervalTime);
        if( index >= this.frames.length){
            index -= this.frames.length;

            this.time -= (this.frames.length * this.intervalTime);
        }

        this.sprite && (this.sprite.spriteFrame = this.frames[index]);
    }
}