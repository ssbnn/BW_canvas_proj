class Ball{
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = {
            dx: 0,
            dy: 0,
        };
    }
    set_speed(dx, dy){
        this.speed.dx = dx;
        this.speed.dy = dy;
    }
    update() {
        this.x += this.speed.dx;
        this.y += this.speed.dy;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        this.update();
    }
}

class Speed {
    constructor(x, y) {
        this.xpeed = x;
        this.ypeed = y;
    }
    speedup(){
        this.xpeed += 2;
        this.ypeed += 2;
    }
}

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;
        this.canvas.style.width = this.stageWidth + "px";
        this.canvas.style.height = this.stageHeight + "px";

        this.make_ball();
        window.requestAnimationFrame(this.animate.bind(this));
    }
    x_speed = 10;
    y_speed = 10;
    make_ball() {
        this.Speed = new Speed(10,10);
        this.ball = new Ball(10, 10, 20);
        this.ball.set_speed(this.Speed.xpeed, this.Speed.ypeed);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.stageWidth, this.stageHeight);
        
        if(this.ball.x > this.stageWidth){
            this.ball.set_speed(this.x_speed*-1,this.y_speed);
        }
        if (this.ball.x < 0){
            this.ball.set_speed(this.x_speed,this.y_speed);
        }
        if (this.ball.y < 0){
            this.ball.set_speed(this.x_speed,this.y_speed*2);
        }
        if(this.ball.y > this.stageHeight){
            this.ball.set_speed(this.x_speed,this.y_speed*-2);
        }

        this.ball.draw(this.ctx);
    }
}

window.onload = () => {
    new App();
}
