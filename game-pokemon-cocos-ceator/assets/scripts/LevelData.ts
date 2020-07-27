import TileData from "./TileData";

export default class LevelData extends cc.ValueType {

    numOfColumn: number;		
    numOfRow: number;		
    numberOfTiles: number;		
    numberOfKind: number;		
    tilesPerKind: number;		
    scenario : number;
    tiles: TileData[][];		
    level:number;

    constructor(){
        super();
    }

    randomLevelData(level:number){
        // recomend 
        this.level = level;
        this.scenario = level % 6;
        this.numberOfKind = Math.min(18, 6 + level * 2);
        this.tilesPerKind = 4;
        this.numberOfTiles = this.numberOfKind * this.tilesPerKind;
        this.numOfColumn = 8;
        this.numOfRow = Math.round(this.numberOfTiles/this.numOfColumn);
        if((this.numberOfKind * this.tilesPerKind) != (this.numOfColumn * this.numOfRow)){
            console.log('WARNING (this.numberOfKind * this.tilesPerKind) != (this.row * this.column)');
        }
        if(this.tilesPerKind % 2 != 0){
            console.log('WARNING this.tilesPerKind is not even number')
        }

        this.tiles = new Array<Array<TileData>>();
        var arrayType = new Array<number>();
        for(var i = 0; i < this.numberOfKind; i ++){
            for(var j = 0; j < this.tilesPerKind; j++){
                arrayType.push(i);
            }
        }
        arrayType = this.shuffleArray(arrayType);

        var count = 0;
        for(var x = 0; x < this.numOfColumn; x++){
            var array = new Array<TileData>();
            for(var y = 0; y < this.numOfRow  && count < this.numberOfTiles; y++){
                var tile = new TileData(x,y, arrayType[count]);
                tile.detail(this.numOfRow, this.numOfColumn);
                array.push(tile);
                count++;
            }
            this.tiles.push(array);
        }
    }

    nextLevel(){
        this.randomLevelData(this.level + 1);
    }
    refreshLevel(){
        this.randomLevelData(this.level);
    }

    shuffleArray(array) {

        var currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array;
    }

    splice(a:TileData){
        if(this.tiles[a.x][a.y] != null){
            this.tiles[a.x][a.y].node.destroy();
            this.tiles[a.x][a.y] = null;
            this.numberOfTiles--;
        }
    }

    // refresh
    refreshByCurrentScenario(){
        this.refreshByScenario(this.scenario);
    }
    refreshByScenario(scenario : number){
        switch(scenario){
            case Scenario.FLOAT_TO_BOTTOM : {
                for(var x = 0; x < this.numOfColumn; x++){
                    var count = -1;
                    for(var y = 0; y < this.numOfRow; y++){
                        if(count < 0){
                            if(this.tiles[x][y] == null)
                            {
                                count = y;
                            }
                        }else if(count < y && this.tiles[x][y] != null)
                        {
                            this.tiles[x][count] = this.tiles[x][y];
                            this.tiles[x][y] = null;
                            this.tiles[x][count].updateData(x, count);
                            y = count;
                            count = -1;
                        }
                    }
                }
                break;
            }

            case Scenario.FLOAT_TO_TOP : {
                for(var x = 0; x < this.numOfColumn; x++){
                    var count = -1;
                    for(var y = this.numOfRow - 1; y >= 0; y--){
                        if(count < 0){
                            if(this.tiles[x][y] == null)
                            {
                                count = y;
                            }
                        }else if(count > y && this.tiles[x][y] != null)
                        {
                            this.tiles[x][count] = this.tiles[x][y];
                            this.tiles[x][y] = null;
                            this.tiles[x][count].updateData(x, count);
                            y = count;
                            count = -1;
                        }
                    }
                }
                break;
            }

            case Scenario.FLOAT_TO_LEFT : {
                for(var y = 0; y < this.numOfRow; y++){
                    var count = -1;

                    for(var x = 0; x < this.numOfColumn; x++){
                        if(count < 0){
                            if(this.tiles[x][y] == null)
                            {
                                count = x;
                            }
                        }else if(count < x && this.tiles[x][y] != null)
                        {
                            this.tiles[count][y] = this.tiles[x][y];
                            this.tiles[x][y] = null;
                            this.tiles[count][y].updateData(count, y);
                            x = count;
                            count = -1;
                        }
                    }
                }
                break;
            }

            case Scenario.FLOAT_TO_RIGHT : {
                for(var y = 0; y < this.numOfRow; y++){
                    var count = -1;

                    for(var x = this.numOfColumn-1; x >= 0 ; x--){
                        if(count < 0){
                            if(this.tiles[x][y] == null)
                            {
                                count = x;
                            }
                        }else if(count > x && this.tiles[x][y] != null)
                        {
                            this.tiles[count][y] = this.tiles[x][y];
                            this.tiles[x][y] = null;
                            this.tiles[count][y].updateData(count, y);
                            x = count;
                            count = -1;
                        }
                    }
                }
                break;
            }

            case Scenario.FLOAT_TO_BOTTOM_LEFT : {
                this.refreshByScenario(Scenario.FLOAT_TO_LEFT);
                this.refreshByScenario(Scenario.FLOAT_TO_BOTTOM);
                break;
            }
            
            default:
                break;
        }
    }

