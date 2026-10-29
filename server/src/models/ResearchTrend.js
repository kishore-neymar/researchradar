import mongoose from 'mongoose'

const researchTrendSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true, trim: true },
    growthPercentage: { type: Number, required: true, min: 0 },
    momentum: { type: String, enum: ['low', 'medium', 'high'], required: true },
    description: { type: String, required: true, trim: true },
    relatedTags: [{ type: String, trim: true }],
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.ResearchTrend || mongoose.model('ResearchTrend', researchTrendSchema)
