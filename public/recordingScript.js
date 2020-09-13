
const peer = new Peer('record', {
    path: '/peerjs',
    host: '/',
    port: '443'          // 443 for heroku
});
const socket = io('/');

peer.on('open', (id) => {
    console.log(`${id} got`);

});

let myAudioStream;
navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true
}).then(stream => {
    myAudioStream = stream;
    // default mode is mute
    muteUnmute();
    socket.on('add-call', (userId) => {
        // console.log('got new user');
        // console.log('sending call');
        // callNewUser(userId);
        peer.call(userId, stream);
    });
});


const muteUnmute = () => {
    const enabled = myAudioStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myAudioStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        setMuteButton();
        myAudioStream.getAudioTracks()[0].enabled = true;
    }
}

const setMuteButton = () => {
    const html = `
        <i class="fas fa-microphone fa-10x microphone-icon"></i>
        <p>Mute</p>    
    `;
    document.querySelector('.record').innerHTML = html;
}

const setUnmuteButton = () => {
    const html = `
        <i class="fas fa-microphone-slash fa-10x microphone-icon"></i>
        <p>Start Live Feed</p>    
    `;
    document.querySelector('.record').innerHTML = html;
}
