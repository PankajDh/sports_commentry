const peer = new Peer(null, {
    path: '/peerjs',
    host: '/',
    port: '443'
});
const socket = io('/');

peer.on('open', (id)=>{
    console.log(`${id} got`);
    socket.emit('user-connected', id);
});

const audioPlayer = document.getElementById('audio-player-ipl');
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

peer.on('call', (call) => {
    console.log('got call');
    call.answer();
    call.on('stream', (remoteStream)=>{
        console.log('adding source');
        audioPlayer.srcObject = remoteStream;
        audioPlayer.addEventListener('loadedmetadata', () => {
            audioPlayer.play();
        });
    });
    
});
