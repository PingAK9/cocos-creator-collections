
cc.Class({
    extends: cc.Component,

    properties: {
        labels: {
            default: [],
            type: [cc.Label],
        },
        guide:{
            default: null,
            type: cc.Node
        },
        keyBoard:{
            default: null,
            type: cc.Node
        },
        touchAudio:{
            default: null,
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onEnable () {
        this.string = [];
        this.updateString();

        this.guide.scaleX = 0.0;
        this.guide.scaleY = 0.0;
        this.guide.runAction(cc.scaleTo(0.5, 1, 1).easing(cc.easeBackOut()));
    },

    onClose(){
        cc.audioEngine.playEffect(this.touchAudio, false);
        this.guide.runAction(cc.scaleTo(0.25, 0, 0).easing(cc.easeQuadraticActionOut()));
        setTimeout(() => {
            this.node.active = false;
        }, 250);
    },

    onLoad () {
    },

    addNumber(event, customEventData){
        cc.audioEngine.playEffect(this.touchAudio, false);
        var value = String(customEventData);
        console.log('addNumber: ' + value);
        if(this.string.length < this.labels.length){
            this.string.push(value);
        }
        this.updateString();
    },

    removeLast(){
        cc.audioEngine.playEffect(this.touchAudio, false);
        if(this.string.length > 0){
            this.string.pop();
        }
        this.updateString();
    },

    updateString(){
        console.log('datas: ');
        console.log(this.string);
        console.log('labels: ');
        console.log(this.labels);

        for(var i = 0; i < this.labels.length; i++){
            if(i < this.string.length){
                this.labels[i].string = this.string[i];
            }else{
                this.labels[i].string = '_';
            }
        }
    },

    getString(){
        var _string = '';
        for(var i = 0; i < this.string.length; i++){
            _string+=this.string[i];
        }
        return _string;
    },

    start () {

    },

    // update (dt) {},
});
