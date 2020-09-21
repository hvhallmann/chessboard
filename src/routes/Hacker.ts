import { MovementDao } from "@daos";
import MovementActions from "../services/MovementActions";
import { logger } from "@shared";
import { Request, Response, Router, Express } from "express";
import fetch from "node-fetch";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { paramMissingError } from "@shared";

import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: "http://localhost:9200" });

// Init shared
const router = Router();
const movementDao = new MovementDao();

/******************************************************************************
 *                      Get All movements - "GET /api/movement/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  try {
    return fetch("https://github.com/")
      .then((res: any) => res.text())
      .then((body: any) => res.status(OK).json(body));
    // .then(body => console.log(body));
    // return res.status(OK).json({hello: 'world'});
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

const loadKids = (listKids: [string]) => {
  try {
    listKids.map(async (itemid) => {
      return fetch(
        `https://hacker-news.firebaseio.com/v0/item/${itemid}.json?print=pretty`
      )
        .then((res: any) => res.json())
        .then((body: any) => {
          const { by } = body;
          logger.info(`Got user id:${by} from parent`);
          return client.index({
            index: "who-wants-be-hired",
            body,
          });
        })
        .catch((err) => logger.error(`Failed at kid ${err.message}`, err));
    });
    return "OK loaded all kids";
  } catch (err) {
    logger.error(err.message, err);
    return `fail loading kids at ${err}`;
  }
};

router.get("/parent", async (req: Request, res: Response) => {
  try {
    return fetch(
      "https://hacker-news.firebaseio.com/v0/item/24038518.json?print=pretty"
    )
      .then((res: any) => res.json())
      .then((body: any) => {
        const { kids } = body;

        const kidsResponse = loadKids(kids);

        const response = `Got n:${kids.length} from parent, with result ${kidsResponse}`;
        return response;
      })
      .then((resp: string) => res.status(OK).json(resp))
      .catch((err) => logger.error(`Failed at parent ${err.message}`, err));
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

router.post("/elastic", async (req: Request, res: Response) => {
  try {
    await client.index({
      index: "game-of-thrones",
      body: {
        character: "Ned Stark",
        quote: "Winter is coming.",
      },
    });
    res.status(OK).json("done");
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

router.get("/elastic", async (req: Request, res: Response) => {
  try {
    const searchFor = req.query.searchfor;
    const { body } = await client.search({
      index: "who-wants-be-hired",
      body: {
        query: {
          match: {
            text: `${searchFor}`,
          },
        },
      },
    });
    logger.info(body.hits.hits);
    res.status(OK).json(body.hits.hits);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
