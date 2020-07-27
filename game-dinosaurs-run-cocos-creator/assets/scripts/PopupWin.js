
cc.Class({
    extends: cc.Component,

    properties: {
        txtBiggy:{
            default: null,
            type: cc.Label
        },
        txtScoreLixi:{
            default: null,
            type: cc.Label
        },
        txtScoreChung:{
            default: null,
            type: cc.Label
        },
        guide:{
            default: null,
            type: cc.Node
        },
        btnReward:{
            default: null,
            type: cc.Node
        },
        btnRetryAndReward:{
            default: null,
            type: cc.Node
        },
        txtRetry:{
            default: null,
            type: cc.Label
        },
    },

    // onLoad () {},

    // update (dt) {},


    onEnable () {
        var newScore = window.game.scoreChung + window.game.scoreLixi;
        if(window.game.high_score < newScore){
            window.game.high_score = newScore;
        }
        console.log('Current Score: ' + window.game.high_score);
        this.biggy = this.caculationBiggy(window.game.high_score);
        this.txtBiggy.string = window.localize.textFormat('score_detail', [this.biggy]);
        this.txtScoreChung.string = window.game.scoreChung;
        this.txtScoreLixi.string = window.game.scoreLixi;
        this.guide.scaleX = 0.0;
        this.guide.scaleY = 0.0;
        this.guide.runAction(cc.scaleTo(0.5, 1, 1).easing(cc.easeBackOut(),),);
        if(this.biggy >= window.config.max_score || window.game.heart <= 0){
            this.btnRetryAndReward.active = false;
            this.btnReward.active = true;
        }else{
            this.btnRetryAndReward.active = true;
            this.btnReward.active = false;
            this.txtRetry.string = window.localize.textFormat('retry_turn', [window.game.heart]);
        }
    },

    caculationBiggy(score){
        var value = score * 200;
        return Math.min(window.config.max_score, value);
    },

    onReward(){
        this.node.active = false;
        callGameComplete(this.biggy);
    },
    onRetry(){
        this.guide.runAction(cc.scaleTo(0.25, 0, 0).easing(cc.easeQuadraticActionOut()));
        setTimeout(() => {
            this.node.active = false;
            window.game.game.onStartGame();
        }, 250);
    }
});
