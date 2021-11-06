import express from 'express';
import routes from './routes/index';
import { createFolder, existFolder, RESIZED_FOLDER,  DUMMIES_FOLDER} from './utilities/images';

const app: express.Express = express();
const port: number = 3000;

// Check thumbs folder
existFolder(RESIZED_FOLDER)
  .then(() => {
    return createFolder(RESIZED_FOLDER);
  })
  .catch((err) => console.error(err));

existFolder(DUMMIES_FOLDER)
  .then(() => {
    return createFolder(DUMMIES_FOLDER);
  })
  .catch((err) => console.error(err));

// Routing configuration
app.use('/', routes);

// Start server
app.listen(port, () => console.log(`Serving on ${port}`));

export default app;
