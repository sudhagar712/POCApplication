import { Router } from "express";
const router: Router = Router();

import { login} from '../controller/login.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/validators';
import { checkSession } from '../middleware/tokenManager';
import { basicAuthUser } from '../middleware/basicAuth';

router.post('/', 
    basicAuthUser, 
    login
);



export default router;
