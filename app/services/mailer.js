const sgMail = require('@sendgrid/mail');
const { sendGridKey } = require('../keys');
sgMail.setApiKey(sendGridKey);

module.exports = async (subject, recipient, html) => {
  const msg = {
    to: recipient,
    from: 'no-reply@blog-app.com',
    subject,
    html
  };

  try {
    const res = await sgMail.sendMultiple(msg);
    return res;
  } catch (e) {
    throw e;
  }
};
