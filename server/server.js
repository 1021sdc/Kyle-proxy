const express = require('express');
const cors = require('cors');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();

const port = 8080;

app.use(express.static(path.join(__dirname, '/../public')));
app.use(cors());

app.get('/photos/:id', (req, res) => {
  const { id } = req.params;
  res.redirect(`http://18.218.52.58:3001/photos/${id}`);
})

app.get('/listings/:id', (req, res) => {
  const { id } = req.params;
  res.redirect(`http://54.153.105.148:3002/listings/${id}`);
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
  res.redirect(`http://18.218.58.47:3004/reviews/${id}`);
})

// app.get('/MoreHomes', (req, res) => {
//   const { id } = req.params;
//   // res.redirect(`http://localhost:3005/MoreHomes/${id}`);
//   res.redirect(`http://3.14.81.50/MoreHomes`);
// })

app.use('/MoreHomes',
  proxy({
    target: 'http://3.14.81.50/MoreHomes',
      pathRewrite: (path, req) => {
        return path.split('/').slice(2).join('/');
      }
    })
);

app.use('/booking',
  proxy({
    target: 'http://52.53.211.152:3333/booking',
      pathRewrite: (path, req) => {
        return path.split('/').slice(2).join('/');
      }
    })
);

app.use('/room',
  proxy({
    target: 'http://52.53.211.152:3333/room',
      pathRewrite: (path, req) => {
        return path.split('/').slice(2).join('/');
      }
    })
);

app.listen(port, () => {
    console.log('Server is listening on port 8080')
});