const server = require('./src/server')
const dataBase = require('./src/lib/db')

async function main () {
  await dataBase.connect()
  console.log('Base de datos connectada')
  server.listen(8080, () => {
    console.log('El servidor esta corriendo')
  })
}

main()
  .then(() => {
    console.log('El servidor esta listo')
  })
  .catch(error => console.error('Error: ', error))
