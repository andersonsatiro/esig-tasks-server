import fastify from 'fastify'
import { GetAllTasks } from './routes/GET/get-all-tasks'
import { CreateTask } from './routes/POST/create-task'
import cors from '@fastify/cors'
import { DeleteTasks } from './routes/DELETE/delete-tasks'

const app = fastify()

app.register(cors, {
  origin: 'https://esig-tasks.vercel.app',
  methods: 'GET,POST,PUT,DELETE',
})

app.register(GetAllTasks)
app.register(CreateTask)
app.register(DeleteTasks)

app.listen({ host: '0.0.0.0', port: 3333 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});
