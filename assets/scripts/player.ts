const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null 

    @property
    createBulletInterval: number = 0.5 

    screenWidth: number;
    screenHeight: number;

    onLoad() { // onLoad，不是onload，怪不得日志没有打印到
        this.screenWidth = cc.view.getCanvasSize().width;
        this.screenHeight = cc.view.getCanvasSize().height;
    }
    start () {
        // 鼠标/触摸 控制飞机
        this.listenAndMovePlane()
        // 定时器产生子弹
        this.schedule(this.createBullet, this.createBulletInterval)

    }
    listenAndMovePlane() {
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

    createBullet() {
        // 加载 子弹 的音效
        cc.resources.load("audio/bullet", cc.AudioClip, (error, res: cc.AudioClip) => {
            cc.audioEngine.playEffect(res, false)
        })
        // 实例化一个预制体（固定用法）
        let bullet = cc.instantiate(this.bulletPrefab)
        bullet.x = this.node.x
        bullet.y = this.node.y + this.node.height/2; 
        // 实例化出来的对象 放入到场景里
        bullet.setParent(cc.director.getScene())
    }
    
    // update (dt) {}
}
