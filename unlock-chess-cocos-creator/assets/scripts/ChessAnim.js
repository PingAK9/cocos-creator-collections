
cc.Class({
    extends: cc.Component,

    properties: {
        hint:{
            default: null,
            type: cc.Node
        },
        chessAnim:{
            default: null,
            type: cc.Animation
        },
        btnChess:{
            default: null,
            type: cc.Button
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.onShow();
    },

    start () {

    },

    // update (dt) {},

    onShow(){
        this.chessAnim.node.active = true;
        this.chessAnim.play('chess_appear');
        this.hint.active = false;
        this.btnChess.interactable = false;
        setTimeout(() => {
            this.btnChess.interactable = true;
            this.hint.active = true;
        }, 1000);
    },
    
    onWrong(){
        this.chessAnim.play('wrong');
        this.btnChess.interactable = false;
        setTimeout(() => {
            this.btnChess.interactable = true;
        }, 1000);
    }

});
