import app from '@server';
import supertest from 'supertest';

import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { Response, SuperTest, Test } from 'supertest';
import { IMovement, Movement } from '@entities';
import { MovementDao } from '@daos';
import { pErr, paramMissingError } from '@shared';

describe('Movement Routes', () => {

    const movementPath = '/api/movements';
    const getMovementPath = `${movementPath}/all`;
    const getNextMovementPath = `${movementPath}/options`;

    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${getNextMovementPath}"`, () => {

      it(`should return a JSON object with all possible movements and a status code of "${OK}" if the
          request was successful.`, (done) => {

          agent.get(`${getNextMovementPath}/?selected=A1`)
              .end((err: Error, res: Response) => {
                  pErr(err);
                  expect(res.status).toBe(OK);
                  expect(res.body.length === 14).toBe(true);
                  expect(res.body.error).toBeUndefined();
                  done();
              });
      });
      it(`should return a fail message and a status code of "${BAD_REQUEST}" if the
          the input is wrong.`, (done) => {

          agent.get(`${getNextMovementPath}/?selected=A12`)
              .end((err: Error, res: Response) => {
                  pErr(err);
                  expect(res.status).toBe(BAD_REQUEST);
                  
                  expect(res.body.error).toBe('Selected only accepts inputs from A1 to H8');
                  done();
              });
      });

      it(`should return a fail message and a status code of "${BAD_REQUEST}" if the
          the input is missing.`, (done) => {

          agent.get(`${getNextMovementPath}/?selectez`)
              .end((err: Error, res: Response) => {
                  pErr(err);
                  expect(res.status).toBe(BAD_REQUEST);
                  
                  expect(res.body.error).toBe('At least one query string parameter ?selected, is required');
                  done();
              });
      });
    })

    describe(`"GET:${getMovementPath}"`, () => {

      it(`should return a JSON object with all the movements history and a status code of "${OK}" if the
          request was successful.`, (done) => {

          let movementG: IMovement = new Movement();
          movementG.position = 'g8';
          let movementB: IMovement = new Movement();
          movementG.position = 'b1';
          const movements = [
              movementG,
              movementB,
          ];

          spyOn(MovementDao.prototype, 'getAll').and.returnValue(Promise.resolve(movements));

          agent.get(getMovementPath)
              .end((err: Error, res: Response) => {
                  pErr(err);
                  expect(res.status).toBe(OK);
                  // Caste instance-objects to 'Movements' objects
                  const retMovs = res.body.movements.map((mov: IMovement) => {
                      return mov;
                  });
                  retMovs.forEach((element:Movement, ind:number) => {
                    expect(element.position).toEqual(movements[ind].position);
                  });
                  expect(res.body.error).toBeUndefined();
                  done();
              });
      });
    })
});
