# chessboard-api

## Introduction

This api is made to provide data for the chessboard frontend; it was made basically with [express.js](https://expressjs.com/) and [typescript](https://www.typescriptlang.org/);

### Organization

The server will start on the file src/index.js and will load Server.ts right away. From there, it will usetup some basic settings on express and instantiate server routes on **/routes** folder, this folder will contain all the routes that are served;

From the routes the system can use two approaches, if it is a simple CRUD operation, goes directly on entity DAO - Data Access Object, abstract interface for data persistence mechanism - to perform operations, like, Create, Read, Update or delete; This DAO allow not exposure of database and it is easier to mock database for tests. It is locate on **/daos** folder and is closely linked with **/entities** for future database implementations;

Another approach from routes is to serve complex scenarios, like the horse movement, on this case, a service layer(**/services**) is utilized. The service layer is like a middleware to complex entities. So, the Movement Service works like a class that receive a position map(like Cartesian coordinate system) to instantiate. You can also construct it will Algebraic notation ( chess position system like, A2, C4, H8);

Once the Service Layer is available you can ask for the knight moves on the public method getNextKnightMove(); This function will check for all possible moves that are available for the knight piece, following the input of current position provided by the route query string; It will also run twice, to check for second turn knight moves; It will bring back a list of position map, with coordinates on property x and y.

#### Algorithm

The knight moves algorithm is basically a check for all the possible moves that a chess knight piece could make. If you are on Cartesian System, the piece can only move two squares horizontally and one square vertically. Since the chessboard has a small board size, it is easy and computation cheap to check for all valid moves inside the board, runing from top to down, then left, right. For the second turn, the idea is the same, grab the results from first run, and create another MovementService for each response, then you can ask for the next movement of each instantiated class. After you grab all results you can remove the ones that are outside of board limits, like negative numbers or bigger than H8;

##### installing local

npm install

##### running local

npm run start:dev
