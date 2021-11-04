import express from 'express';
import routes from './routes/index';

const app: express.Express = express();
const port: number = 3000;

app.use('/', routes);

app.listen(port, () => console.log(`Serving on ${port}`));
