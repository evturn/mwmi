import Parser from 'rss-parser';

const parser = new Parser();

(async () => {
  const feed = await parser.parseURL('https://feed.pippa.io/public/shows/mama-we-made-it');
  const { items, ...rest } = feed;
  console.log(rest);
})();
