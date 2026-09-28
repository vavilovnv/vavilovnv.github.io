const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const languageButtons = document.querySelectorAll(".language-option");
const copyEmailButton = document.querySelector(".copy-email");
const ambientDots = document.querySelector(".ambient-dots");
const revealItems = document.querySelectorAll(".reveal");

// English text lives only in index.html (it's also the no-JS fallback); collectEnglishStrings()
// reads it into translations.en at startup. List here only strings that never appear in the markup.
const translations = {
	en: {
		"email.copied": "Email address copied",
	},
	ru: {
		"meta.title": "Николай Вавилов | Backend Engineer",
		"meta.description": "Николай Вавилов, backend engineer с фокусом на Python, корпоративные интеграции и практические LLM-системы.",
		"name": "Николай Вавилов",
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
		"email.copied.short": "Скопировано",
		"summary.aria": "Краткое описание профиля",
		"summary.title": "Engineering profile",
		"summary.text": "Backend engineer с фокусом на Python, масштабируемые API, корпоративные интеграции и прикладные LLM-системы. Сочетаю практический инженерный опыт, опыт тимлидства и хорошее понимание бизнес-доменов.",
		"summary.note": "<ul><li>Интересуюсь разработкой AI-решений и LLM workflows. Использую AI как еще один инструмент разработчика в своем арсенале.</li><li>Имею значительный опыт работы с платформой 1С и могу помочь с интеграционными проектами, а также с доработкой конфигураций на БСП.</li></ul>",
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
		"stack.typescript": "TypeScript (basic)",
		"stack.onec": "1С (7.7, 8.x)",
		"footer.status": "Открыт к удаленной работе.<br>Сейчас нахожусь в Бишкеке, KG.",
		"footer.copyright": "© 2026 Николай Вавилов",
		"footer.aria": "Внешние ссылки",
	},
};

// localStorage can throw (private mode, blocked cookies); the site must keep working without it.
const storage = {
	get(key) {
		try {
			return localStorage.getItem(key);
		} catch {
			return null;
		}
	},
	set(key, value) {
		try {
			localStorage.setItem(key, value);
		} catch {
			// Preferences just won't persist.
		}
	},
};

function collectEnglishStrings() {
	const en = translations.en;
	const collect = (key, value) => {
		if (!(key in en)) {
			en[key] = value.trim().replace(/\s+/g, " ");
		}
	};

	document.querySelectorAll("[data-i18n]").forEach((element) => {
		collect(element.dataset.i18n, element.innerHTML);
	});
	document.querySelectorAll("[data-i18n-content]").forEach((element) => {
		collect(element.dataset.i18nContent, element.getAttribute("content") || "");
	});
	document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
		collect(element.dataset.i18nAriaLabel, element.getAttribute("aria-label") || "");
	});
}

collectEnglishStrings();

let currentLanguage = storage.get("language") || "en";

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

	root.classList.remove("i18n-pending");
}

function seededRandom(seed) {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

function createAmbientDots() {
	const rows = 8;
	const cols = 8;
	const colors = ["var(--dot-a)", "var(--dot-b)", "var(--dot-c)"];

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

const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

function systemTheme() {
	return colorSchemeQuery.matches ? "dark" : "light";
}

// Only an explicit toggle is saved; otherwise the site follows the system theme.
function savedTheme() {
	const theme = storage.get("theme");
	return theme === "light" || theme === "dark" ? theme : null;
}

function setTheme(theme) {
	const themeIcon = themeToggle.querySelector(".theme-icon");

	root.dataset.theme = theme;
	themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
	themeIcon.textContent = theme === "dark" ? "☀" : "☾";
	themeIcon.classList.toggle("is-moon", themeIcon.textContent === "☾");
}

setTheme(savedTheme() || systemTheme());
setLanguage(currentLanguage);

themeToggle.addEventListener("click", () => {
	const theme = root.dataset.theme === "dark" ? "light" : "dark";
	storage.set("theme", theme);
	setTheme(theme);
});

// Safari before 14 has no addEventListener on MediaQueryList.
if (colorSchemeQuery.addEventListener) {
	colorSchemeQuery.addEventListener("change", () => {
		if (!savedTheme()) {
			setTheme(systemTheme());
		}
	});
}

languageButtons.forEach((button) => {
	button.addEventListener("click", () => {
		setLanguage(button.dataset.language);
		storage.set("language", currentLanguage);
	});
});

async function copyText(text) {
	if (navigator.clipboard && window.isSecureContext) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			// Fall through to the legacy approach below.
		}
	}

	// navigator.clipboard is unavailable outside secure contexts (file://, plain http).
	const field = document.createElement("textarea");
	field.value = text;
	field.setAttribute("readonly", "");
	field.style.position = "fixed";
	field.style.opacity = "0";
	document.body.append(field);
	field.select();

	let copied = false;
	try {
		copied = document.execCommand("copy");
	} catch {
		copied = false;
	}

	field.remove();
	return copied;
}

let copyResetTimer;

copyEmailButton.addEventListener("click", async () => {
	const copied = await copyText(copyEmailButton.dataset.copy);
	copyEmailButton.focus();

	if (!copied) {
		return;
	}

	copyEmailButton.classList.add("is-copied");
	copyEmailButton.setAttribute("aria-label", translate("email.copied"));
	window.clearTimeout(copyResetTimer);
	copyResetTimer = window.setTimeout(() => {
		copyEmailButton.classList.remove("is-copied");
		copyEmailButton.setAttribute("aria-label", translate("email.copy"));
	}, 1800);
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

// Tells the fallback in <head> that the page finished setting up.
window.siteReady = true;
