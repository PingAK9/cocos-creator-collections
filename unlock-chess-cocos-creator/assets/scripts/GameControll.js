
cc.Class({
    extends: cc.Component,

    properties: {
        passcode: '',
        chess : {
            default: null,
            type: require('ChessAnim')
        },
        popupUnlock: {
            default: null,
            type: require('PopupUnlock')
        },
        popupQuit:{
            default: null,
            type: cc.Node
        },
        uiHome: {
            default: null,
            type: cc.Node
        },
        uiResult: {
            default: null,
            type: cc.Node
        },
        txtScore:{
            default: null,
            type: cc.Label
        },
        txtScoreDetail:{
            default: null,
            type: cc.Label
        },
        touchAudio:{
            default: null,
            type: cc.AudioClip
        },
        successAudio:{
            default: null,
            type: cc.AudioClip
        },
        wrongAudio:{
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log(window.location.href);
        var search = this.getUrlVars();
        console.log(search);
        window.localize.languge = search['lang'] == null? 'vi' : search['lang'];
        window.config.max_score = search['max_score'] == null? 5 : Number(search['max_score']);
        this.score = window.config.max_score;
    },

    getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    },

    start () {

    },

    // update (dt) {},

    onSoungClick(){
        cc.audioEngine.playEffect(this.touchAudio, false);
    },

    onClickChess(){
        this.popupUnlock.node.active = true;
    },

    onClosePopup(){
        this.popupUnlock.node.active = false;
    },
    onUnlock(){
        if(this.passcode == this.popupUnlock.getString()){
            this.popupUnlock.node.active = false;
            this.chess.onWrong();
            setTimeout(() => {
                this.onOpenChess();
            }, 1000);
        }else{
            this.popupUnlock.node.active = false;
            this.chess.onWrong();
            setTimeout(() => {
                cc.audioEngine.playEffect(this.wrongAudio, false);
                this.onClickChess();
            }, 1000);
        }
    },

    onOpenChess(){
        this.txtScore.string = this.score;
        this.txtScoreDetail.string = window.localize.textFormat('correct_des', [this.score.toString()]);
        this.uiHome.active = false;
        this.uiResult.active = true;
        cc.audioEngine.playEffect(this.successAudio, false);

    },

    onBack(){
        this.popupQuit.active = true;
    },
    onFinish(){
        callGameComplete(this.score);
    }
});
