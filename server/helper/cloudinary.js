const cloundinary = require('cloudinary').v2;
const multer = require('multer');

// Configuration
cloundinary.config({
    cloud_name: 'dseryqwgk',
    api_key: '314991494333664',
    api_secret: '73JfI86UW0WmxxLcX5EqgBGR2Dw' // Click 'View API Keys' above to copy your API secret
});

// create storage
const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloundinary.uploader.upload(file,{
        resource_type : "auto",
    })
    return result;
}

const upload = multer({ storage })
module.exports = { upload, imageUploadUtil }
