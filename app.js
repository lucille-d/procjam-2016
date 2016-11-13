(function () {
    'use strict';

    const ctx = initCanvas();

    let stars = [];
    let accelerating = false;

    window.addEventListener('resize', () => {
        setCanvasToWindowSize();
        const ctx = initCanvas();
        update(ctx, stars);
    });

    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 32) { //spacebar
            accelerating = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.keyCode === 32) {
            accelerating = false;
        }
    });

    generateStars(ctx, stars);

    update(ctx, stars);

    function update(ctx, stars) {
        generateStars(ctx, stars);
        stars = moveStars(ctx, stars);
        renderStars(ctx, stars);
        requestAnimationFrame(() => update(ctx, stars));
    }

    function generateStars(ctx, stars) {
        if (random(0, 1) > (accelerating ? 0.01 : 4) / 10) {
            const radius = random(1, 4);
            const goingLeft = random(0, 1) > 0.5;
            const goingUp = random(0, 1) > 0.5;

            stars.push({
                x: ctx.canvas.width / 2,
                y: ctx.canvas.height / 2,
                radius: radius,
                xVelocity: (goingLeft ? -1 : 1) * radius * random(1, radius + 20) / 10,
                yVelocity: (goingUp ? -1 : 1) * radius * random(1, radius + 20) / 10
            });
        }
    }

    function moveStars(ctx, stars) {
        const stillVisibleStars = [];
        stars.forEach((star) => {
            star.x += star.xVelocity * (accelerating ? 5 : 1);
            star.y += star.yVelocity * (accelerating ? 5 : 1);

            if (star.x > 0 && star.x < ctx.canvas.width &&
                star.y > 0 && star.y < ctx.canvas.height) {
                stillVisibleStars.push(star);
            }
        });
        return stillVisibleStars;
    }

    function renderStars(ctx, stars) {
        clearCanvas(ctx);
        stars.forEach((star) => {
            drawStar(ctx, star.x, star.y, star.radius);
        });
    }

    function initCanvas() {
        const canvas = document.getElementById('canvas');
        setCanvasToWindowSize();
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        return ctx;
    }

    function drawStar(ctx, xPos, yPos, radius) {
        ctx.beginPath();
        ctx.arc(xPos, yPos, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    /* Util */

    function setCanvasToWindowSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function clearCanvas(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }
})();