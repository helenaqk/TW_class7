class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        canvas.height = window.innerWidth*0.80;
        canvas.width = window.innerHeight*0.80;
        this.width = canvas.width;
        this.height = canvas.height;

        // Ball
        this.radius = 0.03*this.height;
        this.ballX = this.width / 2;
        this.ballY = this.height / 2;
        this.direction = [-1, 1];
        this.deg = Math.random() * 30 + 30;
        this.rad = this.deg * Math.PI / 180;
        this.index = Math.floor(Math.random() * 2);
        this.dir = this.direction[this.index];
        this.ballVelX = this.dir * 6 * Math.cos(this.rad);
        this.ballVelY = this.dir * 6 * Math.sin(this.rad);

        //  Paddles
        this.paddleSpeed = 0.0125*this.height;
        this.paddleWidth = 20;
        this.paddleHeight = 0.2*this.height;
        this.leftY = this.rightY = this.height / 2 - this.paddleHeight / 2;
        this.leftX = 100 - this.paddleWidth / 2;
        this.rightX = this.width - (100 - this.paddleWidth / 2);
        this.rightVel = this.leftVel = 0;

        // scores
        this.p1Score = 0;
        this.p2Score = 0;

        // State
        this.keys = {};
        this.bindKeys();
    }

    bindKeys() {
        window.addEventListener("keydown", e => this.keys[e.key] = true);
        window.addEventListener("keyup", e => this.keys[e.key] = false);
    }

    update() {
        // Left paddle movement
        if (this.keys["w"] || window.tiltX > 10) {
            this.leftVel = -this.paddleSpeed;
        } else if (this.keys["s"] || window.tiltX < -35){
            this.leftVel = this.paddleSpeed;
        } else {
            this.leftVel = 0;
        }

        // Bot right paddle
        const paddleCenter = this.rightY + this.paddleHeight / 2;
        const ballCenter = this.ballY;

        if (ballCenter > paddleCenter + 15) {
            this.rightVel = this.paddleSpeed;
        } else if (ballCenter < paddleCenter - 15) {
            this.rightVel = - this.paddleSpeed;
        } else {
            this.rightVel = 0;
        }   

        // Paddle & ball movement
        this.rightY += this.rightVel;
        this.leftY += this.leftVel;

        this.ballX += this.ballVelX;
        this.ballY += this.ballVelY;

        // Wall collision
            // Ball
        if (this.ballY - this.radius < 0 || this.ballY + this.radius > this.height) {
            this.ballVelY *= -1;
        }
            // right paddle
        if (this.rightY >= this.height - this.paddleHeight) {
            this.rightY = this.height - this.paddleHeight;
        }
        if (this.rightY <= 0) {
            this.rightY = 0;
        }
            // Left paddle
        if (this.leftY >= this.height - this.paddleHeight) {
            this.leftY = this.height - this.paddleHeight;
        }
        if (this.leftY <= 0) {
            this.leftY = 0;
        }

        // paddle-ball collision
        if (
            this.ballX >= this.leftX &&
            this.ballX <= this.leftX + this.paddleWidth &&
            this.ballY >= this.leftY &&
            this.ballY <= this.leftY + this.paddleHeight
        ) {
            this.ballX = this.leftX + this.paddleWidth;

            // Ramp up speed with each collision
            this.ballVelX *= -1.075;
            this.ballVelY *= 1.075;
            this.paddleSpeed *= 1.05;
        }
        if (
            this.ballX >= this.rightX &&
            this.ballX <= this.rightX + this.paddleWidth &&
            this.ballY >= this.rightY &&
            this.ballY <= this.rightY + this.paddleHeight
        ) {
            this.ballX = this.rightX;

            // Ramp up speed with each collision
            this.ballVelX *= -1.075;
            this.ballVelY *= 1.075;
            this.paddleSpeed *= 1.05;
        }

        if (this.ballX + this.radius <= 0) this.resetBall(1, "p2");
        if (this.ballX - this.radius >= this.width) this.resetBall(-1, "p1");
    }

    resetBall(dir, scorer) {
        if (scorer === "p1") this.p1Score++;
        else this.p2Score++;

        if (this.p1Score == 3) {
            alert("You win!");
            this.p1Score = 0;
            this.p2Score = 0;
        } else if (this.p2Score == 3) {
            alert("Bot wins!");
            this.p1Score = 0;
            this.p2Score = 0;
        }

        this.paddleSpeed = 5;
        this.ballX = this.width / 2;
        this.ballY = this.height / 2;
        this.deg = Math.random() * 30 + 30;
        this.rad = this.deg * Math.PI / 180;
        this.ballVelX = dir * 6 * Math.cos(this.rad);
        this.ballVelY = dir * 6 * Math.sin(this.rad);
    }

    draw() {
        const ctx = this.ctx;
        ctx.fillStyle = "rgb(5,5,5)";
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.ballX, this.ballY, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillRect(this.leftX, this.leftY, this.paddleWidth, this.paddleHeight);
        ctx.fillRect(this.rightX, this.rightY, this.paddleWidth, this.paddleHeight);

        ctx.font = "60px monospace";
        ctx.fillText(this.p1Score, ((this.width / 2) - 130), 80);
        ctx.fillText(this.p2Score, ((this.width / 2)) + 100, 80);
    }
}

const canvas = document.getElementById("pong");
const game = new Game(canvas);
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("startBtn");


function loop() {
    game.update();
    game.draw();
    requestAnimationFrame(loop);
}

startBtn.addEventListener("click", () => {
        requestAnimationFrame(loop);
        enableOrientation();
    });
