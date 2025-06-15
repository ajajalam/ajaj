require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dbconnect = require('./config/db.config');
const { MongoOIDCError } = require('mongodb');
const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO || "mongodb+srv://alamajaj813:He6shkMmSGFtI9wa@cluster0.co59hvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const authroute = require('./src/routes/auth.routes')
app.use(cors(
    {
        origin:'*',
     }
));
app.use(bodyParser.json());
dbconnect(mongo_url);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
}
);
app.use('/api/auth',authroute);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);