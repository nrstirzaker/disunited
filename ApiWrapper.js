var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);


module.exports = {
    gmail: google.drive({
        version: 'v2',
        auth: oauth2Client
    })
};
