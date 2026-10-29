import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import Upload from '../models/Upload.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const uploadDirectory = path.resolve('uploads')
await fs.mkdir(uploadDirectory, { recursive: true })

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => callback(null, uploadDirectory),
  filename: (_request, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase()
    callback(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${extension}`)
  },
})

const allowedTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
])

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    if (allowedTypes.has(file.mimetype)) callback(null, true)
    else callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname))
  },
})

router.get('/', requireAuth, async (request, response, next) => {
  try {
    response.json(await Upload.find({ user: request.user.userId }).sort({ createdAt: -1 }).lean())
  } catch (error) { next(error) }
})

router.post('/', requireAuth, upload.single('file'), async (request, response, next) => {
  try {
    if (!request.file) return response.status(400).json({ message: 'No file uploaded' })
    const record = await Upload.create({
      user: request.user.userId,
      originalName: request.file.originalname,
      fileName: request.file.filename,
      mimeType: request.file.mimetype,
      size: request.file.size,
      url: `/uploads/${request.file.filename}`,
    })
    response.status(201).json(record)
  } catch (error) {
    if (request.file) await fs.unlink(path.join(uploadDirectory, request.file.filename)).catch(() => {})
    next(error)
  }
})

router.delete('/:id', requireAuth, async (request, response, next) => {
  try {
    const record = await Upload.findOneAndDelete({ _id: request.params.id, user: request.user.userId })
    if (!record) return response.status(404).json({ message: 'File not found' })
    await fs.unlink(path.join(uploadDirectory, record.fileName)).catch(() => {})
    response.status(204).send()
  } catch (error) { next(error) }
})

export default router
export { uploadDirectory }
