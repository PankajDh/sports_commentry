const express = require('express');
const app = express();
const server =  require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/peerjs', peerServer);

app.get('/', (req, res)=>{
    res.render('client');
});

app.get('/audience', (req,res)=>{
    res.render('audience');
});

app.get('/recording', (req,res)=>{
    res.render('recording');
});

io.on('connection', (socket)=>{
    socket.on('user-connected', (id)=>{
        console.log(`peer id is ${id}`);
        io.emit('add-call', id);
    });
});

server.listen(process.env.PORT || 2711);