import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from "../../lib/prisma";

export async function GetAllTasks(app: FastifyInstance) {
  app.get('/tasks', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const tasks = await prisma.task.findMany();
      reply.code(200).send(tasks)
    } catch(error){
      console.error(error)
      reply.code(500).send({
        status: 'erro',
        message: 'Não foi possível buscar as tarefas. Tente novamente mais tarde.'
      })
    }
  });
}