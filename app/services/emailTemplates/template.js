const { domain } = require('../../keys');

module.exports = ({ title, body, link, text }) => (
`
  <html>
    <body>
      <div style="text-align: center;">
        <h1>${title}</h1>
        <p>${body}</p>
        <div>
          <a href="${domain}${link}">${text}</a>
        </div>
      </div>
    </body>
  </html>
`
);
