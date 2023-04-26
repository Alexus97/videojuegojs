window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1'); //traemos el elemento
    const ctx = canvas.getContext('2d'); //En que dimension vamos a pintar en el lienzo
    //definimos los pixeles de el lienzo width y height
    canvas.width = 1280;
    canvas.height = 720;

    ctx.fillStyle = 'white'; //rellenar
    ctx.lineWidth = 3; //trazado
    ctx.strokeStyle = 'white';

    class Player {//jugador
        constructor(game){
            this.game = game;
            this.collisionX = this.game.width * 0.5;
            this.collisionY = this.game.height * 0.5;
            this.collisionRadius = 50;
            this.speedX = 0; //Dar veloccidad al gamer de manera vertical y horizontal.
            this.speedY = 0;
            this.dx = 0; //create class properties
            this.dy = 0; //interponer distancia entre el mouse y el player.
            this.speedModifier = 20;
        }
        draw(context){
            context.beginPath();
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            context.save();
            context.globalAlpha = 0.5;// generated opaciti
            context.fill();
            context.restore();
            context.stroke();
            context.beginPath();
            context.moveTo(this.collisionX, this.collisionY);
            context.lineTo(this.game.mouse.x, this.game.mouse.y);
            context.stroke();
            
        }
        update(){//making the player movie, se crea metodo personalizado
            this.dx = this.game.mouse.x - this.collisionX;
            this.dy = this.game.mouse.y - this.collisionY;
            const distance =  Math.hypot(this.dy, this.dx);
            if (distance > this.speedModifier) {
                this.speedX = this.dx/distance || 0; // Calcular veloccidad
                this.speedY = this.dy/distance || 0;
            } else {
                this.speedX = 0;
                this.speedY = 0;
            }
            this.collisionX += this.speedX * this.speedModifier;
            this.collisionY += this.speedY * this.speedModifier;


        }
    }
    //creating obstacles
    class Obstacle {
        constructor(game) {
            this.game = game;
            this.collisionX = Math.random() * this.game.width;
            this.collisionY = Math.random() * this.game.height;
            this.collisionRadius = 60;
        }
        draw(context) {//Metodo de dibujo
            context.beginPath();
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            context.save();
            context.globalAlpha = 0.5;// generated opaciti
            context.fill();
            context.restore();
            context.stroke();
        }
    }

    class Game {//administrador
        constructor(canvas){
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.player = new Player(this);
            this.numberOfObstacles = 5;
            this.obstacles = []; //matriz vacia.
            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed: false
            }

            // event listeners
            canvas.addEventListener('mousedown', e => {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = true;
            });
            canvas.addEventListener('mouseup', e => {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = false;
            });
            canvas.addEventListener('mousemove', e => {
                if(this.mouse.pressed){
                    this.mouse.x = e.offsetX;
                    this.mouse.y = e.offsetY;
                }
            });
        }
        render(context){//este metodo dibujara y actualizara todos los objects en el juego.
            this.player.draw(context);
            this.player.update();//se llama desde adentro para renderizar   hacia abajo es decir de arriba a baj
            this.obstacles.forEach(obstacle => obstacle.draw(context));
        }
        init(){//Metodo personalizado.
            for(let i = 0; i < this.numberOfObstacles; i++){
                this.obstacles.push(new Obstacle(this));
            }
        }

    }

    const game = new Game(canvas);
    game.init();
    console.log(game)

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);//limpiamos el lienzo.
        game.render(ctx);
        window.requestAnimationFrame(animate);//creamos un bucle de animacion con el metodo

    }
    animate();
});

/** forma larga
this.speedX = (this.game.mouse.x - this.collisionX)/20; // Calcular veloccidad
this.speedY = (this.game.mouse.y - this.collisionY)/20;
this.collisionX += this.speedX;
this.collisionY += this.speedY;
*/


