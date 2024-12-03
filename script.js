document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startGame');
    const welcomeSection = document.getElementById('welcome');
    const gameSection = document.getElementById('game');
    const messageSection = document.getElementById('message');
    const typedMessage = document.getElementById('typedMessage');
    const explosion = document.getElementById('explosion');
    const dragonBalls = document.querySelectorAll('.dragon-ball');
    const startDecorations = document.querySelectorAll('#start-decorations .decoration');

    // Birthday Message
    const birthdayMessage = [
        "Happy 18th Birthday, Fayzaan!",
        "Today is such a special day because it’s all about you one of the most amazing people I know. I honestly don’t know where to start because there’s so much I want to say. You mean so much to me, more than words can ever fully explain.",
        " ",
        "You’ve brought so much light and happiness into my life, and I’m so grateful for you every single day. You’re not just kind and loving, you’re also incredibly thoughtful and caring. You always know how to make me smile, even on my hardest days. Just being around you or talking to you makes everything feel better.",
        " ",
        "I want you to know how proud I’m of the person you are. You’ve grown so much in the in the past 4 years since I met you into someone so special, and it’s just the beginning of everything amazing that’s waiting for you. You have so much potential and such an awesome future ahead even though you don’t see it I do, and I’m so excited to see all the incredible things that’ll happen.",
        " ",
        "Thank you for being you. Thank you for your love, your kindness, and all the little things you do that make such a big difference in my life. Thank you for always making me laughter, the support you give me, and the way you always make me feel cared for. You have such a big heart, and it’s one of the many reasons why you’re so special to me.",
        " ",
        "On this big day, I hope you feel all the love and joy you deserve. I hope it’s a day filled with happiness, laughter, and everything that makes you feel special because you truly are. ",
        " ",
        "Happy birthday Fayzaan! Here’s to celebrating you today and every day after because you’re hella worth it. I’m so lucky to have you in my life, and I’ll always be here for you, no matter what.",
        
    ];

    // Random Positioning for Start Decorations
    function randomizeDecorations() {
        startDecorations.forEach((decoration) => {
            decoration.style.left = `${Math.random() * 100}%`;
            decoration.style.animationDelay = `${Math.random() * 5}s`;
        });
    }

    // Set Initial Background
    document.body.classList.add('welcome-bg');

    // Randomize Initial Decorations
    randomizeDecorations();

    // Collected Balls Tracker
    let collectedBalls = 0;

    // Ball Click Handler
    function ballClickHandler(event) {
        const ball = event.target;
        ball.style.display = 'none';
        collectedBalls++;

        if (collectedBalls === dragonBalls.length) {
            startFadeOut();
        }
    }

    // Start Game
    startButton.addEventListener('click', () => {
        collectedBalls = 0; // Reset collected balls
        welcomeSection.classList.add('hidden');
        gameSection.classList.remove('hidden');

        // Change Background
        document.body.classList.remove('welcome-bg');
        document.body.classList.add('game-bg');

        // Reset and set up dragon balls
        dragonBalls.forEach((ball) => {
            ball.style.display = 'block';
            ball.style.opacity = '1';
            ball.style.pointerEvents = 'auto';
            ball.addEventListener('click', ballClickHandler);
        });

        moveDragonBalls();
    });

    // Move Dragon Balls Randomly
    function moveDragonBalls() {
        dragonBalls.forEach((ball) => {
            setInterval(() => {
                ball.style.top = `${Math.random() * 80}vh`;
                ball.style.left = `${Math.random() * 90}vw`;
            }, 2000); // Slower movement for better user experience
        });
    }

    function startFadeOut() {
        // Add a class to trigger full fade-out (including background)
        document.body.classList.add('total-fadeout');
    
        setTimeout(() => {
            triggerExplosion();
        }, 500); // Slight delay to ensure fade-out begins
    }
    
    function triggerExplosion() {
        explosion.classList.remove('hidden');
    
        setTimeout(() => {
            explosion.classList.add('hidden');
            document.body.classList.remove('total-fadeout');
            
            // Prepare for message background
            document.body.classList.add('message-transition');
            showMessage();
        }, 3500); // Total fade-out and explosion duration
    }
    
    function showMessage() {
        gameSection.classList.add('hidden');
        messageSection.classList.remove('hidden');
        
        // Remove game background, prepare for message background
        document.body.classList.remove('game-bg');
        document.body.classList.add('message-bg');
    
        // Start typing after background transition
        setTimeout(() => {
            typeMessage(birthdayMessage);
        }, 1500); // Quick fade-in duration
    }

    // Trigger Explosion and Show Message
    function triggerExplosion() {
        explosion.classList.remove('hidden');

        setTimeout(() => {
            explosion.classList.add('hidden');
            document.body.classList.remove('fading-out');
            document.body.classList.add('fading-in');
            showMessage();
        }, 3500);
    }

    // Show and Type the Birthday Message
    function showMessage() {
        gameSection.classList.add('hidden');
        messageSection.classList.remove('hidden');
        document.body.classList.remove('game-bg');
        document.body.classList.add('message-bg');
        typeMessage(birthdayMessage);
    }

    // Typing Effect for the Message
    function typeMessage(lines, index = 0) {
        if (index < lines.length) {
            const paragraph = document.createElement('p');
            typedMessage.appendChild(paragraph);

            let charIndex = 0;

            const interval = setInterval(() => {
                paragraph.textContent += lines[index][charIndex];
                charIndex++;

                if (charIndex === lines[index].length) {
                    clearInterval(interval);
                    setTimeout(() => typeMessage(lines, index + 1), 1500);
                }
            }, 100);
        }
    }
});