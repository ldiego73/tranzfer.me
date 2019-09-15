/* eslint require-atomic-updates: 0 */

import Queue from 'bull'
import Service from '../service'

const service = new Service()
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const processQueue = new Queue('process-queue', 'redis://127.0.0.1:6379', {
  defaultJobOptions: {
    removeOnComplete: true,
  },
})

processQueue.process(async (job, done) => {
  const { data } = job
  const { id } = data

  await sleep(10000)
  await service.update(id, 'FINISHED')

  done(null, true)
})

processQueue.on('completed', job => {
  console.log(`Job #${job.id} completed`)
})

processQueue.on('error', err => {
  console.log(`Job with error`, err)
})

export default class {
  async add(ctx) {
    const entity = ctx.request.body

    entity.status = 'PROCESSED'

    const id = await service.add(entity)

    processQueue.add({ id })

    ctx.status = 200
  }

  async update(ctx) {
    const entity = ctx.request.body
    const { id, status } = entity

    await service.update(id, status)

    ctx.status = 200
  }

  async list(ctx) {
    ctx.body = await service.list()
  }

  async delete(ctx) {
    await service.delete()

    ctx.status = 200
  }
}
