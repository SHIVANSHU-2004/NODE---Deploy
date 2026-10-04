const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const portfolioData = {
  name: "Shivanshu",
  role: "MCA student",
  email: "shivanshu@example.com",
  phone: "+91 00000 00000",
  address: "New Delhi, India",
  bloodGroup: "B+",
  skills: ["HTML", "CSS", "JavaScript", "C", "C++", "Java", "Python", "SQL", "Git"],
  projects: ["Student Attendance System", "Library Management", "Personal Portfolio"],
  goal: "I am open to internships, beginner-friendly projects, and software development opportunities.",
};

const canvas = document.querySelector("#heroCanvas");
const context = canvas?.getContext("2d");

function drawHeroPattern(time = 0) {
  if (!canvas || !context) return;

  const pixelRatio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
  canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, rect.width, rect.height);

  const grid = 34;
  context.lineWidth = 1;
  context.strokeStyle = "rgba(24, 33, 47, 0.08)";

  for (let x = 0; x <= rect.width; x += grid) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, rect.height);
    context.stroke();
  }

  for (let y = 0; y <= rect.height; y += grid) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(rect.width, y);
    context.stroke();
  }

  const nodes = [
    [0.12, 0.22, 22, "#007c7a"],
    [0.32, 0.18, 12, "#e15f4f"],
    [0.58, 0.22, 18, "#d7a629"],
    [0.82, 0.18, 26, "#18212f"],
    [0.74, 0.68, 16, "#007c7a"],
    [0.46, 0.72, 22, "#e15f4f"],
    [0.18, 0.74, 14, "#d7a629"],
  ];

  context.lineWidth = 2;
  context.strokeStyle = "rgba(24, 33, 47, 0.32)";
  context.beginPath();
  nodes.forEach(([x, y], index) => {
    const wave = Math.sin(time / 900 + index) * 8;
    const px = x * rect.width;
    const py = y * rect.height + wave;
    if (index === 0) context.moveTo(px, py);
    context.lineTo(px, py);
  });
  context.stroke();

  nodes.forEach(([x, y, radius, color], index) => {
    const pulse = Math.sin(time / 700 + index * 0.8) * 3;
    context.beginPath();
    context.arc(x * rect.width, y * rect.height + pulse, radius + pulse, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  });
}

let animationFrame;
function animate(time) {
  drawHeroPattern(time);
  animationFrame = window.requestAnimationFrame(animate);
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  drawHeroPattern();
} else {
  animationFrame = window.requestAnimationFrame(animate);
}

window.addEventListener("resize", () => drawHeroPattern());
window.addEventListener("beforeunload", () => {
  if (animationFrame) window.cancelAnimationFrame(animationFrame);
});

const chatToggle = document.querySelector(".chat-toggle");
const chatWindow = document.querySelector("#chatWindow");
const chatClose = document.querySelector(".chat-close");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatMessages = document.querySelector("#chatMessages");

function addMessage(text, type) {
  if (!chatMessages) return;
  const message = document.createElement("p");
  message.className = type === "user" ? "user-message" : "bot-message";
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function answerQuestion(question) {
  const text = question.toLowerCase();

  if (text.includes("email") || text.includes("mail")) {
    return `You can email ${portfolioData.name} at ${portfolioData.email}.`;
  }

  if (text.includes("phone") || text.includes("mobile") || text.includes("call")) {
    return `Phone number: ${portfolioData.phone}.`;
  }

  if (text.includes("address") || text.includes("location") || text.includes("map")) {
    return `Address: ${portfolioData.address}. The map is shown in the contact section.`;
  }

  if (text.includes("blood")) {
    return `Blood group: ${portfolioData.bloodGroup}.`;
  }

  if (text.includes("skill") || text.includes("technology") || text.includes("tech")) {
    return `${portfolioData.name}'s skills include ${portfolioData.skills.join(", ")}.`;
  }

  if (text.includes("project") || text.includes("work")) {
    return `Projects shown here: ${portfolioData.projects.join(", ")}.`;
  }

  if (text.includes("internship") || text.includes("hire") || text.includes("job")) {
    return portfolioData.goal;
  }

  if (text.includes("name") || text.includes("who")) {
    return `${portfolioData.name} is an ${portfolioData.role} learning software development and web technologies.`;
  }

  return "I can help with Shivanshu's skills, projects, contact details, address, blood group, and internship availability.";
}

function setChatOpen(open) {
  if (!chatWindow || !chatToggle) return;
  chatWindow.hidden = !open;
  chatToggle.hidden = open;
  chatToggle.setAttribute("aria-expanded", String(open));
  if (open && chatInput) chatInput.focus();
}

chatToggle?.addEventListener("click", () => setChatOpen(true));
chatClose?.addEventListener("click", () => setChatOpen(false));

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!chatInput) return;

  const question = chatInput.value.trim();
  if (!question) return;

  addMessage(question, "user");
  chatInput.value = "";
  window.setTimeout(() => addMessage(answerQuestion(question), "bot"), 180);
});
