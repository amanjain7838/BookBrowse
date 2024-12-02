import V1IndexRoute from './v1/index';
import express from 'express';

export default class IndexRoute {
    constructor(app:express.Application){
        app.use('/v1',new V1IndexRoute().router);
    }
}