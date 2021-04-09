const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')

const schema = buildSchema(
`
	type Query
	{
		quoteOfTheDay: String
		random: Float!
		rollThreeDice: [Int]
	}
`)

const root =
{
	quoteOfTheDay: () =>
	{
		return Math.random() < 0.5 ? 'Knowledge is power' : 'Agora vai'
	},
	random: () =>
	{
		return Math.random()
	},
	rollThreeDice: () =>
	{
		return [1,2,3].map(n => 1 + Math.floor(Math.random() * 6))
	}
}

const app = express()
app.use(
	'/graphql',
	graphqlHTTP(
	{
		schema,
		rootValue: root,
		graphiql: true
	})
)

app.listen(7117)
console.log('server is running!!!')