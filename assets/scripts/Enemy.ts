const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    speed: number = 150;
    screenWidth: number;
    screenHeight: number;

    onLoad() {
        this.screenWidth = cc.view.getCanvasSize().width;
        this.screenHeight = cc.view.getCanvasSize().height;
    }

    start () {
        // this.schedule(() => {
        //     this.node.y = this.screenHeight + this.node.height/2 ;
        //     this.node.x = Math.random() * (this.screenWidth - this.node.width) + this.node.width/2;
        // }, this.interval)

        // 敌机是一个预设体，自己不需要设置定时器，而是上层父亲来设置。
        this.node.y = this.screenHeight + this.node.height/2 ;
        this.node.x = Math.random() * (this.screenWidth - this.node.width) + this.node.width/2;
    }

    update (dt) {
        this.node.y -= this.speed * dt; 
        if (this.node.y - this.node.height/2 < 0) {
            this.node.removeFromParent(true)
            this.destroy()
        }
    }
}
