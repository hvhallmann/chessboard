
export interface IMovement {
  id?: number;
  movementName: string;
  timestamp: Date;
}

export class Movement implements IMovement {

  public id?: number;
  public movementName: string;
  public timestamp: Date;

  constructor(movementOrClass: string | IMovement) {
      if (typeof movementOrClass === 'string') {
          this.movementName = movementOrClass;
          this.timestamp = new Date();
      } else {
          this.movementName = movementOrClass.movementName;
          this.timestamp = new Date();
      }
  }
}
