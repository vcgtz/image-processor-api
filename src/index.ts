import express from 'express';
import routes from './routes/index';
import { createFolder, existFolder, THUMBS_FOLDER } from './utilities/images';

const app: express.Express = express();
const port: number = 3000;

// Check thumbs folder
existFolder(THUMBS_FOLDER)
  .then(() => {
    return createFolder(THUMBS_FOLDER);
  })
  .catch((err) => console.error(err));

// Routing configuration
app.use('/', routes);

// Start server
app.listen(port, () => console.log(`Serving on ${port}`));

export default app;
