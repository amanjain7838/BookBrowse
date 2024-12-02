import dotenv from 'dotenv';
dotenv.config({ path: `./.env` });
import express from 'express';
import Routes from './route/index';
import cors from 'cors';

class Server{
    public static selfInstance:Server;
    public static app: express.Application;

    public static getInstance() {
        if(Server.selfInstance)
            return Server.selfInstance;
        console.log("server instance created");
        return new Server();
    }

    private constructor() {
        Server.app = express();
        this.init();
    }

    public init():void{
        this.loadMiddlewares();
        const routes = new Routes(Server.app);
    }

    private loadMiddlewares(): void{
        Server.app.use(express.json());
        Server.app.use(express.urlencoded({ extended: false }));
        var corsOptions = {
          origin: ["http://localhost:3001"]
        };
        Server.app.use(cors(corsOptions));
    }

    public getApp(): express.Application{
        return Server.app;
    }
}
export default Server.getInstance();