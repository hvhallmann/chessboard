# chessboard-api

## Introduction

This api is made to provide data for the chessboard frontend; it was made basically with [express.js](https://expressjs.com/), [typescript](https://www.typescriptlang.org/) and [typeorm](https://typeorm.io/#/);

### Organization

The server will start on the file src/index.js and will load Server.ts right away. From there, it will setup some basic settings on express and instantiate server routes on **/routes** folder, this folder will contain all the routes that are served;

From the routes the system can use two approaches, if it is a simple CRUD operation, goes directly on entity DAO - Data Access Object, abstract interface for data persistence mechanism - to perform operations, like, Create, Read, Update or delete; This DAO allows not exposure of database and it is easier to mock database for tests. It is locate on **/daos** folder and is closely linked with **/entities** for database implementation with typeorm

Another approach from routes is to serve complex scenarios, like the horse movement, on this case, a service layer(**/services**) is utilized. The service layer is like a middleware to complex entities. So, the service MovementActions works like a layer that receive a position map(like Cartesian coordinate system) and will ask for another layer(MovementHandler) to calculate the results of horse next movements. You can also construct MovementHandler will Algebraic notation ( chess position system like, A2, C4, H8).

The Service Layer enables only one service for now, knight moves on the public method _getKnightMoves()_; This function will check for all possible moves that are available for the knight piece, following the input of current position provided by the route query string; Instead of doing the measures itself, it asks for the MovementHandler do it. So, once MovementHandler returns the result of possible knight moves, the Service Layer MovementAction will ask for another turn of knight moves; MovementHandler will bring back a list of positions map, with coordinates on property x and y.

#### Algorithm

The knight moves algorithm is basically a check for all the possible moves that a chess knight piece could make. If you are on Cartesian System, the piece can only move two squares horizontally and one square vertically. Since the chessboard has a small board size, it is easy and computation cheap to check for all valid moves inside the board, runing from top to down, then left, right. For the second turn, the idea is the same, grab the results from first run, and create another MovementHandler for each response, then you can ask for the next movement of each instantiated class. After you grab all results you can remove the ones that are outside of board limits, like negative numbers or bigger than H8(8,8);

##### installing local

npm install

##### running local

npm run start:dev

##### Database

This system is using Typeorm for its ORM layer, it is configured for postgres database and you have to setup the environment keys on the file
_development.env_ on /env folder.

#### Deploy

This system works with heroku, just _git push heroku master_ to follow its deployment on heroku

#### Using API

set database environments on nodemon.json .env property:
DATABASE_HOST
DATABASE_PORT
DATABASE_USER
DATABASE_PASSWORD
DATABASE_NAME

after starting with `npm run start:dev`
It sits after basic domain under 'api' path, hackker routes can be achieved at http://localhost:3030/api/hacker/all

#### hacker news design

Looking at latest hacker news release of who wants to be hired, you will get the link:
[august-hn](https://hacker-news.firebaseio.com/v0/item/24038518.json?print=pretty)

from that link, you can look at the kids of the body, the following response

```
{
  "by": "whoishiring",
  "descendants": 416,
  "id": 24038518,
  "kids": [
    24103624,
    24044698,
    24055870,
    24091931,
    ...
  ],
  "score": 357,
  "text": "Share your information if you are looking for work. Please use this format:<p><pre><code>  Location:\n  Remote:\n  Willing to relocate:\n  Technologies:\n  Résumé&#x2F;CV:\n  Email:\n</code></pre>\nReaders: please only email these addresses to discuss work opportunities.",
  "time": 1596466855,
  "title": "Ask HN: Who wants to be hired? (August 2020)",
  "type": "story"
}
```

those kids can be seen, as a single user posting his data on
[user-data](https://hacker-news.firebaseio.com/v0/item/24103624.json?print=pretty)

you will receive something like:

```
{
  "by": "jayhuang",
  "id": 24103624,
  "parent": 24038518,
  "text": "Location: Vancouver, Canada<p>Remote: Yes<p>Willing to relocate: Yes<p>Technologies: Javascript (React.js, React Native, jQuery, Backbone.js, Angular.js), HTML&#x2F;CSS, LESS&#x2F;SASS, Git&#x2F;SVN, Yarn&#x2F;Bower, Gulp&#x2F;Grunt, Jest&#x2F;Enzyme&#x2F;Selenium, RESTful APIs<p>Resume: <a href=\"https:&#x2F;&#x2F;www.dropbox.com&#x2F;s&#x2F;7f1ecrevl9ylob7&#x2F;focused on building a product (or products) users love, with minimal red tape. A team that works well with each other with little in the way of workplace politics, is passionate about what they&#x27;re building, alongside management and PMs that do their best to help the team and product succeed.",
  "time": 1597013403,
  "type": "comment"
}
```

Hacker News asks the following format to be respected:

```
Location:
Remote:
Willing to relocate:
Technologies:
Résumé/CV:
Email:
```

#### Running docker

docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.8.1

delete index with
DELETE http://localhost:9200/game-of-thrones

#### kibana

run with

> docker run --link vigorous_burnell:elasticsearch -p 5601:5601 kibana:7.8.1
> then go to
> http://localhost:5601/app/kibana

_to manage index_ go

Create Index Pattern
