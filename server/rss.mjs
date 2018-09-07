import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';

const parser = new Parser();

(async () => {
  const feed = await parser.parseURL('https://feed.pippa.io/public/shows/mama-we-made-it');
  const { items, ...rest } = feed;
  const data = items.map(x => {
    const episodeId = x.link.split('/').pop();
    const showId = '5a91c59ce330c15916472f08';
    return {
      showId,
      episodeId,
      summary: x.content,
      image: 'media/mwmi-logo58177f59.png',
      title: x.title,
      playerSrc: `https://player.pippa.io/${showId}/episodes/${episodeId}?theme=default&cover=1&latest=1`,
    };
  });
  const filepath = path.join(process.cwd(), 'server', 'data.json');
  fs.writeFile(filepath, JSON.stringify(data), e => {
    if (e) {
      console.log(e);
    } else {
      console.log('Content written.');
    }
  });
})();
