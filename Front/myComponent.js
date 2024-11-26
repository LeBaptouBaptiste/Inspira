class Button extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({mode: 'open'});

        const element = document.createElement('button');
        element.setAttribute('class', 'monCss');

        const text = this.getAttribute('data-text');
        element.textContent = text;

        const style = document.createElement('style');
        
        style.textContent = 'button.monCss{background-color: #04AA6D; border: none; color: white; padding: 16px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; transition-duration: 0.4s; cursor: pointer;}';

        shadow.appendChild(style);
        shadow.appendChild(element);
    }
}
customElements.define('button-batt', Button);

class GreenHoverButton extends Button {
    constructor() {
        super()
        
        const style = document.createElement('style');
        
        style.textContent = 'button.monCss{background-color: white; color: black; border: 2px solid #04AA6D;} button.monCss:hover{background-color: #04AA6D; color: white;}';

        this.shadowRoot.appendChild(style);
    }
}
customElements.define('button-green', GreenHoverButton);

class RedHoverButton extends Button {
    constructor() {
        super()
        
        const style = document.createElement('style');
        
        style.textContent = 'button.monCss{background-color: white; color: black; border: 2px solid #AA0404;} button.monCss:hover{background-color: #AA0404; color: white;}';

        this.shadowRoot.appendChild(style);
    }
}
customElements.define('button-red', RedHoverButton);

class BlueHoverButton extends Button {
    constructor() {
        super()
        
        const style = document.createElement('style');
        
        style.textContent = 'button.monCss{background-color: white; color: black; border: 2px solid #6D04AA;} button.monCss:hover{background-color: #6D04AA; color: white;}';

        this.shadowRoot.appendChild(style);
    }
}
customElements.define('button-blue', BlueHoverButton);