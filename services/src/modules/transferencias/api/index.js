import Router from 'koa-router'

import Controller from './controller'

const controller = new Controller()
const router = new Router({ prefix: '/transferencias' })

router.get('/', controller.list)
router.post('/', controller.add)
router.put('/', controller.update)
router.delete('/', controller.delete)

export default router
