import * as dotenv from 'dotenv';
dotenv.config();

import { connect } from './config/db';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { root } from './graphql/root/auth.root';
import { authSchema } from './graphql/schema/auth.schema';

const app = express();
app.use('/auth', graphqlHTTP({
    schema: authSchema,
    rootValue: root,
    graphiql: true
}));

const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT, () => {
    console.log(`🚀 Server running on port ${SERVER_PORT}`);
});

connect();