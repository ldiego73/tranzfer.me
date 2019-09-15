import Repository from './repository'

const repository = new Repository()

export default class {
  async add(data) {
    return await repository.add(data)
  }

  async update(id, status) {
    return await repository.update(id, status)
  }

  async list() {
    return await repository.list()
  }

  async delete() {
    return await repository.delete()
  }
}
