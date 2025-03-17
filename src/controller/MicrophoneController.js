import { ClassEvent } from "./../util/ClassEvent";

export class MicrophoneController extends ClassEvent {
    constructor() {

        super() 

        this._mineType = 'audio/webm';

        this._available = false;

        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            this._available = true;
    
            this._stream = stream;
    
            this.trigger("ready", {
              sream: this._stream,
              audio: this._audio,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    
    isAvailable() {

        return this._available

    }

    stop() {
        if (this._available) {
          this._stream.getTracks().forEach((track) => {
            track.stop();
          });
    
          this.trigger("stop");
        }
      }

      startRecorder(){

        if (this.isAvailable) {

           this._mediaRecorder = new MediaRecorder(this._stream, {
            mineType: this._mineType
           });

           this._recordedChunks = [];

           this._mediaRecorder.addEventListener('dataavailable', e => {

            if(e.size.data.size > 0) this._recordedChunks.push(e.data)

           })

           this._mediaRecorder.addEventListener('stop', e => {

            let blob = new Blob(this._recordedChunks, {
                type: this._mineType
            })

            let filename = `rec${Date.now()}.webm`;

            let audioContext = new AudioContext();

            let reader = new FileReader()

            console.log('file', file)


            reader.onload = e => {

              audioContext.decodeAudioData(reader.result).then(decode => {

                let file = new File([Blob], filename, {
                  type: this._mineType,
                  lastModified: Date.now()
  
              })

              this,trigger('recorded', file, decode)

              })

            }

            reader.readAsDataURL(blob)

           })

           this._mediaRecorder.start()
           this.startTimer()

        }

      }
 

      stopRecorder(){

        if (this.isAvailable) {

            this._mediaRecorder.stop();
            this.stop()
            this.stopTimer()

        }


      }

      startTimer() {

         let start = Date.now()
        
              this._recordMicrophoneInterval = setInterval(() => {
              
                this.trigger('recordtimer',(Date.now() - start) )

              }, 100)

      }

      stopTimer() {

        clearInterval(this._recordMicrophoneInterval)

      }

}