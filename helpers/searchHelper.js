module.exports = (req, find) =>{
    let keyword = "";
    if(req.query.keyword){
        keyword = req.query.keyword

        const regex = new RegExp(keyword , "i")

        find.name = regex // gán title vô trong find 
    }
    return keyword
}