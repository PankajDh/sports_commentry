
const peer = new Peer('record', {
    path: '/peerjs',
    host: '/',
    port: '2711'
});
const socket = io('/');

peer.on('open', (id) => {
    console.log(`${id} got`);

});

navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true
}).then(stream => {
    socket.on('add-call', (userId) => {
        console.log('got new user');
        console.log('sending call');
        // callNewUser(userId);
        peer.call(userId, stream);
    });
});
