import { FastifyInstance } from 'fastify';

export async function GetAllTasks(app: FastifyInstance) {
  app.get('/tasks', async (request, reply) => {
    const tasks = [
      { id: 1, description: 'Learn Fastify', status: 'pending' },
      { id: 2, description: 'Set up TypeScript', status: 'completed' },
    ];
    reply.send({ tasks });
  });
}
