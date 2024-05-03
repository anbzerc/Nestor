let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;
document.querySelector('.grid-container').style.height = height + "px";
document.querySelector('.chat').style.height = height + "px";
document.querySelector('.chat').style.width = width + "px";
let open = false;
const sidebar = document.querySelector('.sidebar');
const iconbutton = document.querySelector('.menu-icon');
const NestorIcon = document.querySelector('.Nestor-icon');
const NestorX = NestorIcon.offsetLeft;
document.querySelector('.menu-icon').onclick = function() {
    sidebar.classList.toggle('open-sidebar');
    iconbutton.classList.toggle('open-menu-icon');
    NestorIcon.classList.toggle('open-Nestor-icon')

}

document.querySelector('.Plugins').onclick = function() {
    window.location.href = "Plugins.html"

}


// Socket io
const socket = io("http://localhost:5000")


console.log("Loading tensorflow")

let recognizer;

async function loadModel() {
    recognizer = speechCommands.create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
}

loadModel();

const HOTWORD = 'go';

let isListening = false;

async function startListening() {

    recognizer.listen(async result => {
        if (isListening === false) {
            console.log("listening...")
            const scores = result.scores;
            const bestScore = Math.max(...scores);
            //console.log(`Proba go : ${scores[6]}`)
            if (bestScore > 0.75) {
                const bestIndex = scores.indexOf(bestScore);
                const word = recognizer.wordLabels()[bestIndex];

                if (word === 'zero') {
                    console.log('Mot-clé détecté:', word);
                    recordAudio()
                }
            }
        }
    }, {
        probabilityThreshold: 0.75
    });
}

// Average function we'll use later
function numAverage(a, f) {
  f = f || function(n) {
      return n;
  };
  var b = a.length,
      c = 0,
      i;
  for (i = 0; i < b; i++) {
      c += Number(f(a[i]));
  }
  return c / b;
}


let audioChunks = [];

async function recordAudio() {
    isListening = true;
    let audioContext;
    let analyserNode;
    let dataArray;
    let prevEnergy;
    let EnergyList = [];
    let energyDropCount = 0;
    const dropThreshold = 20; // Energy drop threshold
    const updateInterval = 100; // Update energy every 100 milliseconds
    // variable which will contains audio
    let audioData = []

    // Save start and end time in order to check recorded audio duration
    let startTime;
    let endTime;

    let recorder

    navigator.mediaDevices.getUserMedia({
            audio: true
        })
        .then(stream => {
            startTime = Date.now()

            audioContext = new(window.AudioContext || window.webkitAudioContext)();
            analyserNode = audioContext.createAnalyser();
            analyserNode.fftSize = 256;
            dataArray = new Uint8Array(analyserNode.frequencyBinCount);

            prevEnergy = 0;

            const sourceNode = audioContext.createMediaStreamSource(stream);
            sourceNode.connect(analyserNode);
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = event => {
                // Collect all the chunks of the recording in an array.
                audioData.push(event.data);
            };
            recorder.onstop = e => {
                stopRecording()
            }
            recorder.start();
            audioData = [];
            updateEnergy();
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
        });




    function stopRecording() {
        endTime = Date.now()

        console.log('Recording stopped due to energy drop.');
        if (endTime - startTime < 1.5)
        {
            console.log("Too short to send")
            isListening=false
            audioData = []
            return
        }
        if (numAverage(EnergyList) < 1000){
            console.log("Energy too low, probably ghost record")
            isListening=false
            audioData = []
            return
        }
        console.log("Send")
        isListening = false;
        const blob = new Blob(audioData, { type: "audio/wav" });
        const audio = document.getElementById('tim')
        audioData = [];
        const audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;

        const formData = new FormData();
        formData.append('audio', blob, 'recordedAudio.wav');

        fetch('http://127.0.0.1:5000/api/nestor/audio', {
        method: 'POST',
        body: formData
        })
    }


function updateEnergy() {
    if (!isListening) {
        return;
    }

    analyserNode.getByteFrequencyData(dataArray);

    let energy = 0;
    for (let i = 0; i < dataArray.length; i++) {
        energy += dataArray[i] ** 2;
    }
    energy /= dataArray.length;
    EnergyList.push(energy)
    console.log('Energy: ' + energy.toFixed(2) + "Average since start : " + numAverage(EnergyList));
    //audioData.push(new Uint8Array(dataArray));


    if (prevEnergy - energy > dropThreshold) {
        energyDropCount++;
    } else {
        energyDropCount = 0;
    }

    if (energyDropCount >= 10) { // 10 updates * 100 milliseconds = 1 second
        recorder.stop()

        return;
    }
    // Check if the average energy in the last roughly 0.5 second isn't too low
    // prevent from ghost
    if (EnergyList.length>4 && numAverage(EnergyList) < 1000) {
        console.log("Energy too low, stop recording")
        recorder.stop()

        return
    }
    prevEnergy = energy;
    setTimeout(updateEnergy, updateInterval);
}
}




startListening();