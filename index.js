const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')

const schema = buildSchema(
`
	input MessageInput
	{
		content: String
		author: String
	}

	type Message
	{
		id: ID!
		content: String
		author: String
	}

	type Query
	{
		getMessage(id: ID!): Message
	}

	type Mutation
	{
		createMessage(input: MessageInput): Message
		updateMessage(id: ID!, input: MessageInput): Message
	}
`)

class Message
{
	constructor(id, {content, author})
	{
		this.id = id
		this.content = content
		this.author = author
	}
}

var fakeDatabase =
{}

var root = {
	getMessage: ({id}) =>
	{
		if (!fakeDatabase[id])
			throw new Error(`Não existem mensagens com id ${id}`)
		
		return new Message(id, fakeDatabase[id])
	},

	createMessage: ({input}) =>
	{
		const id = require('crypto').randomBytes(10).toString('hex')

		fakeDatabase[id] = input
		return new Message(id, input)
	},

	updateMessage: ({id, input}) => {
		if (!fakeDatabase[id])
			throw new Error(`Não existem mensagens com id ${id} para alterar`)
		
		fakeDatabase[id] = input
		return new Message(id, input)
	},
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