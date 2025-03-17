const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];
const dotCount = 50;
const maxDistance = 150;
const mouse = { x: null, y: null, radius: 100 };

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
});

class Dot {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.originalVx = this.vx;
        this.originalVy = this.vy;
        this.radius = Math.random() * 3 + 2;
    }
    
    move() {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            let angle = Math.atan2(dy, dx);
            this.vx = Math.cos(angle) * 2;
            this.vy = Math.sin(angle) * 2;
        } else {
            this.vx += (this.originalVx - this.vx) * 0.05;
            this.vy += (this.originalVy - this.vy) * 0.05;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#1E90FF";
        ctx.fill();
    }
}

function createDots() {
    for (let i = 0; i < dotCount; i++) {
        dots.push(new Dot());
    }
}

function connectDots() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            let dx = dots[i].x - dots[j].x;
            let dy = dots[i].y - dots[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        dot.move();
        dot.draw();
    });
    connectDots();
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = [];
    createDots();
});

createDots();
animate();