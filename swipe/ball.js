export class Ball {
    constructor(staeWidth, stageHeight, radius, speed) {
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;

        const diameter = this.radius * 2;
        this.x = diameter + (Math.random() * staeWidth - diameter);
        this.y = diameter + (Math.random() * stageHeight - diameter);
    }

    draw(ctx, staeWidth, stageHeight, blocks, bar) {
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(staeWidth, stageHeight);

        this.bounceBlock(blocks);
        
        this.bounceBar(bar);

        ctx.fillStyle = '#fdd700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    bounceWindow(staeWidth, stageHeight) {
        const minX = this.radius;
        const maxX = staeWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;

        if (this.x <= minX || this.x >= maxX) {
            this.vx *= -1;
            this.x += this.vx;
        }
        else if (this.y <= minY) {
            this.vy *= -1;
            this.y += this.vy;
        }
        else if (this.y >= maxY){
            console.warn("game over");
        }
    }

    bounceBar(bar) {
        const minX = bar.x - this.radius;
        const maxX = bar.maxX + this.radius;
        const minY = bar.y - this.radius;
        const maxY = bar.maxY + this.radius;

        if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(this.x - maxX);
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(this.y - maxY);
            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            if (min == x2) {
                this.vx *= -1.0;
                this.x += this.vx;
            }
            else if (min == x1) {
                this.vx *= -1.0;
                this.x += this.vx;
            }
            else if (min == y2) {
                this.vy *= -1.0;
                this.y += this.vy;
            }
            else if (min == y1) {
                this.vy *= -1.0;
                this.y += this.vy;
            }
        }
    }

    bounceBlock(blocks) {
        for (let i = 0; i < blocks.length; i++){
            const block = blocks[i];
            if (block.hit) { continue }
            const minX = block.x - this.radius;
            const maxX = block.maxX + this.radius;
            const minY = block.y - this.radius;
            const maxY = block.maxY + this.radius;

            if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
                const x1 = Math.abs(minX - this.x);
                const x2 = Math.abs(this.x - maxX);
                const y1 = Math.abs(minY - this.y);
                const y2 = Math.abs(this.y - maxY);
                const min1 = Math.min(x1, x2);
                const min2 = Math.min(y1, y2);
                const min = Math.min(min1, min2);

                if (min == x2) {
                    block.hit = true;

                    this.vx *= -1.0;
                    this.x += this.vx;
                }
                else if (min == x1) {
                    block.hit = true;
                    
                    this.vx *= -1.0;
                    this.x += this.vx;
                }
                else if (min == y2) {
                    block.hit = true;

                    this.vy *= -1.0;
                    this.y += this.vy;
                }
                else if (min == y1) {
                    block.hit = true;

                    this.vy *= -1.0;
                    this.y += this.vy;
                }
            }
        }
    }
}