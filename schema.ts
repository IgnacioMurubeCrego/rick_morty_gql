export const schema = `#graphql

type Character{
  id: ID
  name: String
	status: String
	species: String
	type: String
	gender: String
	origin: Location
	location: Location
	image: String
	episode: [Episode]!
	url: String
	created: String
}

type Location {
  id: ID
  name: String
	type: String
	dimension: String
	residents: [Character]!
	url: String
	created: String
}

type Episode {
  id: ID
  name: String
  air_date: String
	episode: String
	characters: [Character]!
	url: String
	created: String
}


type Query{
  character(id: ID!): Character
  charactersByIds(ids: [ID!]!): [Character]
}

`;
