import TileData from "./TileData";
import LevelData from "./LevelData";

var GameStatus = {
    NONE: 0,
    PLAY: 1,
    PAUSE: 2,
    OVER: 3,
  }

cc.Class({
    extends: cc.Component,

    properties: {
        status: 0, 

        root: {
            default: null,
            type: cc.Node,
        },

        pfTile: {
            default: null,
            type: cc.Prefab,
        },

        rootLine: {
            default: null,
            type: cc.Node,
        },

        pfLine: {
            default: null,
            type: cc.Prefab,
        },

        uiStart:{
            default: null,
            type : cc.Node,
        },

        uiLose:{
            default: null,
            type: cc.Node,
        },

        uiWin:{
            default: null,
            type: cc.Node,
        },

        uiPause:{
            default: null,
            type: cc.Node,
        },

        /// Time
        maxTime: 120,
        slideTime:{
            default: null,
            type: cc.Sprite,
        },

        /// Level
        lableLevel:{
            default: null,
            type: cc.Label,
        },

        lableScore:{
            default: null,
            type: cc.Label,
        },

        shuffle:{
            default: null,
            type: cc.Node,
        },
        shuffleLabel:{
            default: null,
            type: cc.Label,
        },
        hintLabel:{
            default: null,
            type: cc.Label,
        },
    },


    onLoad () {

    },

    start () {
        this.uiStart.active = true;
    },

    update (dt) {
        if(this.status == GameStatus.PLAY){
            this.currentTime += dt;
            this.slideTime.fillRange = 1 - this.currentTime /this.maxTime;
            if(this.currentTime > this.maxTime){
                this.showGameOver();
            }
        }
    },

    onStartGame(event)
    {
        console.log('start game');
        this.uiStart.active = false;
        this.uiLose.active = false;
        this.uiWin.active = false;
        this.uiPause.active = false;
        this.currentTime = 0;
        this.status = GameStatus.PLAY;

        this.score = 0;
        this.lableScore.string = this.score;

        this.shuffleCount = 3;
        this.shuffleLabel.string = this.shuffleCount;

        this.hintCount = 3;
        this.hintLabel.string = this.hintCount;

        this.clearBoard();
        this.levelData = new LevelData();
        this.levelData.randomLevelData(0);
        this.spawnTiles();
        
    },
    onShuffle(event){
        if(this.status != GameStatus.PLAY || this.isWait)
        {
            return;
        }
        if(this.shuffleCount > 0){
            this.levelData.shuffleTiles();
            this.levelData.makeAvalible();
            this.showShuffleEffect();
            this.shuffleCount--;
            this.shuffleLabel.string = this.shuffleCount;
        }
    },
    showShuffleEffect(){
        this.shuffle.active = true;
        setTimeout(() => {
            this.shuffle.active = false;
        }, 1500);
    },

    onHint(){
        if(this.status != GameStatus.PLAY || this.isWait)
        {
            return;
        }
        if(this.hintCount > 0){
            this.hintCount--;
            this.hintLabel.string = this.hintCount;
            this.hintTile = this.levelData.checkAvalible();
            console.log('on hint');
            console.log(this.hintTile);
            if(this.hintTile != null){
                for(var i = 0; i < this.hintTile.length; i++){
                    this.hintTile[i].node.getComponent('Tile').SetTileSelected(true);
                }
                setTimeout(() => {
                    for(var i = 0; i < this.hintTile.length; i++){
                        this.hintTile[i].node.getComponent('Tile').SetTileSelected(false);
                    }
                    this.hintTile = null;
                }, 1000);
            }
        }
    },

    spawnTiles(){
        console.log('spawnTiles: ' + this.levelData);
        this.lableLevel.string = 'Level: ' + (this.levelData.level + 1);
        for (var x = 0; x < this.levelData.tiles.length; x++) {
            for (var y = 0; y < this.levelData.tiles[x].length ; y++) {
                var newTile = cc.instantiate(this.pfTile);
                this.root.addChild(newTile);
                newTile.active = true;
                this.levelData.tiles[x][y].spawnNode(newTile, this);
            }
        }
    },

    nextLevel(event){
        
        console.log('Next level: ' + this.levelData.level);
        this.uiWin.active = false;
        this.currentTime = 0;
        this.status = GameStatus.PLAY;

        this.clearBoard();
        this.levelData.nextLevel();
        this.spawnTiles();
    },

    refreshLevel(event){
        console.log('Refresh level: ' + this.levelData.level);
        this.uiWin.active = false;
        this.uiLose.active = false;
        this.currentTime = 0;
        this.status = GameStatus.PLAY;

        this.clearBoard();
        this.levelData.refreshLevel();
        this.spawnTiles();
    },

    tileClickEvent(tile){

        if(this.status != GameStatus.PLAY || this.isWait)
        {
            return;
        }

        if(this.currentTile == null){
            this.currentTile = tile;
            tile.SetTileSelected(true);
        }else{
            if(this.currentTile != tile){
                // check earn here
                var array = this.levelData.canConsume(this.currentTile.data, tile.data);
                if(array != null){
                    tile.SetTileSelected(true);
                    this.spawnLineConsume(array);
                    this.isWait = true;
                    this.score += 1
                    this.lableScore.string = '' + this.score;
                    setTimeout(() => {
                        this.isWait = false;
                        this.consume(this.currentTile, tile);

                    }, 1000);
                    return;
                }
            }
            this.currentTile.SetTileSelected(false);
            this.currentTile = null;
        }
    },


    spawnLineConsume(array){
        if(this.lines != null){
            for(var i = 0; i < this.lines.length; i++){
                this.lines[i].destroy();
            }
        }
        this.lines = new Array();
        for(var i = 0; i < array.length; i++){
            var newTile = cc.instantiate(this.pfLine);
            this.rootLine.addChild(newTile);
            newTile.active = true;
            newTile.getComponent('Line').init(array[i], this.levelData.numOfColumn, this.levelData.numOfRow);
            this.lines.push(newTile);
        }
    },

    consume(tile_1, tile_2)
    {
        if(this.lines != null){
            for(var i = 0; i < this.lines.length; i++){
                this.lines[i].destroy();
            }
        }
        this.lines = null;
        this.currentTile = null;
        this.levelData.splice(tile_1.data);
        this.levelData.splice(tile_2.data);
        if (this.levelData.numberOfTiles <= 0)
        {
            this.showGameWin();
        }else{
            this.levelData.refreshByCurrentScenario();
            if(this.levelData.makeAvalible() ==  true){
                this.showShuffleEffect();
            }
        }
    },

    clearBoard(){
        this.isWait = false;
        this.currentTile = null;
        if(this.levelData != null){
            if(this.levelData.tiles != null){
                for (var x = 0; x < this.levelData.tiles.length; x++) {
                    for (var y = 0; y < this.levelData.tiles[x].length ; y++) {
                        if(this.levelData.tiles[x][y] != null){
                            this.levelData.tiles[x][y].node.destroy();
                        }
                    }
                }
                this.levelData.tiles = null;
            }
        }
    },

    showGameWin(){
        this.status = GameStatus.OVER;
        this.uiWin.active = true;
    },
    showGameOver(){
        this.status = GameStatus.OVER;
        this.uiLose.active = true;
    },

    backToStart(event){
        this.clearBoard();
        this.uiStart.active = true;
        this.uiLose.active = false;
        this.uiWin.active = false;
        this.uiPause.active = false;
    },

    onPause(event){
        if(this.status == GameStatus.PLAY){
            this.uiPause.active = true;
            this.status = GameStatus.PAUSE;
        }
    },
    onUnPause(envet){
        if(this.status == GameStatus.PAUSE){
            this.uiPause.active = false;
            this.status = GameStatus.PLAY;
        }
    }

});