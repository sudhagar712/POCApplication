import multer from 'multer';
import path from 'path';
import fs from 'fs';


const uploadDir = path.join(__dirname, '../uploads');


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); 
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
 
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});


const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true); 
  } else {
    cb(new Error('Only images and videos are allowed!'), false); 
  }
};


const upload = multer({ storage, fileFilter });

const multipleUpload = multer({ storage, fileFilter }).array('files[]', 10);

export { upload, multipleUpload };
