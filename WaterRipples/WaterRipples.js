 document.addEventListener("DOMContentLoaded", function () {
            const canvas = document.getElementById("rippleCanvas");
            const ctx = canvas.getContext("2d");
            const background = document.getElementById("background");
            let ripples = [];
            
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            function createRipple(x, y, strength = 1) {
                ripples.push({ 
                    x, 
                    y, 
                    radius: 0, 
                    alpha: 1, 
                    growthRate: 8 * strength,
                    color: `hsl(${Math.random() * 360}, 100%, 70%)`
                });
            }

            function drawRipples() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ripples.forEach((ripple, index) => {
                    ctx.beginPath();
                    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                    ctx.strokeStyle = ripple.color;
                    ctx.lineWidth = 3;
                    ctx.globalAlpha = ripple.alpha;
                    ctx.stroke();
                    
                    ripple.radius += ripple.growthRate;
                    ripple.alpha *= 0.96;
                    ripple.growthRate *= 0.98;
                    
                    if (ripple.alpha <= 0.02) ripples.splice(index, 1);
                });
            }

            function animate() {
                drawRipples();
                requestAnimationFrame(animate);
            }
            
            background.addEventListener("mousemove", (e) => {
                const rect = canvas.getBoundingClientRect();
                createRipple(e.clientX - rect.left, e.clientY - rect.top, 0.2);
            });
            
            background.addEventListener("mousedown", (e) => {
                const rect = canvas.getBoundingClientRect();
                createRipple(e.clientX - rect.left, e.clientY - rect.top, 1.5);
            });
            
            animate();
});