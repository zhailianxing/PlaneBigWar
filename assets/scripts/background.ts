const {ccclass, property} = cc._decorator;

@ccclass
export default class BackgroundClass extends cc.Component {

    @property
    speed: number = 50

    screenHeight: number;
    bgs: cc.Node[];  // 两个子节点

    onLoad () {
        this.screenHeight = cc.view.getCanvasSize().height;
        // this.bgs = this.getComponentInChildren("BackGround")  // 这个是得到 子节点中的组件
        this.bgs = this.node.children;  // 这个是 得到 子节点
    
    }

    start () {

    }

    update (dt) {
        // 两张图片同时向下移动
        this.bgs[0].y = this.bgs[0].y - this.speed * dt
        this.bgs[1].y = this.bgs[1].y - this.speed * dt
        // 已经将背景图锚点 设置为(0,0),pos设置为(0，0)了。所以这里方便判断
        if (this.bgs[0].y < -this.screenHeight) {
            // 背景图一旦移动超过屏幕，就将其 放入 另外一张背景图的上方
            this.bgs[0].y = this.bgs[1].y + this.bgs[1].height
        }
        if (this.bgs[1].y < -this.screenHeight) {
            this.bgs[1].y = this.bgs[0].y + this.bgs[0].height
        }
    }
}
