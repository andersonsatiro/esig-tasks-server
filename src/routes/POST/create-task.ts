import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function CreateTask(app: FastifyInstance){
  app.post('/criar-tarefa', async (req: FastifyRequest, reply: FastifyReply) => {
    const taskShema = z.object({
      description: z.string(),
      priority: z.enum(['alta', 'média', 'baixa']),
      responsible: z.string(),
      status: z.enum(['não iniciada', 'em andamento', 'para hoje', 'entregue']),
      expected_delivery_date: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Formato de data inválido"
      })
    })

    const {description, expected_delivery_date, priority, responsible, status} = taskShema.parse(req.body)

    try{
      await prisma.task.create({
        data: {
          description,
          priority,
          responsible,
          status,
          creation_date: new Date(),
          expected_delivery_date: new Date(expected_delivery_date)
        }
      })
      reply.code(201).send({
        status: 'Ok',
        message: 'Tarefa criada com sucesso!'
      })
    }catch(error){
      console.error(error)
      reply.code(500).send({
        status: 'error',
        message: 'Não foi possível criar uma nova tarefa. Tente novamente.'
      })
    }
  })
}