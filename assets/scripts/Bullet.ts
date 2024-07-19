const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    screenHeigth: number
    speed: number = 70

    onLoad() {
        this.screenHeigth = cc.view.getCanvasSize().height;
    }

    update (dt) {
        this.node.y = this.node.y + this.speed * dt;
        if (this.node.y > this.screenHeigth + this.node.height) {
            this.node.removeFromParent()
            this.node.destroy()
        }
    }
}
