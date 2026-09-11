import { AppError } from '../utils/AppError.js'

export const validate = (schema) => (req, res, next) => {
try{
schema.parse({
    body:req.body,
    query:req.query,
    params:req.params,
});
return next();
}catch(error){
    if(error.issues){
        const errorMessage = error.issues.map((err) => err.message).join(', ');
        return next(new AppError(errorMessage, 400));
    }   
    return next(error);
}
}