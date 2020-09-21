import { gql } from 'apollo-server-express';

const schema = gql`
  type User {
    id: ID!
    dogs: [Dog!]
    email: String!
    messages: [Message!]
    name: String!
  }

  type Dog {
    id: ID!
    age: Int!
    breed: String!
    name: String!
    user: User!
  }

  type Message {
    id: ID!
    createdAt: String!
    text: String!
    user: User!
  }

  type Query {
    allDogs: [Dog!]
    allMessages: [Message!]
    allUsers: [User!]
    dog(id: ID!): Dog
    message(id: ID!): Message
    user(id: ID!): User
  }

  type Mutation {
    createDog(
      userId: Int!
      age: Int!
      breed: String!
      name: String!
    ): Dog!
    createMessage(
      userId: Int!
      text: String!
    ): Message!
    signIn(
      name: String!
      password: String!
    ): Token!
    signUp(
      name: String!
      email: String!
      password: String!
    ): Token!
  }

  type Token {
    token: String!
  }
`;

export default schema;
