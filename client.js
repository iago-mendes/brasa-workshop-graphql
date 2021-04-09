const fetch = require('node-fetch')

const dice = process.argv.length > 2 ? parseInt(process.argv[2]) : 10
const sides = 20

const query = `query RollDice($dice: Int!, $sides: Int) {
	rollDice(numDice: $dice, numSides: $sides)
}`

fetch('http://localhost:7117/graphql',
{
	method: 'POST',
	header:
	{
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	},
	body: JSON.stringify(
	{
		query,
		variables: {dice, sides}
	})
})
	.then(res => res.json())
	.then(data => console.log('result: ', data))