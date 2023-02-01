const authMid = (req, res, next) => {
    try{
        if(req.cookies.session_token){
            next()
        }
        else{
            res.send(`No estas logeado`)
        }
    }
    catch(error){
        console.log(error)
    }

}

export{
    authMid
}