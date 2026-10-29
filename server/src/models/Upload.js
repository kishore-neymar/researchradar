import mongoose from 'mongoose'

const uploadSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    originalName: { type: String, required: true, trim: true },
    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true, min: 0 },
    url: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Upload || mongoose.model('Upload', uploadSchema)
