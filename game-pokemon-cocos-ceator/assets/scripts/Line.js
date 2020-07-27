
cc.Class({
    extends: cc.Component,

    properties: {
        top: {
            default: null,
            type: cc.Node,
        },
        bottom: {
            default: null,
            type: cc.Node,
        },
        left: {
            default: null,
            type: cc.Node,
        },
        right: {
            default: null,
            type: cc.Node,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init (data, numOfColumn, numOfRow) {

        var posX = (data.x - (numOfColumn/2) + 0.5) * 60;
        var posY = (data.y - (numOfRow/2) + 0.5) * 80;
        this.node.setPosition(posX, posY);

        switch(data.z){
            case LineDirection.VERTICAL:
                this.top.active = true;
                this.bottom.active = true;
                break;
            case LineDirection.HORIZONTAL:
                this.left.active = true;
                this.right.active = true;
                break;
            case LineDirection.TOP_LEFT:
                this.top.active = true;
                this.left.active = true;
                break;
            case LineDirection.TOP_RIGHT:
                this.top.active = true;
                this.right.active = true;
                break;
            case LineDirection.BOTTOM_LEFT:
                this.bottom.active = true;
                this.left.active = true;
                break;
            case LineDirection.BOTTOM_RIGHT:
                this.bottom.active = true;
                this.right.active = true;
                break;
        }
    },

    // update (dt) {},
});
var LineDirection = {
    HORIZONTAL: 0,
    VERTICAL: 1,
    TOP_LEFT: 2,
    TOP_RIGHT: 3,
    BOTTOM_LEFT: 4,
    BOTTOM_RIGHT: 5,
  }