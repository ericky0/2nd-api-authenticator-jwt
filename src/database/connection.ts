import { createConnection} from 'typeorm';


createConnection().then((connection) => {
  console.log('📦 successfully connected with database :D')
});
