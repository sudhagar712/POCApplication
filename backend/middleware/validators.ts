const { check, param, query } = require('express-validator');
import { body } from 'express-validator';




export const checkQuery = (id:any) => {
    return query(id, 'Missing  Query').isLength({ min: 1 })
        .trim()
        .exists()
}



export const checkParam = (id:any) => {
    return param(id, 'Missing Params').isLength({ min: 1 })
        .trim()
        .exists()
}


export const checkRequestBodyParams = (val:any) => {
    return body(val, 'Missing Body Params').isLength({ min: 1 })
        .trim()
        .exists().withMessage('Missing Body Params')
}

export default { checkQuery, checkParam, checkRequestBodyParams };
