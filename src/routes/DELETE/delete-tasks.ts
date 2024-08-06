import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

interface Task {
  id: string;
  number: number;
  description: string;
  priority: string;
  responsible: string;
  status: string;
  creation_date: string;
  expected_delivery_date: string;
  actual_delivery_date?: string | null;
  update_at?: string | null;
}

export async function DeleteTasks(app: FastifyInstance){
  app.put('/remover-tarefa', async (req: FastifyRequest, reply: FastifyReply) => {
    const taskShema = z.object({
      ids: z.array(z.string().uuid())
    })

    const {ids} = taskShema.parse(req.body)
    
    try{
      await prisma.task.deleteMany({
        where: {
          id: { in: ids }
        }
      })
      reply.code(200).send({
        status: 'Ok',
        message: 'Sucesso!'
      })
    }catch(error){
      console.error(error)
      reply.code(500).send({
        status: 'error',
        message: 'Não foi possível deletar a tarefa. Tente novamente.'
      })
    }
  })
}