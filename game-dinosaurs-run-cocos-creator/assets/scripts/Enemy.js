
cc.Class({
    extends: cc.Component,

    properties: {
        height: 20,
        yy: 0,
        index: 0,
    },

    init(){
        var index = Math.random() * 3;
        this.node.setPosition(new cc.v2(window.game.speed * 1.8 + index * 50, this.yy));
        this.node.active = true;
    },

    update (dt) {
        if(window.game.state == 1){
            var newPos = this.node.x - window.game.speed * dt;
            this.node.setPosition(new cc.v2(newPos, this.yy));
        }
    },
});
