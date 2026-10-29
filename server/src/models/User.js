import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    avatarUrl: { type: String, trim: true },
    interests: [{ type: String, trim: true }],
    skills: [{ type: String, trim: true }],
    researchAreas: [{ type: String, trim: true }],
    publications: [{ title: String, url: String, year: Number }],
  },
 feature/entity-relationships
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
)

userSchema.virtual('savedOpportunities', {
  ref: 'SavedOpportunity',
  localField: '_id',
  foreignField: 'user',
})


  { timestamps: true },
)

 main
export default mongoose.models.User || mongoose.model('User', userSchema)
