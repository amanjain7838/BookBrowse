import { NextFunction, Request, Response } from "express";
import BookModule from '../../module/BookModule';
import ApiResponse from '../../utils/Response';

export default class BookController {
	bookModule;
	constructor(){
		this.bookModule = new BookModule();
	}

	public async getBooksByQuery(req:Request,res:Response,next:NextFunction){
        this.bookModule.searchBooksList(req).then(books => {
            const start = Date.now();
            const responseTime = Date.now() - start;
            const statistics = this.bookModule.calculateStatistics(books.data.books, books.data.totalResults);

            return res.status(books.status).json({
                books: books.data.books,
                statistics: { ...statistics, responseTime },
            });
        }).catch(err => ApiResponse.setFailureResponse(err))
	}
}