import { getConnection } from "typeorm";
import { IMovement, Movement } from '@entities';
import { logger } from '@shared';


export interface IMovementDao {
    getAll: () => Promise<Movement[]>;
    add: (position: string) => Promise<void>;
    // update: (position: string) => Promise<void>;
    // delete: (id: number) => Promise<void>;
}

export class MovementDao implements IMovementDao {

    /**
     *
     */
    public async getAll(): Promise<Movement[]> {
        try {
            const connection = await getConnection();
            let savedMovements: Movement[] = await connection.manager.find(Movement);
            return savedMovements;
            
        } catch (error) {
            logger.info(`Failure over movement database save: ${error.message}`);
            return [];
        }
    }

    /**
     *
     * @param position
     */
    public async add(position: string): Promise<void> {
        try {
            const connection = await getConnection();
            let movement: IMovement = new Movement();
            movement.position = position;
            await connection.manager.save(movement);
            logger.info(`Movement has been saved: ${position}`);
            
        } catch (error) {
            logger.info(`Failure over movement database save: ${error.message}`);
        }
    }

    /**
     *
     * @param position
     * TODO
     */
    // public async update(position: IMovement): Promise<void> {
    //     return {} as any;
    // }

    /**
     *
     * @param id
     * TODO
     */
    // public async delete(id: number): Promise<void> {
    //     return {} as any;
    // }
}
