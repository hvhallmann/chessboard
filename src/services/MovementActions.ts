import Movement, { IMovement} from './Movements';

interface IMovementActions {
  getKnightMoves: (position:string) => Array<object>;
}

export default class MovementActions implements IMovementActions {
  public getKnightMoves(position:string):Array<object> {
    const MovementClass = new Movement(position);
    
    //1st turn
    let finalResult: Array<IMovement> = MovementClass.getNextKnightMove();
    // 2nd turn
    const mapKnightMoves: Array<Movement> = finalResult.map((knightMov: IMovement) => new Movement(knightMov));
    mapKnightMoves.forEach(movement => {
        const result: Array<IMovement> = movement.getNextKnightMove();
        finalResult = finalResult.concat(result);
    });
    
    return finalResult;
  }
}