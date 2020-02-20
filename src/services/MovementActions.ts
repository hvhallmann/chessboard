import MovementHandler, { IMovementHandler } from './MovementHandler';

interface IMovementActions {
  getKnightMoves: (position:string) => Array<object>;
}

export default class MovementActions implements IMovementActions {
  public getKnightMoves(position:string):Array<object> {
    const MovementClass = new MovementHandler(position);
    
    //1st turn
    let finalResult: Array<IMovementHandler> = MovementClass.getNextKnightMove();
    // 2nd turn
    const mapKnightMoves: Array<MovementHandler> = finalResult.map((knightMov: IMovementHandler) => new MovementHandler(knightMov));
    mapKnightMoves.forEach(movement => {
        const result: Array<IMovementHandler> = movement.getNextKnightMove();
        finalResult = finalResult.concat(result);
    });
    
    return finalResult;
  }
}