import { Request } from 'express'
import multer from 'multer'

const destationFinder = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, destination: string) => void
) => {
  cb(null, 'public/uploads')
}
const storage = multer.diskStorage({
  destination: destationFinder,
  filename: (req: Request, file, cb) => {
    cb(null, file.originalname)
  },
})
const uploader = multer({ storage: storage })

export { uploader }
