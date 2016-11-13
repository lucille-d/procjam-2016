(function () {
    'use strict';

    const ctx = initCanvas();

    let stars = [];
    let accelerating = false;

    generateStars(ctx, stars);


    update(ctx, stars);

    function update(ctx, stars) {
        generateStars(ctx, stars);
        stars = moveStars(ctx, stars);
        renderStars(ctx, stars);
        requestAnimationFrame(() => update(ctx, stars));
    }

    function generateStars(ctx, stars) {
        stars.push({
            x: ctx.canvas.width / 2,
            y: ctx.canvas.height / 2,
            radius: randomInt(1, 4),
            xVelocity: randomInt(-3, 3),
            yVelocity: randomInt(-3, 3)
        })
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

        window.addEventListener('resize', () => {
            setCanvasToWindowSize();
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

        function setCanvasToWindowSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        return ctx;
    }

    function drawStar(ctx, xPos, yPos, radius) {
        ctx.beginPath();
        ctx.arc(xPos, yPos, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    /* Util */
    function clearCanvas(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function randomInt(min, max) {
        return Math.random() * (max - min) + min;
    }

})();