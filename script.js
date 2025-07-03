const input = document.getElementById("commandInput");
const output = document.getElementById("output");
const bootup = document.getElementById("bootup");
let history = [];
let historyIndex = 0;

const commands = {
  help: [
    "Available commands:",
    "help         - Show this help message",
    "sudo love    - Get some love ❤️",
    "cat life.txt - Show the meaning of life",
    "hack google  - Attempt to hack Google (fail)",
    "clear        - Clear the screen",
    "self-destruct - Initiate self destruction (not recommended)",
  ],
  "sudo love": ["Access granted. ❤️ You are loved."],
  "cat life.txt": ["42. That’s it. That’s the whole file."],
  "hack google": [
    "Connecting to Google servers...",
    "Bypassing firewall...",
    "Just kidding. You can't hack Google 😏"
  ],
  clear: ["__CLEAR__"],
  "self-destruct": [
    "Initiating self-destruction sequence...",
    "3...",
    "2...",
    "1...",
    "💥 Just kidding. I'm still here."
  ]
};

function typeLines(lines, i = 0) {
  if (i >= lines.length) return;
  const line = document.createElement("div");
  output.appendChild(line);

  let charIndex = 0;
  const interval = setInterval(() => {
    line.textContent += lines[i][charIndex++];
    if (charIndex === lines[i].length) {
      clearInterval(interval);
      typeLines(lines, i + 1);
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, 30);
}

function handleCommand(cmd) {
  const line = document.createElement("div");
  line.innerHTML = `<span class="prompt">root@mainframe:~$</span> ${cmd}`;
  output.appendChild(line);

  const response = commands[cmd];
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

// Boot-up sequence
const bootLines = [
  "Booting up terminal interface...",
  "Loading AI joke modules...",
  "Establishing secure connection to imagination...",
  "Terminal ready. Type 'help' to begin."
];

typeLines(bootLines);
