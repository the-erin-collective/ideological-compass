import { category } from './category/category'
import { userAnswer } from './user-answer/user-answer'
import { ideologyAnswer } from './ideology-answer/ideology-answer'
import { ideology } from './ideology/ideology'
import { survey } from './survey/survey'
import { question } from './question/question'
import { userSurvey } from './user-survey/user-survey'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(category)
  app.configure(userAnswer)
  app.configure(ideologyAnswer)
  app.configure(ideology)
  app.configure(survey)
  app.configure(question)
  app.configure(userSurvey)
  app.configure(user)
  // All services will be registered here
}
