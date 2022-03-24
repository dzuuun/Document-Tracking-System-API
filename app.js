const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');
app.use(express.json());
var bodyParser = require('body-parser')
app.use(bodyParser.json());
const docRouter = require('./api/documents/doc.router');

app.use('/api/users', userRouter);
app.use('/api/documents', docRouter);


app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});