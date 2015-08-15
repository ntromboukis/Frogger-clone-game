var X_STEP = 101,
    Y_STEP = 83;

// Enemies our player must avoid
var Enemy = function(speed,x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * (this.speed *100);
    if(this.x>505) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    if(this.x>404) {
        this.x = 404
    };
    if (this.x<0) {
        this.x = 0
    };
    if (this.y< -5) {
        this.y = -5
    };
    if (this.y>325) {
        this.y = 325
    };

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'left') {
        this.x -= X_STEP;
    }
    if (direction === 'right') {
        this.x += X_STEP;
    }
    if (direction === 'up') {
        this.y -= Y_STEP;
    }
    if (direction === 'down') {
        this.y += Y_STEP;
    }

};

Player.prototype.move = function(direction) {

};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 325;
}

var player = new Player(200,325);



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [];
var enemy1 = new Enemy(2,-100, 230);
var enemy2 = new Enemy(3,-300, 145);
var enemy3 = new Enemy(4,-500, 60);
allEnemies.push(enemy1, enemy2, enemy3);

var numLives = 5;

document.getElementById('lives').innerHTML = 'Number of lives: ' + numLives;

function checkCollisions() {
    for (enemy in allEnemies) {
        if ((player.x - allEnemies[enemy].x < 50 && player.y - allEnemies[enemy].y < 50) && (player.x - allEnemies[enemy].x > -50 && player.y - allEnemies[enemy].y > -50)) {
            player.reset();
            numLives -=1;
            console.log(numLives);
            if (numLives <= 0){
                confirm("Do you want 5 more lives?")
                numLives = 5;
                score = 0;
            };
            document.getElementById('lives').innerHTML = 'Number of lives: ' + numLives;
            document.getElementById('score').innerHTML = 'Score: ' + score;
            //$('#output').html(function(i, val) { return val -= 1 });
        };
    };
};

var score = 0;
document.getElementById('score').innerHTML = 'Score: ' + score;

function scoring() {
    if (player.y <= 0) {
        score += 100;
        player.reset();
        console.log(score);
        document.getElementById('score').innerHTML = 'Score: ' + score;
    };
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
