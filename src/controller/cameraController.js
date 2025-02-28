 export class CameraController {
    constructor(videoEl) {
        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {
            
            this._videoEl.srcObject = stream; // Correção: usar srcObject
            this._videoEl.play();
            
        }).catch(err => {
            console.error("Erro ao acessar a câmera:", err);
        });
    }
}