let transferencias = []

export default class {
  async add(data) {
    return new Promise(resolve => {
      data.id = transferencias.length

      transferencias.push(data)

      resolve(data.id)
    })
  }

  async update(id, status) {
    return new Promise(resolve => {
      const t = transferencias.find(t => t.id === id)

      t.status = status

      resolve(true)
    })
  }

  async list() {
    return new Promise(resolve => {
      resolve(transferencias)
    })
  }

  async delete() {
    return new Promise(resolve => {
      transferencias = []

      resolve(true)
    })
  }
}
