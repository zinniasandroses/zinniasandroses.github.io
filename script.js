const SEED_DATA = {
    carrot: { label: 'Carrot', price: 2, growthTime: 2, sellPrice: 5, icon: '🥕' },
    tomato: { label: 'Tomato', price: 3, growthTime: 3, sellPrice: 8, icon: '🍅' },
    corn: { label: 'Corn', price: 2, growthTime: 2, sellPrice: 7, icon: '🌽' },
    lettuce: { label: 'Lettuce', price: 2, growthTime: 2, sellPrice: 6, icon: '🥬' },
    radish: { label: 'Radish', price: 1, growthTime: 1, sellPrice: 4, icon: '🌶️' }
};

const STORAGE_KEY = 'garden_survival_save';
const INITIAL_PLOT_COUNT = 6;
const MAX_PLOTS = 30;
const EXPANSION_COST = 12;
const CINAT_PER_ARIM = 5;

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

const moneyDisplay = document.getElementById('moneyDisplay');
const dayDisplay = document.getElementById('dayDisplay');
const seedSelect = document.getElementById('seedSelect');
const plotGrid = document.getElementById('plotGrid');
const inventoryList = document.getElementById('inventoryList');

const plantButton = document.getElementById('plantButton');
const harvestButton = document.getElementById('harvestButton');
const nextDayButton = document.getElementById('nextDayButton');
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

    state.plots.forEach((plot) => {
        if (!plot.crop) {
            return;
        }

        plot.growth += 1;
        const crop = SEED_DATA[plot.crop];
        plot.ready = plot.growth >= crop.growthTime;
    });

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

plantButton.addEventListener('click', plantSelectedCrop);
harvestButton.addEventListener('click', harvestSelectedCrop);
nextDayButton.addEventListener('click', advanceDay);
expandButton.addEventListener('click', expandFarm);
forageButton.addEventListener('click', forageSeeds);
saveButton.addEventListener('click', () => {
    saveState();
    window.alert('Farm saved in your browser.');
});
resetButton.addEventListener('click', resetGame);

render();