const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const copyEmailButton = document.querySelector(".copy-email");
const ambientDots = document.querySelector(".ambient-dots");
const revealItems = document.querySelectorAll(".reveal");

root.classList.add("js");

function seededRandom(seed) {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

function createAmbientDots() {
	const rows = 8;
	const cols = 8;
	const colors = ["37, 99, 235", "30, 58, 138", "96, 165, 250"];

	for (let row = 0; row < rows; row += 1) {
		for (let col = 0; col < cols; col += 1) {
			const index = row * cols + col;
			const dot = document.createElement("span");
			const jitterX = (seededRandom(index + 11) - 0.5) * 7.5;
			const jitterY = (seededRandom(index + 29) - 0.5) * 7.5;
			const left = ((col + 0.5) / cols) * 100 + jitterX;
			const top = ((row + 0.5) / rows) * 100 + jitterY;
			const size = 3.5 + seededRandom(index + 47) * 2.8;
			const alpha = 0.16 + seededRandom(index + 71) * 0.22;
			const duration = 16 + seededRandom(index + 89) * 18;
			const delay = -seededRandom(index + 101) * duration;
			const movement = 24 + seededRandom(index + 131) * 42;

			dot.className = "ambient-dot";
			dot.style.setProperty("--left", `${Math.min(96, Math.max(4, left))}%`);
			dot.style.setProperty("--top", `${Math.min(96, Math.max(4, top))}%`);
			dot.style.setProperty("--size", `${size.toFixed(2)}px`);
			dot.style.setProperty("--alpha", alpha.toFixed(2));
			dot.style.setProperty("--duration", `${duration.toFixed(2)}s`);
			dot.style.setProperty("--delay", `${delay.toFixed(2)}s`);
			dot.style.setProperty("--dot-color", colors[index % colors.length]);
			dot.style.setProperty("--move-a-x", `${(seededRandom(index + 149) - 0.5) * movement}px`);
			dot.style.setProperty("--move-a-y", `${(seededRandom(index + 167) - 0.5) * movement}px`);
			dot.style.setProperty("--move-b-x", `${(seededRandom(index + 181) - 0.5) * movement}px`);
			dot.style.setProperty("--move-b-y", `${(seededRandom(index + 199) - 0.5) * movement}px`);
			dot.style.setProperty("--move-c-x", `${(seededRandom(index + 211) - 0.5) * movement}px`);
			dot.style.setProperty("--move-c-y", `${(seededRandom(index + 229) - 0.5) * movement}px`);

			ambientDots.append(dot);
		}
	}
}

createAmbientDots();

const storedTheme = localStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const initialTheme = storedTheme || preferredTheme;

function setTheme(theme) {
	const themeIcon = themeToggle.querySelector(".theme-icon");

	root.dataset.theme = theme;
	themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
	themeIcon.textContent = theme === "dark" ? "☀" : "☾";
	themeIcon.classList.toggle("is-moon", themeIcon.textContent === "☾");
	localStorage.setItem("theme", theme);
}

setTheme(initialTheme);

themeToggle.addEventListener("click", () => {
	setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

copyEmailButton.addEventListener("click", async () => {
	const icon = copyEmailButton.querySelector("span");
	const originalIcon = icon.textContent;
	const originalLabel = copyEmailButton.getAttribute("aria-label");
	const email = copyEmailButton.dataset.copy;

	try {
		await navigator.clipboard.writeText(email);
		icon.textContent = "✓";
		copyEmailButton.setAttribute("aria-label", "Email address copied");
	} catch {
		window.location.href = `mailto:${email}`;
	}

	window.setTimeout(() => {
		icon.textContent = originalIcon;
		copyEmailButton.setAttribute("aria-label", originalLabel);
	}, 1400);
});

if ("IntersectionObserver" in window) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.14 });

	revealItems.forEach((item) => observer.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add("is-visible"));
}
