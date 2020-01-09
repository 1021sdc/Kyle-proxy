const nr = require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');
const rp = require('request-promise');
const proxy = require('http-proxy-middleware');

const app = express();

const port = 8080;

const photos = 'http://54.201.94.44/photos';
const info = 'http://34.219.65.114/listings';
const reviews = 'http://34.217.147.152/reviews';
const rooms = 'http://54.218.70.41/room';
const bookings = 'http://54.218.70.41/booking';
const homes = 'http://35.164.175.129:3005/MoreHomes';

app.use(express.static(path.join(__dirname, '/../public')));
app.use(cors());

app.get('/photos/:id', (req, res) => {
  const { id } = req.params;
  res.redirect(`${photos}/${id}`);
})

app.get('/listings/:id', (req, res) => {
  const { id } = req.params;
  res.redirect(`${info}/${id}`);
})

// app.get('/booking', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://52.53.211.152:3333/booking/?id=25`);
// })

// app.get('/room', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://52.53.211.152:3333/room/?id=25`);
// })

app.get('/reviews/:id/', (req, res) => {
  const { id } = req.params;
  res.redirect(`${reviews}/${id}`);
})

// app.get('/MoreHomes', (req, res) => {
//   const { id } = req.params;
//   // res.redirect(`http://localhost:3005/MoreHomes/${id}`);
//   res.redirect(`http://35.164.175.129:3005/MoreHomes`);
// })

app.route('/MoreHomes')
  .get((req, res) => {
    rp(`${homes}/?id=`)
      .then((body) => res.send(body))
      .catch(() => res.sendStatus(500))
  })

// ##################################################################
// Uncomment out to remake proxy connections
// app.use('/MoreHomes',
//   proxy({
//     target: 'http://3.14.81.50/MoreHomes',
//       pathRewrite: (path, req) => {
//         return path.split('/').slice(2).join('/');
//       }
//     })
// );

// app.use('/booking',
//   proxy({
//     target: 'http://54.218.70.41/booking',
//       pathRewrite: (path, req) => {
//         return path.split('/').slice(2).join('/');
//       }
//     })
// );

// app.use('/room',
//   proxy({
//     target: 'http://54.218.70.41/room',
//       pathRewrite: (path, req) => {
//         return path.split('/').slice(2).join('/');
//       }
//     })
// );

app.use('/booking',
  proxy({
    target: `${bookings}`,
    pathRewrite: (path, req) => {
      var querystring = '?';
      for (key in req.query) {
        if (querystring !== '?') {
          querystring += '&';
        }
        querystring += `${ key }=${ req.query[key] }`;
      }
      return querystring;
    }
  })
);
app.use('/room',
  proxy({
    target: `${rooms}`,
    pathRewrite: (path, req) => {
      var querystring = '?';
      for (key in req.query) {
        if (querystring !== '?') {
          querystring += '&';
        }
        querystring += `${ key }=${ req.query[key] }`;
      }
      return querystring;
    }
  })
);


app.listen(port, () => {
    console.log('Server is listening on port 8080')
});