    // check earn
    canConsume(tile1, tile2) 
    {
        // check same z first
        if(tile1.z != tile2.z)
            return null;
        
        var array;
        if(tile1.x == tile2.x){
            array = this.checkLineX(tile1.y, tile2.y, tile1.x);
            if(array != null){
                return array;
            }
            array = this.checkRectX(tile1, tile2);
            if(array != null){
                return array;
            }
        }else if(tile1.y == tile2.y){
            array = this.checkLineY(tile1.x, tile2.x, tile1.y);
            if(array != null){
                return array;
            }
            array = this.checkRectY(tile1, tile2);
            if(array != null){
                return array;
            }
        }else{
            array = this.checkRectY(tile1, tile2);
            if(array != null){
                return array;
            }
            array = this.checkRectX(tile1, tile2);
            if(array != null){
                return array;
            }
        }
        return null;
    }

    checkRectX(data1, data2){
        var array1 = this.getPointInRow(data1);
        var array2 = this.getPointInRow(data2);
        for(var index in array1){
            var x = array1[index];
            if(array2.indexOf(x) >= 0 ){
                var array = this.checkLineX(data1.y, data2.y, x);
                if(array != null){
                    if(data1.y > data2.y){
                        if(data1.x != x)
                            array.push(new cc.Vec3(x,data1.y, data1.x > x? 5: 4));
                        if(data2.x != x)
                            array.push(new cc.Vec3(x,data2.y, data2.x > x? 3: 2));
                    }else{
                        if(data1.x != x)
                            array.push(new cc.Vec3(x,data1.y, data1.x > x? 3: 2));
                        if(data2.x != x)
                            array.push(new cc.Vec3(x,data2.y, data2.x > x? 5: 4));
                    }
                    array = array.concat(this.getLineX(data1.x, x, data1.y));
                    array = array.concat(this.getLineX(data2.x, x, data2.y));
                    return array;
                }
            }
        }
        return null;
    }

