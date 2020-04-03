

export default class Test extends WndObj {

    public constructor(){
        super();
    }

    /**
     * 模拟所著当前窗口
     */
    public lockWindow(){
        //  这个还不知道怎么用
        fgui.GTween.delayedCall(3).onComplete(this.closeModalWait, this);
    }
}