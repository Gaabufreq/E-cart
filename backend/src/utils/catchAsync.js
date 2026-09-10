

export const catchAsync = (fn) => {
    return (req,res,next) =>{
        fn(req,res,next).catch(next); // Passes error directly to Global Error Handler
    }
}