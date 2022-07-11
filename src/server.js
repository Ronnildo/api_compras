const app = require('./app');
const port = process.env.PORT || 33333;

app.listen(port, () => {
    console.log('server port: http://localhost:' + port)
});