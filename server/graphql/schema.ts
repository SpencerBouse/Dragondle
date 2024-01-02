import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Character {
    _id: String
    name: String
    image: String
    hints: [Hint]
  }

  type Hint {
    level: String
    hint: String
  }

  input CharacterInput {
    name: String!
    image: String!
    hints: [HintInput]!
  }

  input HintInput {
    level: String!
    hint: String!
  }

  type Query {
    characters: [Character]
    characterById(id: String): Character
  }
  type Mutation {
    addCharacter(character: CharacterInput): AddCharacterResponse
  }

  type AddCharacterResponse {
    code: Int!
    success: Boolean!
    message: String!
    character: Character
  }
`