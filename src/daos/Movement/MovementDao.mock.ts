import { IMovement } from '@entities';
import { getRandomInt } from '@shared';
import { MockDaoMock } from '../MockDb/MockDao.mock';
import { IMovementDao } from './MovementDao';

export class MovementDao extends MockDaoMock implements IMovementDao {

    public async getAll(): Promise<IMovement[]> {
        try {
            const db = await super.openDb();
            return db.movements;
        } catch (err) {
            throw err;
        }
    }

    public async add(movement: IMovement): Promise<void> {
        try {
            const db = await super.openDb();
            movement.id = getRandomInt();
            db.movements.push(movement);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }
}
