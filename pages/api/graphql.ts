import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';

// ✅ Define the GraphQL schema
const typeDefs = gql`
  type Suspect {
    id: String!
    title: String
    description: String
    reward: String
    images: [String]
    fieldOffice: String
    status: String
  }

  type Query {
    suspects: [Suspect]
    suspect(id: String!): Suspect
  }
`;

// ✅ Define the resolvers
const resolvers = {
  Query: {
    suspects: async () => {
      try {
        const response = await fetch('https://api.fbi.gov/wanted/v1/list');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.items.map((item: any) => ({
          id: item.uid,
          title: item.title,
          description: item.description,
          reward: item.reward_text,
          images: item.images.map((img: any) => img.original),
          fieldOffice: item.field_offices?.[0] || null,
          status: item.status,
        }));
      } catch (error) {
        throw new Error(
          `Failed to fetch suspects: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    },
    suspect: async (_: any, { id }: { id: string }) => {
      try {
        const response = await fetch(`https://api.fbi.gov/wanted/v1/list?uid=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const item = data.items[0];
        if (!item) {
          throw new Error(`Suspect with ID ${id} not found`);
        }
        return {
          id: item.uid,
          title: item.title,
          description: item.description,
          reward: item.reward_text,
          images: item.images.map((img: any) => img.original),
          fieldOffice: item.field_offices?.[0] || null,
          status: item.status,
        };
      } catch (error) {
        throw new Error(
          `Failed to fetch suspect: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    },
  },
};

// ✅ Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// ✅ Create and export the handler for Node.js runtime
const handler = startServerAndCreateNextHandler<NextRequest>(server);
export default handler;
