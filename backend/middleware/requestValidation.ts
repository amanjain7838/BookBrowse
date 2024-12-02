import { validationResult, buildCheckFunction } from 'express-validator';
import {Request, Response, NextFunction } from 'express';
const checkQuery = buildCheckFunction(['query']);

class RequestValidation {
    validateGetBookQuery:any;

    constructor() {
        this.validateGetBookQuery = this.setValidateGetBookQuery();
    }

    public setValidateGetBookQuery() {
        return [
            checkQuery('q').exists(),
            checkQuery("start").optional().isNumeric(),
            checkQuery("limit").optional().isIn([5, 10, 20]).withMessage("Limit must be one of 5, 10, or 20.").toInt(),
        ];
    }

    public handleValidationError(req:Request, res:any, next:NextFunction){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (process.env.NODE_ENV == "production")
                return res.status(400)
                        .json({ status:400, 
                                message:'Request parameters validation failure.' 
                        });
            return res.status(400)
                    .json({ status:400, 
                            error: errors.mapped(),
                            message:'Request parameters validation failure.' 
                        });
        }
        next();
    }
}

export default (new RequestValidation());