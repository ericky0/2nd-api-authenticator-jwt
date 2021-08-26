import { createConnection, getCustomRepository, getRepository } from 'typeorm';
import Admin from '../app/models/Admin';


createConnection().then((connection) => {
  console.log('📦 successfully connected with database :D')
  const repository = connection.getRepository(Admin);
  repository.findOne({ where: { email: 'erickhogarth@gmail.com' }}).then((admin) => {
    if(!admin) {
      const createAdmin =  repository.create({
        email: "erickhogarth@gmail.com",
        password: "123"
      });
      repository.save(createAdmin);
    }
  });
});
