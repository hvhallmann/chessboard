# chessboard-api

## Introduction

This api is made to provide data for the chessboard frontend; it was made basically with [express.js](https://expressjs.com/), [typescript](https://www.typescriptlang.org/) and [typeorm](https://typeorm.io/#/);

### Organization

The server will start on the file src/index.js and will load Server.ts right away. From there, it will setup some basic settings on express and instantiate server routes on **/routes** folder, this folder will contain all the routes that are served;

From the routes the system can use two approaches, if it is a simple CRUD operation, goes directly on entity DAO - Data Access Object, abstract interface for data persistence mechanism - to perform operations, like, Create, Read, Update or delete; This DAO allows not exposure of database and it is easier to mock database for tests. It is locate on **/daos** folder and is closely linked with **/entities** for database implementation with typeorm

Another approach from routes is to serve complex scenarios, like the horse movement, on this case, a service layer(**/services**) is utilized. The service layer is like a middleware to complex entities. So, the service MovementActions works like a layer that receive a position map(like Cartesian coordinate system) and will ask for another layer(MovementHandler) to calculate the results of horse next movements. You can also construct MovementHandler will Algebraic notation ( chess position system like, A2, C4, H8).

The Service Layer enables only one service for now, knight moves on the public method *getKnightMoves()*; This function will check for all possible moves that are available for the knight piece, following the input of current position provided by the route query string; Instead of doing the measures itself, it asks for the MovementHandler do it. So, once MovementHandler returns the result of possible knight moves, the Service Layer MovementAction will ask for another turn of knight moves; MovementHandler will bring back a list of positions map, with coordinates on property x and y.

#### Algorithm

The knight moves algorithm is basically a check for all the possible moves that a chess knight piece could make. If you are on Cartesian System, the piece can only move two squares horizontally and one square vertically. Since the chessboard has a small board size, it is easy and computation cheap to check for all valid moves inside the board, runing from top to down, then left, right. For the second turn, the idea is the same, grab the results from first run, and create another MovementHandler for each response, then you can ask for the next movement of each instantiated class. After you grab all results you can remove the ones that are outside of board limits, like negative numbers or bigger than H8(8,8);

##### installing local

npm install

##### running local

npm run start:dev

##### Database

This system is using Typeorm for its ORM layer, it is configured for postgres database and you have to setup the environment keys on the file
*development.env* on /env folder.

#### Deploy

This system works with heroku, just *git push heroku master* to follow its deployment on heroku
