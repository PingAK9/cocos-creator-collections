
cc.Class({
    extends: cc.Component,

    properties: {
        popupQuit:{
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log(window.location.href);
        var search = this.getUrlVars();
        console.log(search);
        window.localize.languge = search['lang'] == null? 'vi' : search['lang'];
        window.config.max_score = search['max_score'] == null? 5 : Number(search['max_score']);
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

    onClickClose(){
        this.popupQuit.active = true;
    },
    
    callGameComplete(score){
        callGameComplete(score);
    }
});
