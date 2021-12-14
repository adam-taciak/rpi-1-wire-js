import express from 'express';
import cors from 'cors';
import {
  getSensors,
  getSensorTemperature,
  getTemperature,
} from '../dist/index.js';

const app = express();
const port = 3000;
app.use(cors());

app.get('/temperature', async (req, res) => {
  try {
    const data = await getTemperature();
    res.send({ data });
    return;
  } catch (err) {
    res.statusCode = 500;
    res.send({ errors: [err.toString()] });
  }
});

app.get('/sensors', async (req, res) => {
  try {
    const data = await getSensors();
    res.send({ data });
    return;
  } catch (err) {
    res.statusCode = 500;
    res.send({ errors: [err.toString()] });
  }
});

app.get('/sensor/{id}/temperature', async (req, res) => {
  try {
    const data = await getSensorTemperature(req.params.id);
    res.send({ data });
    return;
  } catch (err) {
    res.statusCode = 500;
    res.send({ errors: [err.toString()] });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
