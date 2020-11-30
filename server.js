const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const auth_router = require('./Routers/authRouter');
const employee_router = require('./Routers/employeeRouter');
const plant_router = require('./Routers/plantRouter');
const workcenter_router = require('./Routers/workcenterRouter');
const status_router = require('./Routers/statusRouter');

// dev port setup
const PORT = process.env.PORT || 4000;
// initializing server
const server = express();
// common server middleware and routers
server.use(cors());
server.use(express.json());
server.use(helmet());
// defined routes
server.use('/auth', auth_router);
server.use('/employee', employee_router);
server.use('/plant', plant_router);
server.use('/workcenter', workcenter_router);
server.use('/status', status_router);
// welcome message to the new plex server
server.get('/', (req, res) => {
    res.status(200).json({
        connection_message: 'You have connected to plex'
    })
});
// catch all error message
server.use('/', (err, req, res, next) => {
   res.status(500).json({
       error_message: `Error: ${err}`
   });
});
// server listening
server.listen(PORT, () => {
    console.log(`--- server running on port ${PORT} ---`);
});