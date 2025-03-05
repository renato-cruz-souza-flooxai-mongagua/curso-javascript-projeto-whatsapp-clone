import { ClassEvent } from "./../util/ClassEvent";

export class MicrophoneController extends ClassEvent {
    constructor() {

        super() 

        this._initialized = false;

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this._stream = stream;
                this._audio = new Audio();
                this._audio.src = URL.createObjectURL(stream);
                this._audio.play();

                this.trigger('play', audio)
                this._initialized = true;
            })
            .catch(err => {
                console.error('Erro ao acessar o microfone:', err);
                this._initialized = false;
            });
    }

    stop() {
        if (this._initialized && this._audio) {
            this._audio.pause();
            this._audio.src = "";  // Limpa a referência do áudio
            this._stream.getTracks().forEach(track => track.stop()); // Para o fluxo
            console.log("Microfone parado.");
        } else {
            console.error("Microfone não está inicializado ou não há áudio para parar.");
        }
    }

    isInitialized() {
        return this._initialized;
    }

}