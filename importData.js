const fetch = require("node-fetch");
const { Client } = require("@elastic/elasticsearch");

const client = new Client({ node: "http://localhost:9200" });

/*
TODO:
Inside this query
https://hacker-news.firebaseio.com/v0/user/whoishiring.json?print=pretty
you can see the latest releases of HN for whoishisring, 
 24342498,
24342497,
   24342496,
24038520,
24038519,
   24038518,
23702122,
23702121,
   23702120,
23379196,
23379195,
23379194,
23042618,
23042617,
23042616,
22749308,
22749307,
22749306,
22665398,

pelo email eu vi q 

the who wants to be hired is inside this query
- > so, september issue was > 24342496

-> august was > 24038518

-> julho foi > 23702120

Acredito q da pra dizer q vem 2 issues, o dos freelances, e os 2 who wants

no final do kids, da pra ver o title tambem, ali da para double check:
 "title": "Ask HN: Who wants to be hired? (September 2020)",

ENTAO, pega todos os ids, verifica e vai salvando oq ja foi salvo e verificado.

*/

const loadKids = (listKids) => {
  try {
    listKids.map(async (itemid) => {
      return fetch(
        `https://hacker-news.firebaseio.com/v0/item/${itemid}.json?print=pretty`
      )
        .then((res) => res.json())
        .then((body) => {
          const { by } = body;
          console.log(`Got user id:${by} from parent`);
          return client.index({
            index: "who-wants-be-hired",
            body,
          });
        })
        .catch((err) => logger.error(`Failed at kid ${err.message}`, err));
    });
    return "OK loaded all kids";
  } catch (err) {
    console.log(err.message, err);
    return `fail loading kids at ${err}`;
  }
};

const setAsVisited = (id, title, time) => {
  const alreadyVisited = { id, title, time };
  // set as invalid
  return client.index({
    index: "control-release",
    body: alreadyVisited,
  });
};

const collectMonthlyRelease = (releaseId) => {
  try {
    return fetch(
      `https://hacker-news.firebaseio.com/v0/item/${releaseId}.json?print=pretty`
    )
      .then((res) => res.json())
      .then((body) => {
        const { id, kids, title, time } = body;

        if (title && title.includes("Who wants to be hired")) {
          const kidsResponse = loadKids(kids);
          console.log(
            `Got n:${kids.length} kids from parent, with release: ${releaseId}`
          ); // ${kidsResponse}
        } else {
          console.log(
            `releaseId ${releaseId} not a who wants to be hired group`
          );
        }

        setAsVisited(id, title, time);
      })
      .then((resp) => "OK")
      .catch(
        (err) => console.log(`Failed at parent ${err.message}`, err) && "Fail"
      );
  } catch (err) {
    console.log(err.message, err);
  }
};

const findElementIndex = async (index) => {
  const { body } = await client.search(
    {
      index: "control-release",
      body: {
        query: {
          match: {
            id: `${index}`,
          },
        },
      },
    },
    {
      ignore: [404],
      maxRetries: 3,
    }
  );
  return body.hits.hits;
};

const startSearch = async () => {
  try {
    return fetch(
      `https://hacker-news.firebaseio.com/v0/user/whoishiring.json?print=pretty`
    )
      .then((res) => res.json())
      .then(async (body) => {
        const { submitted } = body;

        try {
          const lookfor = submitted.slice(0, 10); //temp
          const newReleasesPromises = lookfor.map((element) =>
            findElementIndex(element)
          );
          const newReleases = await Promise.all(newReleasesPromises);
          newReleases.map(async (release, ind) => {
            if (release.length < 1) {
              console.log("going to check new release", lookfor[ind]);
              const submittedResponse = await collectMonthlyRelease(
                lookfor[ind]
              );
              console.log("my response was", submittedResponse);
            } else {
              console.log("repeated release", lookfor[ind]);
            }
          });
        } catch (error) {
          console.log("error to start", error);
        }
        return "ok"; // response;
      })
      .then((resp) => "OK")
      .catch((err) => console.log(`Failed at parent ${err.message}`, err));
  } catch (err) {
    console.log(err.message, err);
  }
};

const start = async () => {
  try {
    const res = await startSearch();
    // const res = await findElementIndex(24342498);
    // const res = await setAsVisited(
    //   2391828,
    //   "Ask HN: Should we agree that this account will submit all Who is Hiring posts?",
    //   1301583414
    // );
    console.log("res", res);
  } catch (error) {
    console.error("failed to start", error);
  }
};

start();
