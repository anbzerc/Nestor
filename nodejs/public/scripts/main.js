let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;
document.querySelector('.grid-container').style.height = height + "px";
let open = false;
const sidebar = document.querySelector('.sidebar');
const iconbutton = document.querySelector('.menu-icon');
const NestorIcon = document.querySelector('.Nestor-icon');
const NestorX = NestorIcon.offsetLeft;
document.querySelector('.menu-icon').onclick = function () {
	sidebar.classList.toggle('open-sidebar');
	iconbutton.classList.toggle('open-menu-icon');
	NestorIcon.classList.toggle('open-Nestor-icon')

}

document.querySelector('.Plugins').onclick = function () {
	window.location.href = "Plugins.html"

}

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
        if (bestScore > 0.5) {
          const bestIndex = scores.indexOf(bestScore);
          const word = recognizer.wordLabels()[bestIndex];

          if (word === 'zero') {
            console.log('Mot-clé détecté:', word);
			      recordAudio()
          }
        }
  }
}, { probabilityThreshold: 0.5 });
}


let audioChunks = [];

async function recordAudio() {
    isListening = true;
    let audioContext;
    let analyserNode;
    let dataArray;
    let prevEnergy;
    let energyDropCount = 0;
    const dropThreshold = 20; // Energy drop threshold
    const updateInterval = 100; // Update energy every 100 milliseconds

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          analyserNode = audioContext.createAnalyser();
          analyserNode.fftSize = 256;
          dataArray = new Uint8Array(analyserNode.frequencyBinCount);
          
          prevEnergy = 0;

          const sourceNode = audioContext.createMediaStreamSource(stream);
          sourceNode.connect(analyserNode);

          updateEnergy();
        })
        .catch(error => {
          console.error('Error accessing microphone:', error);
        });
    

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
      console.log('Energy: ' + energy.toFixed(2));

      if (prevEnergy - energy > dropThreshold) {
        energyDropCount++;
      } else {
        energyDropCount = 0;
      }

      if (energyDropCount >= 10) { // 10 updates * 100 milliseconds = 1 second
        stopRecording();
        return;
      }

      prevEnergy = energy;
      setTimeout(updateEnergy, updateInterval);
    }

    function stopRecording() {
      console.log('Recording stopped due to energy drop.');
      isListening = false;
      audioContext.close().then(() => {
        audioContext = null;

        const blob = new Blob(audioData, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', blob, 'recordedAudio.wav');

        fetch('http://your-backend-url/upload', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log('Audio uploaded:', data);
        })
        .catch(error => {
          console.error('Error uploading audio:', error);
        });
      });
    }
}



startListening();