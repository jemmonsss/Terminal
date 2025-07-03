const input = document.getElementById("commandInput");
const output = document.getElementById("output");

let history = [];
let historyIndex = 0;

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const sounds = {
  execute: new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"),
  type: new Audio("https://actions.google.com/sounds/v1/foley/typewriter_key.ogg"),
  matrix: new Audio("https://actions.google.com/sounds/v1/ambiences/office_room_background.ogg"),
  konami: new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg")
};

function playSound(name, loop = false) {
  if (sounds[name]) {
    const sfx = sounds[name].cloneNode();
    sfx.loop = loop;
    sfx.volume = 0.4;
    sfx.play();
    return sfx;
  }
}

const commands = {
  help: [
    "Available commands:",
    "help              - Show this help message",
    "sudo love         - Get some love ❤️",
    "cat life.txt      - Show the meaning of life",
    "hack google       - Attempt to hack Google",
    "clear             - Clear the screen",
    "self-destruct     - Don't. Just don't.",
    "rm -rf /          - Dangerous... or is it?",
    "fortune           - Get a deep thought",
    "sudo make me a sandwich - You’ll see...",
    "ascii doge        - Much wow. Very art.",
    "exit              - Try to leave...",
    "flip table        - Flip the table in rage",
    "matrix            - Initiate matrix mode",
    "run legacy.exe    - [REDACTED]"
  ],
  "sudo love": ["Access granted. ❤️ You are loved."],
  "cat life.txt": ["42. That’s it. That’s the whole file."],
  "hack google": [
    "Connecting to Google servers...",
    "Bypassing firewalls...",
    "Launching nukes...",
    "Just kidding 😏"
  ],
  clear: ["__CLEAR__"],
  "self-destruct": [
    "⚠️ Self-destruction initiated...",
    "3...",
    "2...",
    "1...",
    "💥 Nah, you're not getting rid of me that easy."
  ],
  "rm -rf /": [
    "Deleting system32...",
    "Removing your dignity...",
    "jk. Nothing happened."
  ],
  fortune: [
    "🐸: Time is a construct. Use it wisely.",
    "🤡: Life is short. Use semicolons.",
    "🐱: Meow means 'I love you' in cat."
  ],
  "sudo make me a sandwich": ["Okay. 🥪 Done. You're welcome."],
  "ascii doge": [
    "┏━┓┏━┓┏━┓┏┓┏",
    "┃┃┃┃┃┃┃┃┃┃┃┃",
    "┃┃┃┃┃┃┃┃┃┃┃┃  ← wow",
    "┃┃┃┃┃┃┃┃┃┃┃┃  ← much code",
    "┗┛┗┛┗┛┗┛┗┛┗┛  ← such JS"
  ],
  exit: [
    "You can check out any time you like...",
    "But you can never leave. 🎸"
  ],
  "flip table": ["(╯°□°）╯︵ ┻━┻"],
  matrix: ["__MATRIX__"],
  "run legacy.exe": ["Launching... Please wait... 🚀", "__RICKROLL__"],
  "i am the admin": ["🛡️ Access granted. Welcome, overlord."],
  "xyzzy": ["A hollow voice says 'Plugh'. Nothing happens."],
  "open the pod bay doors": ["I'm sorry, Dave. I'm afraid I can't do that."]
};

function typeLines(lines, i = 0) {
  if (i >= lines.length) return;

  const line = document.createElement("div");
  output.appendChild(line);

  const text = lines[i];
  let charIndex = 0;
  const typeSFX = playSound("type", true); // loop while typing

  const interval = setInterval(() => {
    line.textContent += text[charIndex++];
    window.scrollTo(0, document.body.scrollHeight);

    if (charIndex >= text.length) {
      clearInterval(interval);
      typeSFX.pause();
      typeSFX.remove();

      if (text === "__RICKROLL__") {
        rickroll();
      } else if (text === "__MATRIX__") {
        startMatrix();
      } else {
        typeLines(lines, i + 1);
      }
    }
  }, 30);
}

function handleCommand(cmd) {
  const line = document.createElement("div");
  line.innerHTML = `<span class="prompt">root@mainframe:~$</span> ${cmd}`;
  output.appendChild(line);

  playSound("execute");

  const response = commands[cmd.toLowerCase()];
  if (response) {
    if (response[0] === "__CLEAR__") {
      output.innerHTML = "";
    } else {
      typeLines(response);
    }
  } else {
    typeLines([`Command not found: ${cmd}`]);
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    if (cmd) {
      history.push(cmd);
      historyIndex = history.length;
      handleCommand(cmd);
    }
    input.value = "";
  } else if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
  } else if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      input.value = "";
    }
  }
});

function startMatrix() {
  const matrixCanvas = document.createElement("canvas");
  matrixCanvas.style.position = "fixed";
  matrixCanvas.style.top = "0";
  matrixCanvas.style.left = "0";
  matrixCanvas.style.width = "100%";
  matrixCanvas.style.height = "100%";
  matrixCanvas.style.pointerEvents = "none";
  matrixCanvas.style.zIndex = "1000";
  document.body.appendChild(matrixCanvas);

  const ctx = matrixCanvas.getContext("2d");
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;

  const letters = "アァイィウエカガキギクケサザシジスズセソタチッツナニヌネノハヒフヘホマミムメモヤユヨラリルレロワンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%#*+@!".split("");
  const fontSize = 14;
  const columns = Math.floor(matrixCanvas.width / fontSize);
  const drops = Array(columns).fill(1);

  let animationId;
  const draw = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const char = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
    }

    animationId = requestAnimationFrame(draw);
  };

  const bgSound = playSound("matrix", true);
  draw();

  setTimeout(() => {
    cancelAnimationFrame(animationId);
    matrixCanvas.remove();
    bgSound.pause();
    bgSound.remove();
  }, 10000);
}

function rickroll() {
  const win = window.open(
    "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0",
    "_blank"
  );
  if (!win) {
    typeLines(["😅 Pop-up blocked! Click here instead: https://youtu.be/dQw4w9WgXcQ"]);
  }
}

const konamiCode = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      konamiActivated();
    }
  } else {
    konamiIndex = 0;
  }
});

function konamiActivated() {
  typeLines(["👾 Konami Code accepted. Welcome to GOD MODE."]);
  document.body.style.background = "linear-gradient(to bottom, #000, #0f0)";
  playSound("konami");
}

typeLines([
  "💻 Initializing hacker terminal v3.0...",
  "🧠 Loading sarcasm modules...",
  "🤖 Injecting simulated intelligence...",
  "✅ Ready. Type 'help' to begin your descent into madness."
]);
