const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Chat Box';

app.get('/', (request, response) => {
  response.send('Oh hey Chat Box');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});