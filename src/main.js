const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const languageButtons = document.querySelectorAll(".language-option");
const copyEmailButton = document.querySelector(".copy-email");
const ambientDots = document.querySelector(".ambient-dots");
const revealItems = document.querySelectorAll(".reveal");

const translations = {
	en: {
		"meta.title": "Nikolay Vavilov | Backend Engineer",
		"meta.description": "Nikolay Vavilov, backend engineer focused on Python, enterprise integrations, and practical LLM systems.",
		"brand.aria": "Nikolay Vavilov home",
		"nav.aria": "Primary navigation",
		"nav.about": "About",
		"nav.focus": "Focus",
		"nav.stack": "Stack",
		"language.aria": "Language",
		"theme.aria": "Switch color theme",
		"hero.eyebrow": "Backend Software Engineer",
		"hero.text": "I build backend systems, automation tools, integrations, and practical LLM-powered services. 15+ years in software development, 5+ years with Python.",
		"hero.actions": "Contact and profile links",
		"email.copy": "Copy email address",
		"email.copied": "Email address copied",
		"summary.aria": "Profile summary",
		"summary.title": "Engineering profile",
		"summary.text": "Backend engineer focused on Python, scalable APIs, enterprise integrations, and applied LLM systems. I combine hands-on engineering experience with team leadership background and a strong business software foundation.",
		"summary.note": "I am especially interested in LLM-powered development, AI tooling, and agent workflows, and I keep exploring this area through personal projects and experiments.",
		"focus.eyebrow": "Focus",
		"focus.backend.title": "Backend systems",
		"focus.backend.text": "Backend for web services, microservices, integration solutions, queues, and background data processing.",
		"focus.integrations.title": "Enterprise integrations",
		"focus.integrations.text": "API and backend development for corporate portals, internal services, parsing, notifications, business-process automation, and mail management services.",
		"focus.llm.title": "LLM applications",
		"focus.llm.text": "RAG systems, AI assistants, prompt engineering, internal AI helper tools, AI agent harness setup, and practical enterprise LLM integrations.",
		"focus.quality.title": "Engineering quality",
		"focus.quality.text": "Testing, CI/CD, observability, code reviews, mentoring, architecture decisions, and maintainable delivery practices.",
		"stack.eyebrow": "Stack",
		"stack.python.aria": "Python technologies",
		"stack.databases": "Databases",
		"stack.databases.aria": "Database technologies",
		"stack.queues": "Queues & Brokers",
		"stack.queues.aria": "Queue and broker technologies",
		"stack.ai": "AI & ETL",
		"stack.ai.aria": "AI and ETL technologies",
		"stack.infrastructure": "Infrastructure",
		"stack.infrastructure.aria": "Infrastructure technologies",
		"stack.additional": "Additional languages",
		"stack.additional.aria": "Additional programming languages",
		"stack.go": "Go (basic)",
		"stack.javascript": "JavaScript (basic)",
		"stack.onec": "",
		"footer.status": "Open for remote work.<br>Right now located in Bishkek, KG.",
		"footer.aria": "External links",
	},
	ru: {
		"meta.title": "Николай Вавилов | Backend Engineer",
		"meta.description": "Николай Вавилов, backend engineer с фокусом на Python, корпоративные интеграции и практические LLM-системы.",
		"brand.aria": "Главная Николая Вавилова",
		"nav.aria": "Основная навигация",
		"nav.about": "Обо мне",
		"nav.focus": "Фокус",
		"nav.stack": "Стек",
		"language.aria": "Язык",
		"theme.aria": "Переключить цветовую тему",
		"hero.eyebrow": "Backend Software Engineer",
		"hero.text": "Разрабатываю backend-системы, инструменты автоматизации, интеграции и практические сервисы на базе LLM. 15+ лет в разработке ПО, 5+ лет с Python.",
		"hero.actions": "Контакты и профили",
		"email.copy": "Скопировать email",
		"email.copied": "Email скопирован",
		"summary.aria": "Краткое описание профиля",
		"summary.title": "Engineering profile",
		"summary.text": "Backend engineer с фокусом на Python, масштабируемые API, корпоративные интеграции и прикладные LLM-системы. Сочетаю практический инженерный опыт, опыт тимлидства и хорошее понимание бизнес-доменов.",
		"summary.note": "Имею значительный опыт работы с платформой 1С и могу помочь с интеграционными проектами, а также с доработкой конфигураций на БСП.",
		"focus.eyebrow": "Фокус",
		"focus.backend.title": "Backend systems",
		"focus.backend.text": "Backend для веб-сервисов, микросервисов, интеграционных решений, очередей и фоновой обработки данных.",
		"focus.integrations.title": "Enterprise integrations",
		"focus.integrations.text": "Разработка API и backend для корпоративных порталов, внутренних сервисов, парсинга, уведомлений, автоматизации бизнес-процессов и сервисов управления корпоративной перепиской.",
		"focus.llm.title": "LLM applications",
		"focus.llm.text": "RAG-системы, AI-ассистенты, prompt engineering, внутренние AI-инструменты, настройка harness для AI-агентов и практические LLM-интеграции для бизнеса.",
		"focus.quality.title": "Engineering quality",
		"focus.quality.text": "Тестирование, CI/CD, мониторинг и диагностика сервисов, code review, менторинг, архитектурные решения и поддерживаемая разработка.",
		"stack.eyebrow": "Стек",
		"stack.python.aria": "Технологии Python",
		"stack.databases": "Databases",
		"stack.databases.aria": "Технологии баз данных",
		"stack.queues": "Queues & Brokers",
		"stack.queues.aria": "Технологии очередей и брокеров сообщений",
		"stack.ai": "AI & ETL",
		"stack.ai.aria": "AI и ETL технологии",
		"stack.infrastructure": "Infrastructure",
		"stack.infrastructure.aria": "Инфраструктурные технологии",
		"stack.additional": "Additional languages",
		"stack.additional.aria": "Дополнительные языки программирования",
		"stack.go": "Go (basic)",
		"stack.javascript": "JavaScript (basic)",
		"stack.onec": "1С (7.7, 8.x)",
		"footer.status": "Открыт к удаленной работе.<br>Сейчас нахожусь в Бишкеке, KG.",
		"footer.aria": "Внешние ссылки",
	},
};

