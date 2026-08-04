import { eventBus } from './src/core/EventBus.js';
import { GameEvents } from './src/events/EventNames.js';
import { createSimulationManager } from './src/simulation/SimulationManager.js';
import { createWorldManager } from './src/world/systems/WorldManager.js';

const SEED_DATA = {
    carrot: { label: 'carrot', price: 2, growthTime: 2, sellPrice: 5, icon: '🥕' },
    tomato: { label: 'Tomato', price: 3, growthTime: 3, sellPrice: 8, icon: '🍅' },
    corn: { label: 'Corn', price: 2, growthTime: 2, sellPrice: 7, icon: '🌽' },
    lettuce: { label: 'Lettuce', price: 2, growthTime: 2, sellPrice: 6, icon: '🥬' },
    radish: { label: 'Radish', price: 1, growthTime: 1, sellPrice: 4, icon: '🌶️' }
};

const STORAGE_KEY = 'garden_survival_save';
const INITIAL_PLOT_COUNT = 6;
const MAX_PLOTS = 30;
const EXPANSION_COST = 12;
const CINAT_PER_ARIM = 100;
const REAL_TIME_DAY_INTERVAL_MS = 30 * 60 * 1000;
const SPEEDUP_FACTOR = 60;
const SPEEDUP_THRESHOLD_MS = 5 * 1000;
const SUNSET_WINDOW_MS = 5 * 60 * 1000;

const LIGHT_THEME = {
    bg: '#f8f4e6',
    panel: '#fffdf4',
    text: '#1f2a1f',
    border: '#d6cab1',
    accent: '#3e7c43',
    accentDark: '#29522d',
    header: '#234f2b',
    statCard: 'rgba(255, 255, 255, 0.16)',
    plot: '#d8e7c6',
    plotEmpty: '#f2ecd4',
    plotTag: 'rgba(30, 67, 38, 0.15)'
};

const DARK_THEME = {
    bg: '#171b22',
    panel: '#262d36',
    text: '#f2f6f8',
    border: '#4a545f',
    accent: '#94c98a',
    accentDark: '#5f8c63',
    header: '#0d1117',
    statCard: 'rgba(0, 0, 0, 0.26)',
    plot: '#33433d',
    plotEmpty: '#2b3439',
    plotTag: 'rgba(192, 224, 199, 0.16)'
};

let remainingDayMs = REAL_TIME_DAY_INTERVAL_MS;
let lastDayTick = Date.now();
let isSpeedupMode = false;
let countdownUpdater = null;

const countdownDisplay = document.getElementById('countdownDisplay');
const speedUpTimerCheckbox = document.getElementById('speedUpTimerCheckbox');
const sunsetOverlay = document.getElementById('sunsetOverlay');

function parseColorValue(colorValue) {
    if (colorValue.startsWith('#')) {
        const fullHex = colorValue.replace('#', '');
        const normalized = fullHex.length === 3
            ? fullHex.split('').map((char) => char + char).join('')
            : fullHex;

        return {
            r: Number.parseInt(normalized.slice(0, 2), 16),
            g: Number.parseInt(normalized.slice(2, 4), 16),
            b: Number.parseInt(normalized.slice(4, 6), 16)
        };
    }

    const match = colorValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (match) {
        return {
            r: Number(match[1]),
            g: Number(match[2]),
            b: Number(match[3])
        };
    }

    return { r: 0, g: 0, b: 0 };
}

function mixColors(fromColor, toColor, ratio) {
    const from = parseColorValue(fromColor);
    const to = parseColorValue(toColor);
    const amount = Math.max(0, Math.min(1, ratio));

    const r = Math.round(from.r + (to.r - from.r) * amount);
    const g = Math.round(from.g + (to.g - from.g) * amount);
    const b = Math.round(from.b + (to.b - from.b) * amount);

    return `rgb(${r}, ${g}, ${b})`;
}

