import { Opportunity, ResearchTrend, SavedOpportunity, User } from '../src/models/index.js'

const models = [User, Opportunity, SavedOpportunity, ResearchTrend]

for (const Model of models) {
  const document = new Model()
  document.validateSync()
 feature/entity-relationships
  console.log(`${Model.modelName}: schema registered with ${Object.keys(Model.schema.paths).length} paths and ${Object.keys(Model.schema.virtuals).length} virtuals`)

  console.log(`${Model.modelName}: schema registered with ${Object.keys(Model.schema.paths).length} paths`)
 main
}
