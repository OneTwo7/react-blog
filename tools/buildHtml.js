const fs = require('fs');
const cheerio = require('cheerio');

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    console.log(err);
  }

  const $ = cheerio.load(markup);

  $('head').append('<link rel="stylesheet" href="/styles.css">');
  $('head').append('<link rel="stylesheet" href="/notifications.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', err => {
    if (err) {
      console.log(err);
    }

    console.log('index.html written to /dist');
  });
});
