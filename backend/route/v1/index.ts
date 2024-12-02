import {Request, Response, NextFunction, Router} from 'express';
import BooksController from '../../controller/v1/BookController';
import RequestValidation from '../../middleware/requestValidation';

export default class IndexRoute{

    public router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes() {

        this.router.get('/api/books', 
        RequestValidation.validateGetBookQuery,
        RequestValidation.handleValidationError,
        (req: Request, res: Response, next: NextFunction)=>new BooksController().getBooksByQuery(req,res,next));
    }

}