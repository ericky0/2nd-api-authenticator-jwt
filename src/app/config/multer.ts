  
import multer from "multer";
import path from "path";
import crypto from "crypto";


const storageTypes = {
    local:  multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
            //evitar que as imagens não tenham o mesmo nome, pra não que elas nao se sobreponham
            crypto.randomBytes(16, (err: Error, hash) => {
                //tratando o erro, caso não seja possivel gerar os caracteres por algum motivo
                if (err){
                    cb (err, err.toString());
                };
                
                // nome do arquivo = hash transformado em hexadecimal + o nome original do arquivo, é passado null no callback pois não deu erro ao gerar o hash :D
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            }) 
        }
    })
}



export default module.exports = {
    //pra onde vão esses arquivos pós-upload
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes['local'],

    //limites do arquivo
    limits: {
        fileSize: 2 * 1024 * 1024 // == 2mb;
    },
    // filtrar a extensão dos arquivos que podem sofrer upload;
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'application/pdf'
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(new Error('Invalid File Type.'));
        }
    }
}