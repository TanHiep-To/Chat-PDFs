export const AuthTypedef = /* GraphQL */ `
  type Query {
    login(input: LoginInput!): Auth
    register(input: RegisterInput!): Auth
  }

  type Auth {
    token: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }
`;
