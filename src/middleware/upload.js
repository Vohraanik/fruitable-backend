const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fieldname = file.fieldname;
    const pathUpload = path.resolve('.././public', fieldname);

    // const pathUpload = path.join("/tmp", fieldname);

  //   const pathUpload = path.join(
  //     process.cwd(),
  //     fieldname
  // );

    console.log(pathUpload,fieldname,);
    

    fs.mkdirSync(pathUpload, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, pathUpload); 
    });
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