    checkRectY(data1, data2){
        var array1 = this.getPointInColumn(data1);
        var array2 = this.getPointInColumn(data2);
        for(var index in array1){
            var y = array1[index];
            if(array2.indexOf(array1[index]) >=0 ){
                var array = this.checkLineY(data1.x, data2.x, array1[index]);
                if(array != null){
                    if(data1.x < data2.x){
                        if(data1.y != y)
                            array.push(new cc.Vec3(data1.x, y, data1.y > y? 3: 5));
                        if(data2.y != y)
                            array.push(new cc.Vec3(data2.x, y, data2.y > y? 2: 4));
                    }else{
                        if(data1.y != y)
                            array.push(new cc.Vec3(data1.x, y, data1.y > y? 2: 4));
                        if(data2.y != y)
                            array.push(new cc.Vec3(data2.x, y, data2.y > y? 3: 5));
                    }
                    array = array.concat(this.getLineY(data1.y, y, data1.x));
                    array = array.concat(this.getLineY(data2.y, y, data2.x));
                    return array;
                }
            }
        }
        return null;
    }
    checkLineX(y1, y2, x){
        if(y1 == y2)
            return null;
        var min = Math.min(y1, y2);
        var max = Math.max(y1, y2);
        for (var y = min + 1; y < max; y++) {
            if ((x < 0 || x >= this.numOfColumn ) == false && this.tiles[x][y] != null) {
                return null;
            }
        }
        return this.getLineY(y1,y2,x);
    }
    checkLineY(x1, x2, y)
    {
        if(x1 == x2){
            return null;
        }
        var min = Math.min(x1, x2);
        var max = Math.max(x1, x2);
        for (var x = min + 1; x < max; x++) {
            if ((y < 0 || y >= this.numOfRow) == false && this.tiles[x][y] != null) {
                return null;
            }
        }
        return this.getLineX(x1,x2,y);
    }
    getPointInColumn(data){
        var array = [data.y];
        var i;
        for(i = data.y-1; i >= -1; i--){
            if(i == -1 || this.tiles[data.x][i] == null){
                array.push(i);
            }else{
                break;
            }
        }

        for(i = data.y+1; i<= this.numOfRow; i++){
            if(i == this.numOfRow || this.tiles[data.x][i] == null){
                array.push(i);
            }else{
                break;
            }
        }

        return array;
    }
    getLineX(x1, x2, y){
        var min = Math.min(x1, x2);
        var max = Math.max(x1, x2);
        var array = new Array<cc.Vec3>(); 
        for (var x = min + 1; x < max; x++) {
            array.push(new cc.Vec3(x,y, 0));
        }
        return array;
    }
    getLineY(y1, y2, x){
        var min = Math.min(y1, y2);
        var max = Math.max(y1, y2);
        var array = new Array<cc.Vec3>(); 
        for (var y = min + 1; y < max; y++) {
            array.push(new cc.Vec3(x,y, 1));
        }
        return array;
    }

    getPointInRow(data){
        var array = [data.x];
        var i;
        for(i = data.x-1; i >= -1; i--){
            if(i == -1 || this.tiles[i][data.y] == null){
                array.push(i);
            }else{
                break;
            }
        }

        for(i = data.x+1; i<= this.numOfColumn; i++){
            if(i == this.numOfColumn || this.tiles[i][data.y] == null){
                array.push(i);
            }else{
                break;
            }
        }
        return array;
    }

    checkAvalible(){
        var array = new Array();
        for(var i = 0; i < this.tiles.length; i++)
        {
            for(var j = 0; j  < this.tiles[i].length; j++){
                if(this.tiles[i][j] != null){
                    array.push(this.tiles[i][j]);
                }
            }
        }
        
        for(var i = 0; i < array.length; i++){
            for(var j = 0; j < array.length; j++){
                if(i != j){
                    if(array[i].z == array[j].z){
                        if(this.canConsume(array[i], array[j]) != null){
                            return [array[i], array[j]];
                        }
                    }
                }
            }
        }
        return null;
    }

    makeAvalible(){
        var result = false;
        while(this.checkAvalible() == null){
            result = true;
            this.shuffleTiles();
        }
        return result;
    }
    shuffleTiles(){

        console.log('shuffleTiles');
        var array = new Array();
        for(var i = 0; i < this.tiles.length; i++)
        {
            for(var j = 0; j  < this.tiles[i].length; j++){
                if(this.tiles[i][j] != null){
                    array.push(this.tiles[i][j]);
                }
            }
        }

        var currentIndex = array.length, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            if(randomIndex != currentIndex){
                // And swap it with the current element.
                var temporaryZ = array[currentIndex].z;
                this.tiles[array[currentIndex].x][array[currentIndex].y].updateSprite(array[randomIndex].z);
                this.tiles[array[randomIndex].x][array[randomIndex].y].updateSprite(temporaryZ);
            }
        }
    }
}


var Scenario = {
    NORMAL : 0,
    FLOAT_TO_BOTTOM : 1,
    FLOAT_TO_TOP : 2,
    FLOAT_TO_LEFT : 3,
    FLOAT_TO_RIGHT : 4,
    FLOAT_TO_BOTTOM_LEFT : 5,
}