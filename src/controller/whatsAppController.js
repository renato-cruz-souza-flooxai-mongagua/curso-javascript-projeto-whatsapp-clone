class WhatsAppController {

    constructor() {

        console.log('WhatsAppController OK')

        this.elementsPrototype();
        this.loadElements();



    }

    loadElements(){

        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {
            
            this.el[Format.getCamelCase(element.id)] = element;

        });

    }

    elementsPrototype() {

        Element.prototype.hide = function() {

            this.stytle.display = "none";

        }
        Element.prototype.show = function() {

            this.stytle.display = "none";

      
        Element.prototype.toggle = function() {

            this.stytle.display = (this.style.display === 'none' ) ? 'block' : 'none';

        }

    }


}