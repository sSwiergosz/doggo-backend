import { gql } from 'apollo-server-express';

const schema = gql`
  type User {
    id: Int!
    dogs: [Dog!]
    email: String!
    messages: [Message!]
    name: String!
  }

  type Dog {
    id: Int!
    age: Int!
    breed: String!
    name: String!
    user: User!
  }

  type Message {
    id: Int!
    createdAt: String!
    text: String!
    user: User!
  }

  type Query {
    allDogs: [Dog!]
    allMessages: [Message!]
    dog(id: Int!): Dog
    message(id: Int!): Message
    user(id: Int!): User
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
    createUser(
      email: String!,
      name: String!,
      password: String!
    ): User!
  }
`;

export default schema;
