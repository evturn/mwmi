import express from 'express';
import path from 'path';
import data from './episodes.json';

const app = express();

app.use(express.static(path.join(process.cwd(), 'build')));
app.get('/api/episodes', (req, res, next) => {
  res.locals.episodes = data.episodes.map(x => {
    return {
      ...x,
      image: {secure_url: 'media/mwmi-logo58177f59.png'}
    };
  });
  res.json(res.locals);
});
app.get('/', (req, res) => res.sendFile(pathTo('build', 'index.html')));
app.listen(4000, () => console.log('Running'));
