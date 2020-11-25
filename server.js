const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const auth_router = require('./Routers/authRouter');
const employee_router = require('./Routers/employeeRouter');


const PORT = process.env.PORT || 4000;

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());
server.use('/auth', auth_router);
server.use('/employee', employee_router);

server.get('/', (req, res) => {
    res.status(200).json({
        connection_message: 'You have connected to plex'
    })
});

server.use('/', (err, req, res, next) => {
   res.status(500).json({
       error_message: `Error: ${err}`
   });
});

server.listen(PORT, () => {
    console.log(`--- server running on port ${PORT} ---`);
});