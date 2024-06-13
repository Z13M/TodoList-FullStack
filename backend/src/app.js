import express from 'express';
import router from './routers/web.js';
import cors from  'cors';


const app = express();
const port = 3030;

app.use(cors())
app.use(express.json());
app.use('/', router);
app.listen(port, () => {
  console.log(`Server : http://localhost:${port} `);
});


