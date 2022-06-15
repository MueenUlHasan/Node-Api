import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/route';

async function App() {
  const app = express();
  mongoose.connect('mongodb://localhost:27017/authentication');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(router);
  app.listen(8000);
}
export default App;
