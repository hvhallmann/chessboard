interface IMovementService {
  getNextKnightMove: () => Array<object>;
}
export interface IMovement {
  x: number,
  y: number,
  iteration?: number,
}

export default class MovementService implements IMovementService {
  private positionMap:IMovement = {x: 0, y: 0};
  constructor(position:string | IMovement) {
    if (typeof position === 'string') {
      this.positionMap.x = this.positionToNumber(position);
      this.positionMap.y = parseInt(position[1], 10);
      this.positionMap.iteration = 1;
    } else {
      this.positionMap.x = position.x;
      this.positionMap.y = position.y;
      this.positionMap.iteration = 2;
    }
  }
  private getX = () => this.positionMap.x;
  private getY = () => this.positionMap.y;
  private getIteration = () => this.positionMap.iteration;
  
  private positionToNumber(position: string): number {
    return position.charCodeAt(0) - 64;
  }

  private getMovimentTop(odd:boolean): IMovement {
    const tempPosition:IMovement = {x: 0, y:0};
    tempPosition.iteration = this.getIteration();
    if (odd) {
      tempPosition.x = this.getX() + 1;
    } else {
      tempPosition.x = this.getX() - 1;
    }
    tempPosition.y = this.getY() + 2;
    return tempPosition;
  }
  private getMovimentBottom(odd:boolean): IMovement {
    const tempPosition:IMovement = {x: 0, y:0};
    tempPosition.iteration = this.getIteration();
    if (odd) {
      tempPosition.x = this.getX() + 1;
    } else {
      tempPosition.x = this.getX() - 1;
    }
    tempPosition.y = this.getY() - 2;
    return tempPosition;
  }

  private getMovimentLeft(odd:boolean): IMovement {
    const tempPosition:IMovement = {x: 0, y:0};
    tempPosition.iteration = this.getIteration();
    tempPosition.x = this.getX() - 2;
    if (odd) {
      tempPosition.y = this.getY() + 1;
    } else {
      tempPosition.y = this.getY() - 1;
    }
    return tempPosition;
  }
  private getMovimentRight(odd:boolean): IMovement {
    const tempPosition:IMovement = {x: 0, y:0};
    tempPosition.iteration = this.getIteration();
    tempPosition.x = this.getX() + 2;
    if (odd) {
      tempPosition.y = this.getY() + 1;
    } else {
      tempPosition.y = this.getY() - 1;
    }
    return tempPosition;
  }

  private positionToNumeric(position: IMovement): number {
    return parseInt(`${position.x}${position.y}`, 10);
  }
  private isValidMovement(position: IMovement) {
    const value = this.positionToNumeric(position);
    if (value > 88 || value < 11) return false;
    if(position.x === 0 || position.y === 0) return false;
    return true;
  }

  public getNextKnightMove(): Array<IMovement> {
    const result = [];
    result.push(this.getMovimentTop(false));
    result.push(this.getMovimentTop(true));
    result.push(this.getMovimentBottom(false));
    result.push(this.getMovimentBottom(true));

    result.push(this.getMovimentLeft(false));
    result.push(this.getMovimentLeft(true));
    result.push(this.getMovimentRight(false));
    result.push(this.getMovimentRight(true));

    const answer = result.filter(item => this.isValidMovement(item))
    
    return answer;
  }
}