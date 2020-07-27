
cc.Class({
    extends: cc.Component,

    properties: {

        groundPrefab: {
            default: [],
            type: [cc.Prefab]
        },
        effectNode: {
            default: [],
            type: [cc.Node]
        },
        groundRoot:{
            default: null,
            type: cc.Node
        },

        uiStart:{
            default:null,
            type:cc.Node
        },

        uiHud:{
            default:null,
            type:cc.Node
        },

        lixilabel:{
            default: null,
            type: cc.Label
        },
        chunglabel:{
            default: null,
            type: cc.Label
        },
        popupQuit:{
            default:null,
            type:cc.Node
        },
        popupWin:{
            default:null,
            type:cc.Node
        },
        heart:{
            default: [],
            type: [cc.Node]
        },
        tutorial:{
            default:null,
            type:cc.Node
        },
        diedAudio: {
            default: null,
            type: cc.AudioClip
        },
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    onLoad () {
        cc.view.enableRetina(true);
        cc.director.getPhysicsManager().enabled = true;
        console.log(window.location.href);
        var search = this.getUrlVars();
        console.log(search);
        window.localize.languge = search['lang'] == null? 'vi' : search['lang'];
        if(search['max_score'] != null){
            window.config.max_score = Number(search['max_score']);
        }
        window.game.game = this;
        this.uiStart.active = true;
        this.uiHud.active = false;
        window.game.heart = this.heart.length;
        this.setScore(0, 0);
        this.groundPool = [];
        for(var i = 0; i < this.groundPrefab.length; i++){
            var _obj = cc.instantiate(this.groundPrefab[i]);
            _obj.active =false;
            this.groundPool.push(_obj);
        }

    },

    getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    },

    setScore(chung, lixi){
        window.game.scoreChung=chung;
        window.game.scoreLixi=lixi;
        this.chunglabel.string = chung;
        this.lixilabel.string = lixi;
    },

    onClickStart(){
        this.uiStart.destroy();
        this.uiStart = null;
        this.uiHud.active = true;
        this.onStartGame();
    },
    onStartGame(){
        window.game.hero.init();
        window.game.state = 1;
        this.setScore(0, 0);
        for(var i in this.groundActive)
        {
            var _obj = this.groundActive[i];
            _obj.active = false;
            this.groundPool.push(_obj);
        }
        this.groundActive = [];
        this.currentIndex = 0;
        this.spawnGround();
    },

    spawnGround(){
        let _obj;
        var index = Math.round (Math.random() * (this.groundPool.length - 1));
        _obj = this.groundPool[index];
        this.groundPool.splice(index, 1);
        // console.log('pool ground: ' + index);
    
        // console.log(_obj);
        _obj.parent = this.groundRoot;
        _obj.getComponent('Enemy').init();
        this.groundActive.push(_obj);
    },

    despawnGround (ground) {
        for( var i = 0; i < this.groundActive.length; i++){ 
            if ( this.groundActive[i] == ground) {
                this.groundActive.splice(i, 1); 
                ground.active = false;
                // console.log('despawn ground: ' + _enemy.index);
                this.groundPool.push(ground);
                if(i < this.currentIndex){
                    this.currentIndex--;
                }
                return;
            }
         }
    },

    update (dt) {
        if(window.game.state == 1){
            if(window.game.speed < window.game.speedMax){
                window.game.speed+=dt*window.game.speedDamping;
            }
            // this.chunglabel.string = window.game.speed.toFixed(0);
            if(this.groundActive.length > 0){
                var lastObj = this.groundActive[this.groundActive.length - 1];
                if(lastObj.x < 0){
                    this.spawnGround();
                }
                if(this.groundActive[0].x < -800){
                    this.despawnGround(this.groundActive[0]);
                }
            }
            this.getPlayerDistance();
        }
    },

    getPlayerDistance: function () {
        var _hero = window.game.hero;
        var playerPos = _hero.getCenterPos();
        var _enemyNode = this.groundActive[this.currentIndex];
        if((_enemyNode.x - _hero.node.x) < -200){
            this.currentIndex++;
        }else{
            var dist = _enemyNode.position.sub(playerPos).mag();
            // console.log(dist.toFixed(0));
            var _enemy = _enemyNode.getComponent('Enemy');
            if(dist < _enemy.height){
                if(_enemy.index < 2){
                    if(_enemy.index == 0){
                        this.setScore(window.game.scoreChung, window.game.scoreLixi+1);
                    }else{
                        this.setScore(window.game.scoreChung + 1, window.game.scoreLixi);
                    }
                    this.spamScoreEffect(_enemy.index, _enemyNode.position);
                    cc.audioEngine.playEffect(this.scoreAudio);
                    this.despawnGround(_enemyNode);
                    if((window.game.scoreChung + window.game.scoreLixi) >= window.game.score_over){
                        this.gameOver();
                    }
                }else{
                    cc.audioEngine.playEffect(this.diedAudio);
                    this.gameOver();
                }
            }
        }
    },
    
    spamScoreEffect(index, pos){
        var _obj = this.effectNode[index];
        _obj.active=true;
        _obj.position = pos;
        _obj.scale = cc.v2(1,1);
        _obj.runAction(cc.moveTo(0.5, pos.x, pos.y + 100).easing(cc.easeBackOut()));
        _obj.runAction(cc.scaleTo(0.5, 0, 0).easing(cc.easeBackOut()));
        setTimeout(() => {
            _obj.active = false;
        }, 500);
    },

    gameOver(){
        window.game.heart--;
        for(var i = 0; i < this.heart.length; i++){
            if(i< window.game.heart){
                this.heart[i].color = new cc.Color(255, 0, 0,255);
            }else{
                this.heart[i].color = new cc.Color(230, 230, 230,255);
            }
        }
        window.game.state = -1;
        window.game.hero.node.active = false;
        var newScore = window.game.scoreChung + window.game.scoreLixi;
        if(window.game.high_score < newScore){
            window.game.high_score = newScore;
        }
        this.popupWin.active = true;
    },

    showTurorial(){
        this.tutorial.active = true;
    },
    finishTutorial(){
        this.tutorial.active = false;
    },
    onBack(){
        this.popupQuit.active = true;
    },
});
