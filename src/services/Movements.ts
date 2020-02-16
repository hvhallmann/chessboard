interface IMovementService {
  getNextKnightMove: (position: string) => Array<object>;
}
interface IMovement {
  x: number,
  y: number
}

export default class MovementService implements IMovementService {
  private positionMap:IMovement = {x: 0, y: 0};
  constructor(position:string) {
    this.positionMap.x = this.positionToNumber(position);
    this.positionMap.y = parseInt(position[1], 10);
  }
  private getX = () => this.positionMap.x;
  private getY = () => this.positionMap.y;
  private isValidMove(position: number): boolean {
    return (position > 88 && position < 11)
  }
  private positionToNumber(position: string): number {
    return position.charCodeAt(0) - 64;
  }

  private getMovimentTop(odd:boolean): IMovement {
    const tempPosition:IMovement = {x: 0, y:0};
    if (odd) {
      tempPosition.x = this.getX() + 1;
    }
    tempPosition.x = this.getX() - 1;
    tempPosition.y = this.getY() + 2;
    return tempPosition;
  }
  private getMovimentBottom(odd:boolean): IMovement {
    const tempPosition:IMovement = {x: 0, y:0};
    if (odd) {
      tempPosition.x = this.getX() + 1;
    }
    tempPosition.x = this.getX() - 1;
    tempPosition.y = this.getY() - 2;
    return tempPosition;
  }

  private getMovimentLeft(odd:boolean): IMovement {
    const tempPosition:IMovement = {x: 0, y:0};
    tempPosition.x = this.getX() - 2;
    if (odd) {
      tempPosition.y = this.getY() + 1;
    }
    tempPosition.y = this.getX() - 1;
    return tempPosition;
  }
  private getMovimentRight(odd:boolean): IMovement {
    const tempPosition:IMovement = {x: 0, y:0};
    tempPosition.x = this.getX() + 2;
    if (odd) {
      tempPosition.y = this.getY() + 1;
    }
    tempPosition.y = this.getX() - 1;
    return tempPosition;
  }


  public getNextKnightMove(): Array<object> {
    const result = [];
    // const element = array[index];
    result.push(this.getMovimentTop(false));
    result.push(this.getMovimentTop(true));
    result.push(this.getMovimentBottom(false));
    result.push(this.getMovimentBottom(true));

    result.push(this.getMovimentLeft(false));
    result.push(this.getMovimentLeft(true));
    result.push(this.getMovimentRight(false));
    result.push(this.getMovimentRight(true));

    
    // const objRes: Array<object> = result.map(pos: Map => {
    //   const obj = pos.forEach((value: number, key: string) => ({key, value}))
    //   console.log('obj', obj);
      
    //   return obj;
    // })
    // console.log(objRes);

    return result;
  }
}