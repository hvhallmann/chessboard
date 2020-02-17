
import { MovementDao } from '@daos';
import MovementActions from '../services/MovementActions';
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '@shared';

// Init shared
const router = Router();
const movementDao = new MovementDao();

/******************************************************************************
 *                      Get All movements - "GET /api/movement/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    try {
        const movements = await movementDao.getAll();
        return res.status(OK).json({movements});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                      Get Movement Options - "GET /api/movements/options"
 ******************************************************************************/

router.get('/options', async (req: Request, res: Response) => {
    const messageError =  'Selected only accepts inputs from A1 to H8'
    try {
        const position: string = req.query && req.query.selected;
        logger.info(`Going to query horse movements from position: ${position}`);

        // validation
        if (!position) return res.status(BAD_REQUEST).json({ error: messageError });    
        if (position.length > 2) return res.status(BAD_REQUEST).json({ error: messageError });
        if(position.charCodeAt(0) < 65 || position.charCodeAt(0) > 72
            || position.charCodeAt(1) < 49 || position.charCodeAt(1) > 56
            ) {
            return res.status(BAD_REQUEST).json({ error: messageError });
        }

        // action
        const movementActions = new MovementActions()
        const finalResult = movementActions.getKnightMoves(position);

        logger.info(`Query horse movements ok with ${finalResult.length} positions`);
        
        return res.status(OK).json(finalResult);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});


/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
  try {
      const { movement } = req.body;
      if (!movement) {
          return res.status(BAD_REQUEST).json({
              error: paramMissingError,
          });
      }
      await movementDao.add(movement);
      return res.status(CREATED).end();
  } catch (err) {
      logger.error(err.message, err);
      return res.status(BAD_REQUEST).json({
          error: err.message,
      });
  }
});

export default router;