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
 feature/entity-relationships
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
)

opportunitySchema.virtual('savedRecords', {
  ref: 'SavedOpportunity',
  localField: '_id',
  foreignField: 'opportunity',
})

opportunitySchema.pre('findOneAndDelete', async function () {
  const opportunityId = this.getQuery()._id
  if (mongoose.models.SavedOpportunity) {
    await mongoose.models.SavedOpportunity.deleteMany({ opportunity: opportunityId })
  }
})


  { timestamps: true },
)

 main
opportunitySchema.index({ title: 'text', description: 'text', tags: 'text' })

export default mongoose.models.Opportunity || mongoose.model('Opportunity', opportunitySchema)
