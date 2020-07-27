
cc.Class({
    extends: cc.Component,

    properties: {
        datas: {
            default:[],
            type: [cc.Vec3]
        },

        wheel: {
            default: null,
            type: cc.Node
        },

        btnSpin : {
            default: null,
            type: cc.Button
        },
        touchAudio : {
            default: null,
            type: cc.AudioSource
        },
        rotateDuration : 2.5,
    },

    // LIFE-CYCLE CALLBACKS:

    init (game) {
        this.game = game;
    },
    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, function (event) {
            onLuckyWheel();
          }, this);
    },

    // start () {},

    // update (dt) {},

    getRandom(){
        var total = 0;
        for (var i in this.datas) {
            total += this.datas[i].y;
        }
        var d = Math.random() * total;
        for (var i in this.datas) {
            if((d -= this.datas[i].y) < 0) 
                return this.datas[i];
        }
        return this.datas[this.datas.length - 1];
    },

    onLuckyWheel(){
        this.data = this.getRandom();
        console.log('random data');
        console.log(this.data);
        this.wheel.rotation = this.wheel.rotation % 360;
        this.btnSpin.interactable = false;
        var anim = cc.rotateTo(this.rotateDuration, this.data.z - (360 * 10)).easing(cc.easeQuarticActionOut());
        this.wheel.runAction(anim);
        this.touchAudio.play();
        setTimeout(() => {
            this.touchAudio.stop();
            this.onLuckyWheelFinish();
        }, this.rotateDuration * 1000 - 1000);
       
    },

    onLuckyWheelFinish(){
        // this.btnSpin.interactable = true;
        setTimeout(() => {
            this.game.callGameComplete(this.data.x);
        }, 1000);
    }
});
