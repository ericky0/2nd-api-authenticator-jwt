import { createConnection, getCustomRepository, getRepository } from 'typeorm';


createConnection().then((connection) => {
  console.log('📦 successfully connected with database :D')
});
