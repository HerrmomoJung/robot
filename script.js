window.addEventListener("load", function () {

    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 800;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;

    const test1 = document.getElementById("test1");
    const context = test1.getContext("2d");
    test1.width = 600;
    test1.height = 800;
    context.strokeStyle = "red";
    context.lineWidth = 3;


    class Robot {
        constructor(canvas) {
            this.canvas = canvas;
            this.x = this.canvas.width * 0.5;
            this.y = this.canvas.height * 0.5;
            this.centerX = this.x;
            this.centerY = this.y;
            this.movementAngle = 0;
            this.radius = 80;
            this.angle = 0;
            this.spriteWidth = 370;
            this.spriteHeight = 393;
            this.framX = 0;
            this.bodyImage = document.getElementById("body");
            this.bodySpriteImage = document.getElementById("bodySprite");
            this.eye1Image = document.getElementById("eye1");
            this.eye2Image = document.getElementById("eye2");
            this.reflectionImage = document.getElementById("reflection");
            this.mouse = {
                x: 0,
                y: 0,
            }
            this.canvas.addEventListener("mousemove", e => {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
            });
        }

        draw(ctx) {
            // body
            ctx.drawImage(
                this.bodySpriteImage,
                this.framX * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x - this.bodyImage.width * 0.5 + 65,
                this.y - this.bodyImage.height * 0.5 - 53,
                this.spriteWidth,
                this.spriteHeight,
            );

            // eye1
            ctx.drawImage(
                this.eye1Image,
                this.x + Math.cos(this.angle) * this.radius * 0.35 - this.eye1Image.width * 0.5,
                this.y + Math.sin(this.angle) * this.radius * 0.35 - this.eye1Image.height * 0.5,
            );

            // eye2
            ctx.drawImage(
                this.eye2Image,
                this.x + Math.cos(this.angle) * this.radius * 0.65 - this.eye2Image.width * 0.5,
                this.y + Math.sin(this.angle) * this.radius * 0.65 - this.eye2Image.height * 0.5,
            );

            // reflection
            ctx.drawImage(
                this.reflectionImage,
                this.x - this.reflectionImage.width * 0.5,
                this.y - this.reflectionImage.height * 0.5,
            )


        }


        update() {
            // angel
            const dx = this.mouse.x - this.x;
            const dy = this.mouse.y - this.y;
            this.angle = Math.atan2(dy, dx);

            // sprite animation
            this.framX >= 75 ? this.framX = 0 : this.framX++;

            // movement
            this.movementAngle += 0.05;
            this.x = this.centerX + Math.cos(this.movementAngle * 0.25) * 100;
            this.y = this.centerY + Math.sin(this.movementAngle * 0.25) * 100;
        }

    }

    class Test {
        constructor(test1) {
            this.test1 = test1;
            this.x = this.test1.width * 0.25;
            this.y = this.test1.height * 0.25;
            this.mouse = {
                x: 0,
                y: 0,
            }
            this.test1.addEventListener("mousemove", e => {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
            });

        }
        testDraw(context) {
            context.beginPath();
            context.arc(this.x + Math.cos(this.angle) * 80 * 0.65 * 0.35, this.y, 80, 0, Math.PI * 2);
            context.stroke();
        }

        updateDraw() {
            const dx = this.mouse.x - this.x;
            const dy = this.mouse.y - this.y;
            this.angle = Math.atan2(dy, dx);
        }

    }


    const robot = new Robot(canvas);
    const test = new Test(test1)
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        robot.draw(ctx);
        robot.update();

        context.clearRect(0, 0, canvas.width, canvas.height);
        test.testDraw(context);
        test.updateDraw();

        requestAnimationFrame(animate);
    }

    animate();

})