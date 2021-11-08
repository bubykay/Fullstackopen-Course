

const  {ApolloServer, } = require('apollo-server-express');
const {execute, subscribe} = require('graphql');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const {createServer} = require('http');
const express = require('express');
// const cors = require('cors')




const {connect} = require('mongoose');
// const jwt = require('jsonwebtoken')
// const Author = require ('./model/authors.js');
// const Book = require('./model/books.js');
// const User = require('./model/users');
const resolvers = require('./controller/resolvers');
const typeDefs = require('./controller/typeDefs');


(async function (){
  const MONGOURI='mongodb+srv://kay:Kahyohde1@cluster0.if3fi.mongodb.net/fullStackOpen?retryWrites=true&w=majority'
const JWT_SECRET = 'JWT_SECRET'


connect(MONGOURI)
.then(()=>console.log('connected to DB'))
.catch(err=>console.log(err.message))

  const app = express()
  // app.use(cors())
  const httpServer = createServer(app)
  const schema = makeExecutableSchema({typeDefs, resolvers})






  const server = new ApolloServer({
    schema,
    plugins: [{
      async serverWillStart(){
        console.log('server warming up')
        const sub = SubscriptionServer.create(
          {schema, execute, subscribe, onConnect: ()=>console.log('ws connected')},
          {server: httpServer, path: server.graphqlPath}
        )

        return {
          async drainServer(){
            // console.log('phase 2');
            sub.close()
          }
        }
      }
    }]
  })
  await server.start()
  server.applyMiddleware({app, cors:true})

  const PORT = 4000

  httpServer.listen(PORT, ()=>{
    console.log(`Server running on localhost:${PORT}${server.graphqlPath}`)
  })
})()






// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async ({req})=>{
//     const auth = req?req.headers.authorization :null
//     if(auth && auth.toLocaleLowerCase().startsWith('bearer ')){
//       const decoded = jwt.verify(auth.substring(7), JWT_SECRET)
//       const loggedInUser = await User.findById(decoded.id)
//       return {loggedInUser}
//     }
//   }
// })

// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })