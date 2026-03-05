const postModel = require('../models/post.model')
const ImageKit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body,req.file)
    constfile = await ImageKit.files.upload({
        file: await tofile(Buffer.from(req.file.Buffer),"file"),
        fileName:"test"
    })
    req.send(file)
}



module.exports = {CreatePostController}
