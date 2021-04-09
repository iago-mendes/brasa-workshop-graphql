const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')

const schema = buildSchema(
`
	type Query
	{
		rollDice(numDice: Int!, numSides: Int): [Int]
	}
`)

const root =
{
	rollDice: args =>
	{
		const numDice = args.numDice
		const numSides = args.numSides || 6

		const output = []
		for (let i = 0; i < numDice; i++)
		{
			output.push(1 + Math.floor(Math.random() * numSides))
		}

		return output
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