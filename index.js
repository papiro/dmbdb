'use strict'

if (! process.env.DMBDB_PATH) {
  throw new ReferenceError('DMBDB_PATH not set')
}

const fs = require('fs'), path = require('path'), _ = require('_private')

class Table {
  constructor (name, schema = {}) {
    const file = path.join(process.env.DMBDB_PATH, name)
    const openTable = () => { _(this) = new Proxy(require(file), schema); done() }
    this.lock( done => {
      fs.access(file, fs.constants.W_OK, (err1) => {
        if (err1) {
          fs.writeFile(file, '{}', (err2) => {
            if (err2) {
              throw new Error(`Could not access ${file} for writing for reason:::${err1}\nCould not write file for reason:::${err2}`)
            }
            openTable()
          })
        } else {
          openTable()
        }
      })
    })
  }
  // recursive write queue
  lock (access) {
    _(this).lock = new Promise( (resolve, reject) => {
      _(this).lock.then( () => {
        access(resolve)  
      })
    })
  }
  write (row = []) {
  }

}
