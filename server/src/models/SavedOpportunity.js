import mongoose from 'mongoose'

const savedOpportunitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    opportunity: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity', required: true },
    status: {
      type: String,
      enum: ['saved', 'applied', 'archived'],
      default: 'saved',
    },
    notes: { type: String, trim: true, maxlength: 2000 },
  },
  { timestamps: true },
)

savedOpportunitySchema.index({ user: 1, opportunity: 1 }, { unique: true })

export default mongoose.models.SavedOpportunity || mongoose.model('SavedOpportunity', savedOpportunitySchema)
