import {
    Ball
} from './ball.js';

import {
    Block
} from './block.js';

import {
    Bar
} from './bar.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 10, 10);

        this.blocks = new Array();
        for(let i = 0; i < 15; i ++){
            this.blocks.push(new Block(50, 50, 10 + i * 55, 50));
            this.blocks.push(new Block(50, 50, 10 + i * 55, 105));
            this.blocks.push(new Block(50, 50, 10 + i * 55, 160));
        }

        this.bar = new Bar(200, 50, 300, 600);

        window.requestAnimationFrame(this.animate.bind(this));

        document.addEventListener('keydown', this.key_down.bind(this), false);
    }
    
    key_down(e) {
        if( e.key == "d") {
            this.bar.x += 50;
            this.bar.maxX += 50;
        }
        if( e.key == "a") {
            this.bar.x -= 50;
            this.bar.maxX -= 50;
        }
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
    }

    set_up(t) {
        window.requestAnimationFrame(this.animate.bind(this));
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.blocks.forEach((v)=>v.draw(this.ctx));
        this.bar.draw(this.ctx);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.blocks, this.bar);
    }
}

window.onload = () => {
    new App();
};
