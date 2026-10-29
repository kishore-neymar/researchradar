import mongoose from 'mongoose'

const opportunitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    amount: { type: Number, min: 0 },
    currency: { type: String, default: 'USD', uppercase: true },
    deadline: { type: Date, required: true },
    tags: [{ type: String, trim: true }],
    sourceUrl: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

opportunitySchema.index({ title: 'text', description: 'text', tags: 'text' })

export default mongoose.models.Opportunity || mongoose.model('Opportunity', opportunitySchema)