let currentLanguage = localStorage.getItem("language") || "en";

root.classList.add("js");

function translate(key) {
	return translations[currentLanguage][key] || translations.en[key] || "";
}

function setLanguage(language) {
	currentLanguage = translations[language] ? language : "en";
	root.lang = currentLanguage;

	document.querySelectorAll("[data-i18n]").forEach((element) => {
		const value = translate(element.dataset.i18n);
		const container = element.closest("[data-i18n-container]");

		element.innerHTML = value;
		if (container) {
			container.hidden = value === "";
		} else {
			element.hidden = value === "";
		}
	});

	document.querySelectorAll("[data-i18n-content]").forEach((element) => {
		element.setAttribute("content", translate(element.dataset.i18nContent));
	});

	document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
		element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
	});

	languageButtons.forEach((button) => {
		const isActive = button.dataset.language === currentLanguage;
		button.classList.toggle("is-active", isActive);
		button.setAttribute("aria-pressed", String(isActive));
	});

	document.querySelectorAll("[data-language-only]").forEach((element) => {
		element.hidden = element.dataset.languageOnly !== currentLanguage;
	});

	localStorage.setItem("language", currentLanguage);
}

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
setLanguage(currentLanguage);

themeToggle.addEventListener("click", () => {
	setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

languageButtons.forEach((button) => {
	button.addEventListener("click", () => {
		setLanguage(button.dataset.language);
	});
});

copyEmailButton.addEventListener("click", async () => {
	const icon = copyEmailButton.querySelector("span");
	const originalIcon = icon.textContent;
	const email = copyEmailButton.dataset.copy;

	try {
		await navigator.clipboard.writeText(email);
		icon.textContent = "✓";
		copyEmailButton.setAttribute("aria-label", translate("email.copied"));
	} catch {
		window.location.href = `mailto:${email}`;
	}

	window.setTimeout(() => {
		icon.textContent = originalIcon;
		copyEmailButton.setAttribute("aria-label", translate("email.copy"));
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
