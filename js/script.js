/* ==========================================================================
   RAKSHITH RAGHAVENDRA — DARK ENGINEERING LABORATORY & EDITORIAL SYSTEM
   Modular Vanilla JavaScript Engine (JSON-Driven Static Architecture)
   ========================================================================== */

// Global state holding loaded projects for filtering & modal lookups
let projectsData = [];

/* ==========================================================================
   ENGINE CONTROLLERS & INITIALIZATION
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initCanvasGrid();
    initCustomCursor();
    initMagneticButtons();
    initHeaderScroll();
    initMobileNav();
    initHeroTerminal();
    initProjectsGrid();
    initProjectFilter();
    initProjectModal();
    initLabTimeline();
    initIncidentsGrid();
    initCapabilitiesGrid();
    initBuildingTelemetry();
    initScrollObserver();
    initLiveClock();
    initCgpaCounter();
});

/**
 * RELIABLE BLOB RESUME PDF DOWNLOAD ENGINE
 * Forces exact filename "Rakshith_Raghavendra_Resume.pdf" preventing browser GUID generation
 */
function downloadResumePDF(event) {
    if (event) event.preventDefault();

    const targetUrl = 'assets/resume_rr.pdf';
    const filename = 'Rakshith_Raghavendra_Resume.pdf';

    fetch(targetUrl)
        .then((response) => response.blob())
        .then((blob) => {
            const pdfBlob = new Blob([blob], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(pdfBlob);
            const downloadLink = document.createElement('a');
            
            downloadLink.href = blobUrl;
            downloadLink.download = filename;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
        })
        .catch(() => {
            const fallbackLink = document.createElement('a');
            fallbackLink.href = targetUrl;
            fallbackLink.download = filename;
            document.body.appendChild(fallbackLink);
            fallbackLink.click();
            document.body.removeChild(fallbackLink);
        });
}

/**
 * 1. TECHNICAL CANVAS GRID RENDERER
 */
function initCanvasGrid() {
    const canvas = document.getElementById("grid-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const hudCoords = document.getElementById("hud-coords");
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (hudCoords) {
            hudCoords.textContent = `X: ${String(Math.floor(mouseX)).padStart(3, '0')} | Y: ${String(Math.floor(mouseY)).padStart(3, '0')}`;
        }
    });

    const gridSize = 40;

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
        gradient.addColorStop(0, "rgba(184, 255, 74, 0.04)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        requestAnimationFrame(draw);
    }

    draw();
}

/**
 * 2. CUSTOM DUAL CURSOR ENGINE
 */
function initCustomCursor() {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");

    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function renderRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(renderRing);
    }
    renderRing();

    const hoverables = "a, button, .project-card, .filter-btn, .lab-entry-header, .incident-card, .capability-card, .contact-link-item";
    document.body.addEventListener("mouseover", (e) => {
        if (e.target.closest(hoverables)) {
            document.body.classList.add("cursor-hover");
        }
    });

    document.body.addEventListener("mouseout", (e) => {
        if (e.target.closest(hoverables)) {
            document.body.classList.remove("cursor-hover");
        }
    });

    document.addEventListener("mousedown", () => document.body.classList.add("cursor-clicking"));
    document.addEventListener("mouseup", () => document.body.classList.remove("cursor-clicking"));
}

/**
 * 3. MAGNETIC BUTTONS PHYSICS
 */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll(".magnetic-btn");

    magneticBtns.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0px, 0px)";
        });
    });
}

/**
 * 4. STICKY HEADER SCROLL LISTENER
 */
