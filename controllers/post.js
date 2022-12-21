exports.afterUploadImage = (req, res) => {
    res.json({ url: `/img/${req.file.filename}`});
}

exports.uploadPost = async () => {
    try {

    } catch (error) {
        next(error);
    }
}