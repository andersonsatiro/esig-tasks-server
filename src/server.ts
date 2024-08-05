import fastify from 'fastify';
import { GetAllTasks } from './routes/GET/get-all-tasks';

const app = fastify();

app.register(GetAllTasks);

app.listen({ host: '0.0.0.0', port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
