import Background from "./background";
import Bullet from "./Bullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    speed: number = 150;
    screenWidth: number;
    screenHeight: number;

    isDead: boolean = false;

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


    // 在cocosCreator中, bullet的tag是0, player的tag是1, enemy的tag是9
    onCollisionEnter(other) {
        if (!this.isDead) {
            if (other.tag == 0) {
                // 敌机销毁动画
                this.die()
                this.isDead = true
                // 增加计数器值.BackGround节点绑定了一个 background脚本，在Background脚本中定义了score
                let score = ++cc.find("BackGround").getComponent(Background).score;
                cc.find("BackGround/lblScore").getComponent(cc.Label).string = "得分：" + score
                // 子弹也销毁. getComponent可以传 脚本名。需要导入（import Bullet from "./Bullet";）
                // 这里的other就是碰撞对方，也就是子弹了
                other.getComponent(Bullet).die()
            }else if (other.tag = 1) { //碰到战机
                cc.game.pause()
                cc.find("BackGround").getComponent(cc.AudioSource).stop() // 关掉挂载的音效组件
                alert("游戏结束，充钱进入vip")
            }

        }
    }


    die() {
        // 播放爆炸音效
        cc.resources.load("audio/boom", cc.AudioClip, (error, res: cc.AudioClip) =>{
            cc.audioEngine.playEffect(res, false)
        })
        let destroyImgId = 1;
        // 敌机销毁动画. TODO: 以后使用动画帧
        this.schedule(() => {
            cc.resources.load(`images/explosion_${destroyImgId}`, cc.SpriteFrame, (error, res) => {
                if (error) {
                    console.log("失败了加载," , error);
                    return;
                }
                console.log(" resources load success !!!!!!")
                this.getComponent(cc.Sprite).spriteFrame = res

            })
            destroyImgId++
        }, 0.01, 17)
        // this.node.removeFromParent(true)
        // this.node.destroy()
    }

}
