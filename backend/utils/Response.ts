interface SuccessObject {
    status: number;
    message: string;
    data: Object;
}
interface ErrorObject {
    message: string;
    stack: any;
    trace: any;
    fileName: any;
    lineNumber: any;
}
interface ErrorResponse {
    status:number;
    message:string;
    data:Object;
    error:any;
    trace:any;
    file:any;
    line:any;
}
interface validateErrorResponse {
    status:number;
    message:string;
    data:Object;
}
class Response {
    /**
     * Standard success response
     */
    static success : SuccessObject =   {   
                                    status:200,
                                    message:"Success",
                                    data:""
                                };
    /**
     * Standard error response
     */
    static error : ErrorResponse = {   
                                status:500,
                                message:"Failed",
                                data:{},
                                error:"",
                                trace:"",
                                file:"",
                                line:""
                            };

    /**
     * Standard Validate Error response
     */
    static validateError : validateErrorResponse =   {
        status:200,
        message:"error",
        data:""
    };
    
    /**
     * Set success response
     */
    static setSuccessResponse(data:Object):Object {
        Response.success["data"] = data;
        return Response.success; 
    }

    /**
     * Set error response
     */
    static setFailureResponse(err:ErrorObject):any {
        if(process.env.NODE_ENV == "production")
            return Response.error;
        if (typeof err == "string")
            Response.error["error"] = err;
        else {
            Response.error["error"] = err.message;
            Response.error["trace"] = err.stack;
            Response.error["file"] = err.fileName;
            Response.error["line"] = err.lineNumber;
        }

        return Response.error;    
    }

    /**
     * Set validate response
     */
    static setValidateErrorResponse(errorcode:number,data:Object):Object {
        Response.validateError["data"] = data;
        Response.validateError["status"] = errorcode;
        return Response.validateError;
    }
}

export default Response;