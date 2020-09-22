import { gql } from 'apollo-server-express';

const schema = gql`
  type User {
    id: ID!
    dogs: [Dog!]
    email: String!
    messages: [Message!]
    name: String!
    role: String
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
    createDog(dog: DogInput): Dog!
    createMessage(message: MessageInput): Message!
    deleteDog(id: ID!): Boolean!
    deleteMessage(id: ID!): Boolean!
    deleteUser(id: ID!): Boolean!
    signIn(
      name: String!
      password: String!
    ): Token!
    signUp(
      name: String!
      email: String!
      password: String!
    ): Token!
    updateDog(dog: UpdateDogInput): Dog!
    updateMessage(message: UpdateMessageInput): Message!
  }

  type Token {
    token: String!
  }

  input DogInput {
    userId: ID!
    age: Int!
    breed: String!
    name: String!
  }

  input UpdateDogInput {
    dogId: ID!
    age: Int
    breed: String
    name: String
  }

  input MessageInput {
    userId: ID!
    text: String!
  }

  input UpdateMessageInput {
    messageId: ID!
    text: String
  }
`;

export default schema;