function applyThemeProgress() {
    const progress = 1 - remainingDayMs / REAL_TIME_DAY_INTERVAL_MS;
    const easedProgress = Math.pow(Math.max(0, Math.min(1, progress)), 0.6);
    const sunsetProgress = remainingDayMs <= SUNSET_WINDOW_MS
        ? Math.max(0, Math.min(1, 1 - (remainingDayMs / SUNSET_WINDOW_MS)))
        : 0;

    document.documentElement.style.setProperty('--bg', mixColors(LIGHT_THEME.bg, DARK_THEME.bg, easedProgress));
    document.documentElement.style.setProperty('--panel', mixColors(LIGHT_THEME.panel, DARK_THEME.panel, easedProgress));
    document.documentElement.style.setProperty('--text', mixColors(LIGHT_THEME.text, DARK_THEME.text, easedProgress));
    document.documentElement.style.setProperty('--border', mixColors(LIGHT_THEME.border, DARK_THEME.border, easedProgress));
    document.documentElement.style.setProperty('--accent', mixColors(LIGHT_THEME.accent, DARK_THEME.accent, easedProgress));
    document.documentElement.style.setProperty('--accent-dark', mixColors(LIGHT_THEME.accentDark, DARK_THEME.accentDark, easedProgress));
    document.documentElement.style.setProperty('--header-bg', mixColors(LIGHT_THEME.header, DARK_THEME.header, easedProgress));
    document.documentElement.style.setProperty('--stat-card-bg', mixColors(LIGHT_THEME.statCard, DARK_THEME.statCard, easedProgress));
    document.documentElement.style.setProperty('--plot-bg', mixColors(LIGHT_THEME.plot, DARK_THEME.plot, easedProgress));
    document.documentElement.style.setProperty('--plot-empty-bg', mixColors(LIGHT_THEME.plotEmpty, DARK_THEME.plotEmpty, easedProgress));
    document.documentElement.style.setProperty('--plot-tag-bg', mixColors(LIGHT_THEME.plotTag, DARK_THEME.plotTag, easedProgress));
    sunsetOverlay.style.opacity = String(sunsetProgress * 0.9);
}

