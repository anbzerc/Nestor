# Nestor
Nestor is a real-time voice assistant
### Installation 
#### Install python dependencies
Install CUDA then
```pip install numpy SpeechRecognition faster_whisper flask ollama pyaudio flask-socketio```
Then download a zip in releases and run
```python3 Nestor.py```
### Install Ollama
follow instruction here : 
### Install nodejs dependecies
``` 
cd nodejs/
npm install express cors @tensorflow/tfjs @tensorflow-models/speech-commands gsap
```
### Actions 
This repository contains only the core of Nestor. To install actions, run python3 Flask/app.py, then go to http://127.0.0.1:5000 and navigate to the plugins tab. The plugins are located in the repository https://github.com/anbzerc/Nestor-plugins. Feel free to contribute and add new actions.
### Models list :
-  bofenghuang's whisper-large-v3-french-distil
-  bofenghuang's whisper-large-v3-french-distil-dec16

Faster whisper models 
-  tiny
-  base
-  small
-  medium
-  large-v3
-  distil-large-v2

### Contributing to the core
#### Clone github repo
```git clone https://github.com/anbzerc/Nestor.git ...```
Then dev and make PR

### Contributing to actions
See https://github.com/anbzerc/Nestor-plugins

### Dev roadmap
- make a web client (not just plugins installation)
  
### Inspired by :
- https://github.com/davabase/whisper_real_time
# TODO
- [ ] visializeer https://github.com/samhirtarif/react-audio-visualize/blob/master/src/LiveAudioVisualizer/LiveAudioVisualizer.tsx
### License :
CC BY-NC 4.0 LEGAL CODE
Attribution-NonCommercial 4.0 International
