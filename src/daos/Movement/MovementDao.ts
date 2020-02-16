import { IMovement } from '@entities';

export interface IMovementDao {
    getAll: () => Promise<IMovement[]>;
    add: (user: IMovement) => Promise<void>;
    // update: (user: IMovement) => Promise<void>;
    // delete: (id: number) => Promise<void>;
}

export class MovementDao implements IMovementDao {

    /**
     *
     */
    public async getAll(): Promise<IMovement[]> {
        // TODO
        return [] as any;
    }

    /**
     *
     * @param user
     */
    public async add(user: IMovement): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param user
     * TODO
     */
    // public async update(user: IMovement): Promise<void> {
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
