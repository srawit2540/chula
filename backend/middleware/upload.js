const path = require('path')

const uploadFile = (fileName, file) => {
    file.mv(
        path.join(__dirname, './../public/images/', `${fileName}`),
        (err) => {
            if (err) return err
        }
    )
}

module.exports = uploadFile
