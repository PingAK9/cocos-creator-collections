export default class TileData extends cc.ValueType {		
    /**
    !#en
    Constructor
    see {{#crossLink "cc/vec3:method"}}cc.v3{{/crossLink}}
    !#zh
    构造函数，可查看 {{#crossLink "cc/vec3:method"}}cc.v3{{/crossLink}}
    @param x x
    @param y y
    @param z z 
    */
    constructor(x: number, y: number, z: number){
        super();
        this.x=x;
        this.y=y;
        this.z=z;
    }

    x: number;		
    y: number;		
    z: number;
    numOfRow: number;
    numOfColumn: number;
    node: cc.Node;	
    
    detail(numOfRow:number, numOfColumn:number){
        this.numOfColumn = numOfColumn;
        this.numOfRow = numOfRow;
    }

    updateData(x:number, y:number){
        this.x=x;
        this.y=y;
        this.node.getComponent('Tile').updateData(this);
    }
    
    updateSprite(z:number){
        this.z=z;
        this.node.getComponent('Tile').updateSprite(this);
    }

    spawnNode(node: cc.Node, game){
        this.node = node;
        node.getComponent('Tile').init(game, this, this.numOfRow, this.numOfColumn);
    }
}