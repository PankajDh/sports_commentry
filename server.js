// import {MongoClient, GridFSBucket, ObjectID} from 'mongodb';
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const { Readable } = require('stream');
const peerServer = ExpressPeerServer(server, {
    debug: true
});

// let dbObj;
// async function addAudio() {
//     // connect to mongo
//     db = await MongoClient.connect('mongodb://localhost:27017/commentary');
//     dbObj = db.collection('staticContent');
// }

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
    res.render('client');
});

app.get('/audience', (req, res) => {
    res.render('audience');
});

app.get('/recording', (req, res) => {
    res.render('recording');
});

// app.get('/getComments', (req, res) => {
//     res.set('content-type', 'audio/mp3');
//     res.set('accept-ranges','bytes');
//     const trackId = new ObjectID(req.params.trackId);
//     const bucket =  new GridFSBucket(dbObj, {
//         bucketName: 'comments'
//     });

//     const downloadStream = bucket.openDownloadStream();

// });

// app.post('/createStatic', (req, res) => {
//     const storage = multer.memoryStorage();
//     const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
//     upload.single('track')(req, res, (err) => {
//         if(err) {
//             return res.status(400).json({ message: "Kuch to issue h " });
//         } else if (!req.body.name) {
//             return res.status(400).json({message: 'Audio name not provided'});
//         }

//         const trackName = req.body.name;
//         const readableStream =  new Readable();
//         readableStream.push(req.file.buffer);
//         readableStream.push(null);
//         const bucket = GridFSBucket(dbObj, {
//             bucket: 'comments'
//         });
//         const uploadStream = bucket.openUploadStream(trackName);
//         // const id = uploadStream.id;
//         readableStream.pipe(uploadStream);

//         uploadStream.on('error', ()=>{
//             return res.status(500).json({message: "Error in the upload"});
//         });

//         uploadStream.on('finish', ()=>{
//             return res.status(201).json({message: 'Comments uploaded'});
//         });
//     });
// });

io.on('connection', (socket) => {
    socket.on('user-connected', (id) => {
        // console.log(`peer id is ${id}`);
        io.emit('add-call', id);
    });
});

server.listen(process.env.PORT || 2711);