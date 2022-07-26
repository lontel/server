const router = require("express").Router()

const uploader = require('./../config/cloudinary.config')

// Update single image

router.post('/image', uploader.single('imageData'), (req, res) => {

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error uploading the file' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})

// Update multipable images 

router.post('/images', uploader.array('imagesData'), (req, res) => {

    if (!req.files) {
        res.status(500).json({ errorMessage: 'Error uploading the file' })
        return
    }

    res.json({ cloudinary_urls: req.files.map(res => res.path) })
})


module.exports = router