function formatCountdown(remainingMs) {
    const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateCountdownDisplay() {
    countdownDisplay.textContent = formatCountdown(remainingDayMs);
    applyThemeProgress();
}

function tickDayCycle() {
    const now = Date.now();
    const elapsedMs = now - lastDayTick;
    lastDayTick = now;

    if (isSpeedupMode && remainingDayMs > SPEEDUP_THRESHOLD_MS) {
        remainingDayMs = Math.max(SPEEDUP_THRESHOLD_MS, remainingDayMs - (elapsedMs * SPEEDUP_FACTOR));
    } else {
        remainingDayMs = Math.max(0, remainingDayMs - elapsedMs);
    }

    updateCountdownDisplay();

    if (remainingDayMs <= 0) {
        advanceDay();
        remainingDayMs = REAL_TIME_DAY_INTERVAL_MS;
        lastDayTick = Date.now();
        updateCountdownDisplay();
    }
}

function startCountdownTimer() {
    if (countdownUpdater) {
        clearInterval(countdownUpdater);
    }

    countdownUpdater = setInterval(tickDayCycle, 1000);
}

startCountdownTimer();
applyThemeProgress();
updateCountdownDisplay();

const defaultState = {
    money: 20,
    day: 1,
    selectedSeed: 'carrot',
    selectedPlotId: 1,
    inventory: {
        carrot: 3,
        tomato: 2,
        corn: 2,
        lettuce: 2,
        radish: 4
    },
    plots: Array.from({ length: INITIAL_PLOT_COUNT }, (_, index) => ({
        id: index + 1,
        crop: null,
        growth: 0,
        ready: false
    }))
};

let state = loadState();
let messageTimeout = null;

const simulationManager = createSimulationManager();
const worldManager = createWorldManager();

function bootstrapRuntimeFramework() {
    simulationManager.start();
    eventBus.emit(GameEvents.GameLoaded, {
        state,
        simulation: simulationManager.getState(),
        world: worldManager.getGrid()
    });

    window.__farmGameFramework = {
        simulation: simulationManager,
        world: worldManager,
        eventBus,
        getState: () => ({
            simulation: simulationManager.getState(),
            world: {
                grid: worldManager.getGrid(),
                parcels: worldManager.getParcels(),
                objects: worldManager.getObjects(),
                regions: worldManager.getRegionDefinitions()
            }
        })
    };
}

bootstrapRuntimeFramework();

const moneyDisplay = document.getElementById('moneyDisplay');
const dayDisplay = document.getElementById('dayDisplay');
const seedSelect = document.getElementById('seedSelect');
const plotGrid = document.getElementById('plotGrid');
const inventoryList = document.getElementById('inventoryList');

const plantButton = document.getElementById('plantButton');
const harvestButton = document.getElementById('harvestButton');
//const nextDayButton = document.getElementById('nextDayButton');
const expandButton = document.getElementById('expandButton');
const forageButton = document.getElementById('forageButton');
const saveButton = document.getElementById('saveButton');
const resetButton = document.getElementById('resetButton');

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        return structuredClone(defaultState);
    }

    try {
        const parsed = JSON.parse(saved);
        return {
            ...structuredClone(defaultState),
            ...parsed,
            inventory: { ...defaultState.inventory, ...(parsed.inventory || {}) },
            plots: parsed.plots?.length ? parsed.plots : structuredClone(defaultState.plots)
        };
    } catch (error) {
        console.warn('Failed to read saved game state:', error);
        return structuredClone(defaultState);
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function drawSeedOptions() {
    seedSelect.innerHTML = '';

    Object.entries(SEED_DATA).forEach(([key, seed]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${seed.label} (${seed.price} cinat)`;
        option.selected = key === state.selectedSeed;
        seedSelect.appendChild(option);
    });
}

function drawInventory() {
    inventoryList.innerHTML = '';

    Object.entries(state.inventory).forEach(([key, quantity]) => {
        const seed = SEED_DATA[key];
        const item = document.createElement('li');
        item.innerHTML = `<span>${seed.icon} ${seed.label}</span><strong>${quantity}</strong>`;
        inventoryList.appendChild(item);
    });
}

function drawPlots() {
    plotGrid.innerHTML = '';

    state.plots.forEach((plot) => {
        const card = document.createElement('button');
        card.className = `plot ${plot.id === state.selectedPlotId ? 'selected' : ''} ${plot.crop ? '' : 'empty'}`;
        card.type = 'button';
        card.dataset.plotId = plot.id;

        const crop = plot.crop ? SEED_DATA[plot.crop] : null;
        card.innerHTML = `
            <div class="plot-title">Plot ${plot.id}</div>
            <div class="crop-icon">${crop ? crop.icon : '🟫'}</div>
            <div>${crop ? crop.label : 'Empty'}</div>
            <div class="tag">${plot.ready ? 'Ready to harvest' : crop ? `${plot.growth}/${crop.growthTime} days` : 'Waiting'}</div>
        `;

        card.addEventListener('click', () => {
            state.selectedPlotId = plot.id;
            render();
        });

        plotGrid.appendChild(card);
    });
}

function formatMoney(cinatAmount) {
    const arim = Math.floor(cinatAmount / CINAT_PER_ARIM);
    const remainder = cinatAmount % CINAT_PER_ARIM;
    return `${arim} arim ${remainder} cinat`;
}

function updateStats() {
    moneyDisplay.textContent = formatMoney(state.money);
    dayDisplay.textContent = state.day;
}

function render() {
    updateStats();
    drawSeedOptions();
    drawInventory();
    drawPlots();
    expandButton.textContent = `Expand farm (${EXPANSION_COST} cinat)`;
    expandButton.disabled = state.plots.length >= MAX_PLOTS;
    saveState();
}

function getSelectedPlot() {
    return state.plots.find((plot) => plot.id === state.selectedPlotId);
}

function plantSelectedCrop() {
    const plot = getSelectedPlot();
    const seed = state.selectedSeed;

    if (!plot) {
        return;
    }

    if (plot.crop) {
        window.alert('That plot is already occupied. Harvest it first.');
        return;
    }

    if (state.inventory[seed] <= 0) {
        window.alert(`You do not have any ${SEED_DATA[seed].label} seeds left.`);
        return;
    }

    state.inventory[seed] -= 1;
    plot.crop = seed;
    plot.growth = 0;
    plot.ready = false;
    render();
}

function harvestSelectedCrop() {
    const plot = getSelectedPlot();

    if (!plot || !plot.crop) {
        window.alert('Select a planted plot before harvesting.');
        return;
    }

    if (!plot.ready) {
        window.alert('This crop is not ready yet. Wait a few more days.');
        return;
    }

    const crop = SEED_DATA[plot.crop];
    const seedYield = 1 + Math.floor(Math.random() * 2);
    state.money += crop.sellPrice;
    state.inventory[plot.crop] = (state.inventory[plot.crop] || 0) + seedYield;
    plot.crop = null;
    plot.growth = 0;
    plot.ready = false;
    render();
}

function forageSeeds() {
    const seedKeys = Object.keys(SEED_DATA);
    const seedKey = seedKeys[Math.floor(Math.random() * seedKeys.length)];
    const amount = 1 + Math.floor(Math.random() * 2);
    state.inventory[seedKey] = (state.inventory[seedKey] || 0) + amount;
    render();
}

function advanceDay() {
    state.day += 1;
    remainingDayMs = REAL_TIME_DAY_INTERVAL_MS;
    lastDayTick = Date.now();
    isSpeedupMode = false;
    speedUpTimerCheckbox.checked = false;

    state.plots.forEach((plot) => {
        if (!plot.crop) {
            return;
        }

        plot.growth += 1;
        const crop = SEED_DATA[plot.crop];
        plot.ready = plot.growth >= crop.growthTime;
    });

    eventBus.emit(GameEvents.DayEnded, {
        day: state.day,
        simulation: simulationManager.getState(),
        world: worldManager.getGrid()
    });
    updateCountdownDisplay();
    render();
}

function expandFarm() {
    if (state.plots.length >= MAX_PLOTS) {
        window.alert('You have reached the maximum farm size of 30 plots.');
        return;
    }

    if (state.money < EXPANSION_COST) {
        window.alert(`You need ${EXPANSION_COST} gold to expand the farm.`);
        return;
    }

    state.money -= EXPANSION_COST;
    const nextPlotId = state.plots.length + 1;
    state.plots.push({
        id: nextPlotId,
        crop: null,
        growth: 0,
        ready: false
    });
    state.selectedPlotId = nextPlotId;
    render();
}

function resetGame() {
    const confirmed = window.confirm('Reset the farm and clear the saved browser data?');
    if (!confirmed) {
        return;
    }

    state = structuredClone(defaultState);
    localStorage.removeItem(STORAGE_KEY);
    render();
}

seedSelect.addEventListener('change', (event) => {
    state.selectedSeed = event.target.value;
    saveState();
});

speedUpTimerCheckbox.addEventListener('change', (event) => {
    isSpeedupMode = event.target.checked;

    if (isSpeedupMode && remainingDayMs <= SPEEDUP_THRESHOLD_MS) {
        isSpeedupMode = false;
        event.target.checked = false;
    }
});

plantButton.addEventListener('click', plantSelectedCrop);
harvestButton.addEventListener('click', harvestSelectedCrop);
// nextDayButton.addEventListener('click', advanceDay);
expandButton.addEventListener('click', expandFarm);
forageButton.addEventListener('click', forageSeeds);
saveButton.addEventListener('click', () => {
    saveState();
    window.alert('Farm saved in your browser.');
});
resetButton.addEventListener('click', resetGame);

render();