
cc.Class({
    extends: cc.Component,

    properties: {
    },

    init : function(game, data, row, column){
        this.game = game;
        this.enabled = true;
        this.row = row;
        this.column = column;
        
        this.updateData(data);
        this.updateSprite(data);
    },
    onLoad () {
        this.node.scaleX = 0.0;
        this.node.scaleY = 0.0;
        this.node.runAction(this.setJumpAction());
    },

    setJumpAction: function () {
        var squashDuration = Math.random() + 0.5;
        return cc.scaleTo(squashDuration, 1, 1).easing(cc.easeBackOut());
    },

    // start () {},

    // update (dt) {},

    updateData(data){
        this.data = data;
        var posX = (data.x - (this.column/2) + 0.5) * 60;
        var posY = (data.y - (this.row/2) + 0.5) * 80;
        this.node.setPosition(posX, posY);
    },

    updateSprite(data){
        this.data = data;

        var sprite = this.node.getComponent(cc.Sprite);		// access node's Sprite component
        cc.loader.loadRes("default/" + data.z + ".png", function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite));
    },

    OnTileClicked(event)
    {
        this.game.tileClickEvent(this);
    },

    SetTileSelected(selected)
    {
       this.node.opacity = selected?150:255;
    },
});
