const middle = function(req,res,next)
{

    const jwt = require('jsonwebtoken');
    const token = req.headers.authorization;
    if(token != undefined){

        const token = req.headers.authorization.split(' ')[1];
        //console.log("Bijendra");
        const t = jwt.verify(token,"PratapSingh",(err,decode) => {
            if(err)
            {
                console.log(err.name);
                res.send(err.name);
            }
            else{

                next();
                
            }
        });


    }
              
    else{

        console.log("Please login");
        res.send("Please login");
    }
}
module.exports = middle;