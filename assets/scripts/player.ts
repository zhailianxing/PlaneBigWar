const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    screenWidth: number;
    screenHeight: number;

    onLoad() { // onLoad，不是onload，怪不得日志没有打印到
        this.screenWidth = cc.view.getCanvasSize().width;
        this.screenHeight = cc.view.getCanvasSize().height;
    }
    start () {

        //监听触摸事件
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) =>{
            // 鼠标移动到哪里,飞机位置就设置到那里
            this.node.setPosition(e.getLocation())
            // 不让飞机半个身体处在屏幕外.
            if (this.node.x < this.node.width / 2) {
                this.node.x = this.node.width / 2
            }else if (this.node.x >= this.screenWidth - this.node.width/2) {
                this.node.x = this.screenWidth - this.node.width/2
            }
            if (this.node.y > this.screenHeight - this.node.height/2) {
                this.node.y = this.screenHeight - this.node.height/2
            }else if (this.node.y <  this.node.height / 2) {
                this.node.y = this.node.height/2
            }
        })
    }

    // update (dt) {}
}
