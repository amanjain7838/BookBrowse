import axios from "axios";
import { Request } from "express";
import ApiResponse from '../utils/Response';
import { Book, FetchBooksResponse, Statistics } from "../interface/book";

export default class BookModule {

    public GOOGLE_BOOKS_API_URL = process.env.GOOGLE_BOOKS_API_URL as string;
    public GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;

    public async searchBooksList(req:Request) {
        const params: any = req.query;
        const maxResults:number = params.limit || 5;
        const startIndex:number = params.start || 1;
        
        try {
            const response = await axios.get(this.GOOGLE_BOOKS_API_URL, {
              params: {
                q: params.q,
                startIndex,
                maxResults,
                key: this.GOOGLE_API_KEY,
              },
            });
        
            const data = response.data;
        
            if (!data.items) {
                return ApiResponse.setSuccessResponse({
                    books:[],
                    totalResults: 0,
                });
            }
        
            const books: Book[] = data.items.map((item: any) => ({
              title: item.volumeInfo.title || null,
              authors: item.volumeInfo.authors || [],
              description: item.volumeInfo.description || null,
              publishedDate: item.volumeInfo.publishedDate,
            }));

            return ApiResponse.setSuccessResponse({
                books,
                totalResults: data.totalItems,
            });
          } catch (error: any) {
            return ApiResponse.setFailureResponse(error);
          }
    }


    public calculateStatistics = (books: Book[], totalResults: number): Statistics => {
        if (books.length === 0) {
            return {
                totalResults: 0,
                mostCommonAuthor: null,
                earliestPublication: null,
                latestPublication: null,
            };
        }
    
    
        const authorCount: Record<string, number> = {};
        books.forEach((book) => {
            book.authors.forEach((author) => {
                authorCount[author] = (authorCount[author] || 0) + 1;
            });
        });
        const mostCommonAuthor =
        Object.entries(authorCount).reduce((prev, current) =>
            current[1] > prev[1] ? current : prev
        )[0] || null;
    
        const publicationDates = books
        .map((book) => book.publishedDate)
        .filter(Boolean) // Remove undefined/null
        .map((date) => new Date(date!)) // Convert to Date object
        .filter((date) => !isNaN(date.getTime())); // Remove invalid dates
    
        const earliestPublication =
        publicationDates.length > 0
            ? publicationDates.reduce((a, b) => (a < b ? a : b)).toISOString().split("T")[0]
            : null;
    
        const latestPublication =
        publicationDates.length > 0
            ? publicationDates.reduce((a, b) => (a > b ? a : b)).toISOString().split("T")[0]
            : null;
    
        return {
            totalResults,
            mostCommonAuthor,
            earliestPublication,
            latestPublication,
        };
    };
}