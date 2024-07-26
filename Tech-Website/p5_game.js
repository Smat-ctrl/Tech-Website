                let fighter;
                let fighterImg;
                let backgroundImg;
                let projectiles = [];
                let asteroids = [];
                let messages = [
                    "I Know JAVA!",
                    "I Know Vanilla JS",
                    "I Know HTML",
                    "I Know CSS",
                    "I Know Python -> Selenium -> Openpxyl -> Panda",
                    "I Know C",
                    "I Know P5.js",
                    "I Know React",
                    "I Know Racket",
                    "I Know Bootstrap",
                    "I Know GSAP"
                ];
                let messageIndex = 0;
                let showMessage = false;
                let gameStarted = false;
        
                function preload() {
                    fighterImg = loadImage('assets/fighter.png');
                    backgroundImg = loadImage('assets/Background.png');
                }
        
                function setup() {
                    let canvas = createCanvas(1200, 600);
                    canvas.parent('p5-container');
                    initializeGame();
                    noLoop(); // Do not start the draw loop until the game starts
                }
        
                function draw() {
                    if (!gameStarted) return;
        
                    background(0);
        
                    fighter.show();
                    fighter.move();
        
                    for (let i = projectiles.length - 1; i >= 0; i--) {
                        projectiles[i].move();
                        projectiles[i].show();
                        for (let j = asteroids.length - 1; j >= 0; j--) {
                            if (projectiles[i].hits(asteroids[j])) {
                                asteroids.splice(j, 1);
                                projectiles.splice(i, 1);
                                showMessage = true;
                                if (messageIndex < messages.length) {
                                    break;
                                }
                            }
                        }
                    }
        
                    for (let i = asteroids.length - 1; i >= 0; i--) {
                        asteroids[i].move();
                        asteroids[i].show();
                        if (asteroids[i].y > height) {
                            asteroids.splice(i, 1);
                            asteroids.push(new Asteroid());
                        }
                    }
        
                    if (showMessage && messageIndex < messages.length) {
                        fill(255);
                        textSize(32);
                        text(messages[messageIndex], (width / 2) - 80, height / 2);
                        noLoop();
                    } else if (messageIndex >= messages.length) {
                        fill(255);
                        textSize(32);
                        text("These are most of the compsci skills I have acquired", (width / 2) - 250, height / 2);
                        noLoop();
                    }
                }
        
                function keyPressed() {
                    if (key === 's' && gameStarted) {
                        let projectile = new Projectile(fighter.x + 50, height - 60);
                        projectiles.push(projectile);
                    }
                    if (keyCode === ENTER && showMessage) {
                        messageIndex++;
                        showMessage = false;
                        loop();
                    }
                }
        
                class Fighter {
                    constructor() {
                        this.x = width / 2;
                    }
        
                    show() {
                        image(fighterImg, this.x, height - 100, 100, 100);
                    }
        
                    move() {
                        if (keyIsDown(LEFT_ARROW)) {
                            this.x -= 5;
                        }
                        if (keyIsDown(RIGHT_ARROW)) {
                            this.x += 5;
                        }
                    }
                }
        
                class Projectile {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                    }
        
                    move() {
                        this.y -= 5;
                    }
        
                    show() {
                        fill(50, 150, 255);
                        ellipse(this.x, this.y, 10, 10);
                    }
        
                    hits(asteroid) {
                        let d = dist(this.x, this.y, asteroid.x, asteroid.y);
                        return d < 25;
                    }
                }
        
                class Asteroid {
                    constructor() {
                        this.x = random(width);
                        this.y = random(-100, -10);
                        this.speed = random(2, 5);
                    }
        
                    move() {
                        this.y += this.speed;
                    }
        
                    show() {
                        fill(255, 0, 100);
                        ellipse(this.x, this.y, 50, 50);
                    }
                }
        
                // Initialize the game state
                function initializeGame() {
                    fighter = new Fighter();
                    projectiles = [];
                    asteroids = [];
                    messageIndex = 0;
                    showMessage = false;
                    for (let i = 0; i < 13; i++) {
                        asteroids.push(new Asteroid());
                    }
                    background(0);
                    image(backgroundImg, 0, 0, width, height);
                }
        
                // Start the game when the start button is clicked
                document.getElementById('start-button').addEventListener('click', function() {
                    gameStarted = true;
                    loop();
                });
        
                // Reset the game when the reset button is clicked
                document.getElementById('reset-button').addEventListener('click', function() {
                    gameStarted = false;
                    initializeGame();
                    noLoop();
                });
            