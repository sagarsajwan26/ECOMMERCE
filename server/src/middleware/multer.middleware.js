import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/multer')
  },
  filename: function (req, file, cb) {
  
    cb(null, file.fieldname )
  }
})

export const upload = multer({ storage: storage })