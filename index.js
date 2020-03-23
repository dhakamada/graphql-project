import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'

import resolvers from './src/components/smartmei/resolvers'
import context from './src/config/context'
import logger from './src/config/logger'

const server = new ApolloServer({
  typeDefs: importSchema('./src/components/smartmei/schemas/index.graphql'),
  resolvers,
  context
})

server
  .listen()
  .then(({ url }) => {
    logger.info(`Playground on ${url}`)
  })