function initHeaderScroll() {
    const header = document.getElementById("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

/**
 * 5. MOBILE OVERLAY NAVIGATION
 */
function initMobileNav() {
    const toggleBtn = document.getElementById("mobile-toggle");
    const overlay = document.getElementById("mobile-nav-overlay") || document.getElementById("mobile-overlay");
    const closeBtn = document.getElementById("mobile-close");
    const links = document.querySelectorAll(".mobile-link");

    if (!toggleBtn || !overlay) return;

    const openMenu = () => {
        overlay.classList.add("is-active");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
        overlay.classList.remove("is-active");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    toggleBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    links.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}

/**
 * 6. PROJECTS GRID RENDERER (Driven by data/projects.json)
 */
async function initProjectsGrid() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    const data = await loadJSON("data/projects.json");
    if (!data) {
        grid.innerHTML = `<div class="data-error-fallback"><span class="mono-accent">DATA STREAM OFFLINE // PROJECTS DATA UNREACHABLE</span></div>`;
        return;
    }

    projectsData = data;

    grid.innerHTML = projectsData.map((proj) => {
        const catList = Array.isArray(proj.categories) ? proj.categories.join(" ").toLowerCase() : "";
        const imgSrc = proj.image ? proj.image.src : "assets/images/embedded-lab.svg";
        const imgAlt = proj.image && proj.image.alt ? proj.image.alt : proj.title;
        const imgPos = proj.image && proj.image.position ? proj.image.position : "center";
        const statusText = proj.statusLabel || (proj.status ? proj.status.replace("_", " ").toUpperCase() : "ACTIVE");

        return `
            <article class="project-card reveal-element" data-category="${catList}">
                <div class="project-image-wrapper">
                    <img src="${imgSrc}" alt="${imgAlt}" class="project-img" loading="lazy" style="object-position: ${imgPos};" />
                    <span class="project-badge">${statusText}</span>
                </div>
                <div class="project-card-body">
                    <div class="project-card-header">
                        <span class="project-num">${proj.year || '2026'}</span>
                    </div>
                    <h3 class="project-card-title">${proj.title}</h3>
                    <p class="project-card-desc">${proj.shortDescription}</p>
                    <div class="project-tech-list">
                        ${(proj.technologies || []).slice(0, 5).map((t) => `<span class="tech-tag">${t}</span>`).join("")}
                    </div>
                    <div class="project-card-footer">
                        <button class="case-study-trigger" onclick="openProjectModal('${proj.id}')">
                            <span>EXPLORE CASE STUDY</span>
                            <svg class="trigger-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3.33337 8H12.6667M12.6667 8L8.00004 3.33334M12.6667 8L8.00004 12.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    if (typeof initScrollObserver === "function") initScrollObserver();
}

/**
 * 7. PROJECT FILTER ENGINE
 */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });

            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            const filter = btn.getAttribute("data-filter").toLowerCase();
            const cards = document.querySelectorAll(".project-card");

            cards.forEach((card) => {
                const categories = card.getAttribute("data-category") || "";
                
                let matches = false;
                if (filter === "all") {
                    matches = true;
                } else if (filter === "ai-ml" && (categories.includes("ai / ml") || categories.includes("ai") || categories.includes("ml"))) {
                    matches = true;
                } else if (filter === "hardware" && (categories.includes("hardware") || categories.includes("embedded"))) {
                    matches = true;
                } else if (filter === "robotics" && categories.includes("robotics")) {
                    matches = true;
                } else if (filter === "systems" && (categories.includes("systems") || categories.includes("cyber-physical"))) {
                    matches = true;
                } else if (filter === "research" && (categories.includes("research") || categories.includes("cybersecurity") || categories.includes("biosafety") || categories.includes("sec"))) {
                    matches = true;
                }

                if (matches) {
                    card.style.display = "flex";
                    setTimeout(() => (card.style.opacity = "1"), 50);
                } else {
                    card.style.opacity = "0";
                    setTimeout(() => (card.style.display = "none"), 300);
                }
            });
        });
    });
}

/**
 * 8. PROJECT DETAIL MODAL & CASE STUDY RENDERER
 */
function initProjectModal() {
    const modal = document.getElementById("project-modal");
    const backdrop = document.getElementById("modal-backdrop");
    const closeBtn = document.getElementById("modal-close-btn");

    if (!modal) return;

    const closeModal = () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        document.body.classList.remove("is-modal-active");
    };

    if (backdrop) backdrop.addEventListener("click", closeModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
}

function openProjectModal(id) {
    const proj = projectsData.find((p) => p.id === id);
    if (!proj) return;

    const modal = document.getElementById("project-modal");
    const content = document.getElementById("modal-content");
    const cs = proj.caseStudy || {};

    // Build optional link buttons (only render buttons for links that exist)
    let linksHtml = "";
    if (proj.links) {
        if (proj.links.github) {
            linksHtml += `
                <a href="${proj.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary magnetic-btn" style="width:100%; text-align:center; justify-content:center; margin-bottom: 8px;">
                    <span>VIEW GITHUB REPO →</span>
                </a>`;
        }
        if (proj.links.linkedin) {
            linksHtml += `
                <a href="${proj.links.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary magnetic-btn" style="width:100%; text-align:center; justify-content:center; margin-bottom: 8px; border-color: var(--accent); color: var(--accent);">
                    <span>READ PROJECT POST ↗</span>
                </a>`;
        }
        if (proj.links.demo) {
            linksHtml += `
                <a href="${proj.links.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary magnetic-btn" style="width:100%; text-align:center; justify-content:center; margin-bottom: 8px;">
                    <span>LIVE DEMO ↗</span>
                </a>`;
        }
        if (proj.links.documentation) {
            linksHtml += `
                <a href="${proj.links.documentation}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary magnetic-btn" style="width:100%; text-align:center; justify-content:center;">
                    <span>DOCUMENTATION ↗</span>
                </a>`;
        }
    }

    // Build editorial case study sections (hide empty sections)
    const buildSection = (num, title, val) => {
        if (!val) return "";
        let bodyHtml = "";
        if (Array.isArray(val)) {
            if (val.length === 0) return "";
            bodyHtml = val.map(item => `<p class="modal-body-text" style="margin-bottom:6px;">• ${item}</p>`).join("");
        } else {
            bodyHtml = `<p class="modal-body-text">${val}</p>`;
        }
        return `
            <div class="modal-block">
                <h4 class="modal-section-title">${num} / ${title}</h4>
                ${bodyHtml}
            </div>
        `;
    };

    let sectionIndex = 1;
    let mainBlocksHtml = "";

    const getSecNum = () => {
        const idx = sectionIndex++;
        return idx < 10 ? `0${idx}` : `${idx}`;
    };

    if (cs.overview) mainBlocksHtml += buildSection(getSecNum(), "OVERVIEW", cs.overview);
    if (cs.problem) mainBlocksHtml += buildSection(getSecNum(), "PROBLEM STATEMENT", cs.problem);
    if (cs.objective) mainBlocksHtml += buildSection(getSecNum(), "ENGINEERING OBJECTIVE", cs.objective);
    if (cs.myContribution) mainBlocksHtml += buildSection(getSecNum(), "MY CONTRIBUTION", cs.myContribution);
    if (cs.system) mainBlocksHtml += buildSection(getSecNum(), "SYSTEM ARCHITECTURE", cs.system);
    if (cs.development) mainBlocksHtml += buildSection(getSecNum(), "DEVELOPMENT EVOLUTION", cs.development);
    if (cs.challenges) mainBlocksHtml += buildSection(getSecNum(), "TECHNICAL CHALLENGES", cs.challenges);
    if (cs.debugging) mainBlocksHtml += buildSection(getSecNum(), "DEBUGGING & FIXES", cs.debugging);
    if (cs.decisions) mainBlocksHtml += buildSection(getSecNum(), "KEY ENGINEERING DECISIONS", cs.decisions);
    if (cs.results) mainBlocksHtml += buildSection(getSecNum(), "RESULTS & METRICS", cs.results);
    if (cs.currentState) mainBlocksHtml += buildSection(getSecNum(), "CURRENT STATE", cs.currentState);
    if (cs.lessons) mainBlocksHtml += buildSection(getSecNum(), "LESSONS LEARNED", cs.lessons);
    if (cs.novelty) mainBlocksHtml += buildSection(getSecNum(), "PROJECT NOVELTY", cs.novelty);

    const statusBadgeText = proj.statusLabel || (proj.status ? proj.status.replace("_", " ").toUpperCase() : "ACTIVE");
    const imgSrc = proj.image ? proj.image.src : "assets/images/embedded-lab.svg";
    const imgAlt = proj.image && proj.image.alt ? proj.image.alt : proj.title;

    content.innerHTML = `
        <div class="modal-header-block">
            <span class="modal-tag">${statusBadgeText}</span>
            <h2 class="modal-title" id="modal-title">${proj.title}</h2>
            <div class="project-tech-list">
                ${(proj.technologies || []).map((t) => `<span class="tech-tag">${t}</span>`).join("")}
            </div>
        </div>

        <div class="modal-grid">
            <div class="modal-main-column">
                <div class="modal-project-img-wrapper" style="margin-bottom: 2rem; border: 1px solid var(--border); overflow: hidden;">
                    <img src="${imgSrc}" alt="${imgAlt}" style="width:100%; height:auto; display:block;" />
                </div>
                ${mainBlocksHtml}
            </div>

            <div class="modal-sidebar">
                <div class="side-block">
                    <span class="meta-label">SYSTEM STATUS</span>
                    <span class="mono-accent font-bold">${statusBadgeText}</span>
                </div>

                <div class="side-block">
                    <span class="meta-label">PROJECT ROLE</span>
                    <span class="mono-label" style="color:var(--text-primary); font-weight:600;">${proj.role || 'Lead Engineer'}</span>
                </div>

                <div class="side-block">
                    <span class="meta-label">TIMELINE / YEAR</span>
                    <span class="mono-label">${proj.year || '2026'}</span>
                </div>

                <div class="side-block">
                    <span class="meta-label">PROJECT ID</span>
                    <span class="mono-label">${proj.id.toUpperCase()}</span>
                </div>

                ${linksHtml ? `<div class="side-block" style="margin-top: 1rem;">${linksHtml}</div>` : ''}
            </div>
        </div>
    `;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.body.classList.add("is-modal-active");
}

/**
 * 9. THE LAB ACCORDION TIMELINE (Driven by data/lab.json)
 */
async function initLabTimeline() {
    const container = document.getElementById("timeline-container");
    if (!container) return;

    const data = await loadJSON("data/lab.json");
    if (!data) return;

    container.innerHTML = data.map((exp) => `
        <div class="lab-entry reveal-element">
            <div class="lab-entry-header" onclick="toggleLabEntry(this)">
                <div class="lab-meta">
                    <span class="lab-exp-id">${exp.id.toUpperCase()}</span>
                    <h3 class="lab-title">${exp.title}</h3>
                </div>
                <div class="lab-status-pill ${exp.status}">
                    ${exp.statusLabel || exp.status.toUpperCase()}
                </div>
            </div>
            <div class="lab-entry-body">
                <p class="manifesto-paragraph" style="font-size:0.95rem;">${exp.summary}</p>
                ${exp.observation ? `<p class="manifesto-paragraph" style="font-size:0.9rem; margin-top:8px; color:var(--text-secondary);"><strong>OBSERVATION:</strong> ${exp.observation}</p>` : ''}
                ${exp.lesson ? `<p class="manifesto-paragraph" style="font-size:0.9rem; margin-top:8px; color:var(--accent);"><strong>TAKEAWAY:</strong> ${exp.lesson}</p>` : ''}
                <div class="mono-label" style="margin-top:10px;">TIMESTAMP: ${exp.date}</div>
            </div>
        </div>
    `).join("");

    if (typeof initScrollObserver === "function") initScrollObserver();
}

function toggleLabEntry(headerEl) {
    const entry = headerEl.parentElement;
    entry.classList.toggle("is-expanded");
}

/**
 * 10. WHAT BROKE INCIDENTS GRID (Driven by data/debug.json)
 */
async function initIncidentsGrid() {
    const grid = document.getElementById("incidents-grid");
    if (!grid) return;

    const data = await loadJSON("data/debug.json");
    if (!data) return;

    grid.innerHTML = data.map((inc) => `
        <div class="incident-card reveal-element">
            <span class="incident-tag">${inc.tag || `${inc.id.toUpperCase()} // ${inc.project.toUpperCase()}`}</span>
            <h3 class="incident-title">${inc.title}</h3>
            
            <div class="incident-step">
                <span class="incident-step-label">01 // OBSERVED SYMPTOM & FAILURE:</span>
                ${inc.symptom || inc.problem}
            </div>

            <div class="incident-step">
                <span class="incident-step-label">02 // ROOT CAUSE & RESOLUTION:</span>
                ${inc.fix}
            </div>

            ${inc.lesson ? `
            <div class="incident-step" style="border-top: 1px dashed var(--border); padding-top: 8px;">
                <span class="incident-step-label">03 // SYSTEM ENGINEERING LESSON:</span>
                ${inc.lesson}
            </div>` : ''}

            <div class="incident-status-bar" style="margin-top:auto; font-size:0.75rem; padding-top:10px; border-top:1px solid var(--border); display:flex; align-items:center; gap:6px;">
                <span style="width:6px; height:6px; background-color:var(--accent); border-radius:50%; display:inline-block; box-shadow:0 0 6px var(--accent);"></span>
                <span class="mono-accent font-bold" style="letter-spacing:0.05em;">STATUS: ${inc.status || 'POST-MORTEM COMPLETED'}</span>
            </div>
        </div>
    `).join("");

    if (typeof initScrollObserver === "function") initScrollObserver();
}

/**
 * 11. CAPABILITIES MATRIX RENDERER (Driven by data/capabilities.json)
 */
async function initCapabilitiesGrid() {
    const grid = document.getElementById("capabilities-grid");
    if (!grid) return;

    const data = await loadJSON("data/capabilities.json");
    if (!data) return;

    grid.innerHTML = data.map((cap, idx) => `
        <div class="capability-card reveal-element" data-index="${idx}">
            <div class="cap-header-block" style="display:flex; flex-direction:column; gap:0.4rem;">
                <div class="card-meta">
                    <span class="mono-accent" style="font-size: 1.1rem; font-weight: 700;">${cap.number || ''} // ${cap.title}</span>
                </div>
                <p class="project-card-desc" style="font-size:0.85rem; line-height:1.5; margin: 0;">${cap.description}</p>
                ${cap.pattern ? `
                <div class="cap-pattern" style="margin-top:0.2rem;">
                    <span class="pattern-flow">${cap.pattern}</span>
                </div>` : ''}
            </div>

            <ul class="cap-list" style="margin-top: 0.6rem; margin-bottom: 0.5rem;">
                ${(cap.capabilities || cap.evidence || []).map((e) => `<li class="cap-item" style="font-size:0.8rem; line-height:1.4;">${e}</li>`).join("")}
            </ul>
            <div class="project-tech-list" style="margin-top: auto; padding-top: 0.8rem;">
                ${cap.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
            </div>
        </div>
    `).join("");

    if (typeof initScrollObserver === "function") initScrollObserver();
    initDNAPulseLoop(grid);
}

/**
 * Option 1: Sequential DNA Pulse Loop Animation for Engineering DNA Cards
 */
function initDNAPulseLoop(grid) {
    const cards = grid.querySelectorAll(".capability-card");
    if (!cards.length) return;

    let currentIndex = 0;
    let isHovered = false;
    let intervalId = null;

    function stepPulse() {
        if (isHovered) return;

        cards.forEach((card, idx) => {
            if (idx === currentIndex) {
                card.classList.add("is-active-pulse");
            } else {
                card.classList.remove("is-active-pulse");
            }
        });

        currentIndex = (currentIndex + 1) % cards.length;
    }

    function startLoop() {
        if (!intervalId) {
            stepPulse();
            intervalId = setInterval(stepPulse, 2500);
        }
    }

    function stopLoop() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    cards.forEach((card, idx) => {
        card.addEventListener("mouseenter", () => {
            isHovered = true;
            stopLoop();
            cards.forEach((c) => c.classList.remove("is-active-pulse"));
            card.classList.add("is-active-pulse");
        });

        card.addEventListener("mouseleave", () => {
            isHovered = false;
            currentIndex = (idx + 1) % cards.length;
            startLoop();
        });
    });

    const section = document.getElementById("capabilities");
    if (section && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startLoop();
                    } else {
                        stopLoop();
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(section);
    } else {
        startLoop();
    }
}

/**
 * 12. CURRENTLY BUILDING TELEMETRY (Driven by data/building.json)
 */
async function initBuildingTelemetry() {
    const grid = document.getElementById("building-grid");
    if (!grid) return;

    const data = await loadJSON("data/building.json");
    if (!data) return;

    grid.innerHTML = data.map((item) => `
        <div class="telemetry-card reveal-element">
            <div class="card-meta">
                <span class="mono-accent">${item.statusLabel || item.status.toUpperCase()}</span>
                <span class="status-indicator live-dot">● TESTING</span>
            </div>
            <h3 class="telemetry-title">${item.title}</h3>
            <p class="telemetry-desc">${item.description}</p>
            <div class="mono-label" style="font-size: 0.75rem; color: var(--accent-warm);">
                PHASE: ${item.phase}
            </div>
        </div>
    `).join("");

    if (typeof initScrollObserver === "function") initScrollObserver();
}

/**
 * 13. INTERSECTION OBSERVER SCROLL REVEAL
 */
function initScrollObserver() {
    const elements = document.querySelectorAll(".reveal-element");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                }
            });
        },
        { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
}

/**
 * 14. REAL-TIME LIVE CLOCK
 */
function initLiveClock() {
    const clockEl = document.getElementById("live-clock");
    if (!clockEl) return;

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ms = String(now.getMilliseconds()).padStart(3, '0');

        clockEl.textContent = `${hours}:${minutes}:${seconds}:${ms} IST`;
    }

    setInterval(updateClock, 50);
}

/**
 * 15. CGPA COUNTER ANIMATION & ABOUT RENDERER (Driven by data/about.json)
 */
async function initCgpaCounter() {
    const counterEl = document.getElementById("cgpa-counter");
    const semBox = document.getElementById("sem-progression-box");
    const metaBox = document.getElementById("about-metadata-box");

    const data = await loadJSON("data/about.json");
    if (!data) return;

    // Render Semester Progression
    if (semBox && data.semesters) {
        semBox.innerHTML = `
            <div class="sem-box-title">ACADEMIC TELEMETRY // ${data.cgpa ? data.cgpa.institution : 'RVCE'}</div>
            ${data.semesters.map((s) => {
                const isCompleted = s.status === "completed";
                const fillWidth = isCompleted ? `${(s.gpa / 10) * 100}%` : "70%";
                return `
                    <div class="sem-row ${isCompleted ? 'completed-sem' : 'sem-in-progress'}">
                        <span class="sem-name">${s.name}</span>
                        <div class="sem-bar-track"><div class="sem-bar-fill" style="width: ${fillWidth};"></div></div>
                        <span class="sem-val">${isCompleted ? s.gpa.toFixed(2) : `IN PROGRESS<span class="pulsing-dot"></span>`}</span>
                    </div>
                `;
            }).join("")}
        `;
    }

    // Render Metadata Box
    if (metaBox && data.metadata) {
        metaBox.innerHTML = data.metadata.map((m) => `
            <div class="meta-row">
                <span class="meta-label">${m.label}</span>
                <span class="meta-val">${m.val}</span>
            </div>
        `).join("");
    }

    // Animate CGPA Count-up
    if (!counterEl || !data.cgpa) return;

    let hasAnimated = false;
    const targetVal = data.cgpa.value || 9.08;
    const duration = 1500;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    let startTime = null;

                    function animateCount(timestamp) {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const easeProgress = 1 - (1 - progress) * (1 - progress);
                        const currentVal = (easeProgress * targetVal).toFixed(2);

                        counterEl.textContent = currentVal;

                        if (progress < 1) {
                            requestAnimationFrame(animateCount);
                        } else {
                            counterEl.textContent = targetVal.toFixed(2);
                        }
                    }

                    requestAnimationFrame(animateCount);
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(counterEl);
}

/* --------------------------------------------------------------------------
   HERO TERMINAL TYPEWRITER COMPONENT (Driven by data/terminal.json)
   -------------------------------------------------------------------------- */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fallbackTerminalConfig = {
    prompt: "RR@LAB:~$",
    initialCommand: "cat README.md",
    typingSpeedMs: 45,
    commandPauseMs: 700,
    lineDelayMs: 220,
    sections: [
        { title: "/started", lines: ["hardware"] },
        { title: "/evolved", lines: ["AI → systems → robotics → security"] },
        { title: "/learned", lines: ["build → break → debug → rebuild"] },
        { title: "/current", lines: ["still building."] }
    ]
};

async function initHeroTerminal() {
    const terminalBody = document.getElementById("terminal-body");
    if (!terminalBody) return;

    const configData = await loadJSON("data/terminal.json");
    const config = configData || fallbackTerminalConfig;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
        renderTerminalCompleted(terminalBody, config);
        return;
    }

    let hasStarted = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted) {
                hasStarted = true;
                runTerminalTypewriter(terminalBody, config);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(terminalBody);
}

function renderTerminalCompleted(container, config) {
    let html = `
        <div class="terminal-line"><span class="terminal-prompt">${config.prompt}</span><span class="terminal-cmd">${config.initialCommand}</span></div>
        <div class="terminal-line">&nbsp;</div>
    `;

    (config.sections || []).forEach(sec => {
        html += `<div class="terminal-line terminal-dir-header">${sec.title || sec.header}</div>`;
        (sec.lines || sec.items || []).forEach(line => {
            html += `<div class="terminal-line terminal-item">    ${line}</div>`;
        });
        html += `<div class="terminal-line">&nbsp;</div>`;
    });

    html += `<div class="terminal-line"><span class="terminal-prompt">${config.prompt}</span><span class="terminal-cursor"></span></div>`;
    container.innerHTML = html;
}

async function runTerminalTypewriter(container, config) {
    container.innerHTML = "";
    
    // Line 1: Initial Command
    const line1 = document.createElement("div");
    line1.className = "terminal-line";
    line1.innerHTML = `<span class="terminal-prompt">${config.prompt}</span><span class="cmd-text"></span><span class="terminal-cursor"></span>`;
    container.appendChild(line1);

    const cmdTextSpan = line1.querySelector(".cmd-text");
    const cursor = line1.querySelector(".terminal-cursor");

    for (let i = 0; i < config.initialCommand.length; i++) {
        cmdTextSpan.textContent += config.initialCommand[i];
        await sleep(config.typingSpeedMs || 45);
    }

    cursor.remove();
    await sleep(config.commandPauseMs || 700);

    const spacer = document.createElement("div");
    spacer.className = "terminal-line";
    spacer.innerHTML = "&nbsp;";
    container.appendChild(spacer);

    // Type/Render Sections line-by-line
    for (const sec of (config.sections || [])) {
        const headerDiv = document.createElement("div");
        headerDiv.className = "terminal-line terminal-dir-header";
        headerDiv.textContent = sec.title || sec.header;
        container.appendChild(headerDiv);
        await sleep(config.lineDelayMs || 220);

        const lines = sec.lines || sec.items || [];
        for (const line of lines) {
            const itemDiv = document.createElement("div");
            itemDiv.className = "terminal-line terminal-item";
            itemDiv.textContent = `    ${line}`;
            container.appendChild(itemDiv);
            await sleep(90);
        }

        const secSpacer = document.createElement("div");
        secSpacer.className = "terminal-line";
        secSpacer.innerHTML = "&nbsp;";
        container.appendChild(secSpacer);
        await sleep(config.lineDelayMs || 220);
    }

    // Final Prompt with Blinking Cursor
    const finalPromptLine = document.createElement("div");
    finalPromptLine.className = "terminal-line";
    finalPromptLine.innerHTML = `<span class="terminal-prompt">${config.prompt}</span><span class="terminal-cursor"></span>`;
    container.appendChild(finalPromptLine);
}
