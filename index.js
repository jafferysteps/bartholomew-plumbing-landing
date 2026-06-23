// Global service calculator state
let currentService = 'tuneup';

// Service Configurations & Pricing Data
const serviceData = {
    tuneup: {
        name: 'Heating Tune-Up',
        baseline: 129,
        maxBaseline: 159,
        options: [
            { id: 'radiator_check', name: 'Radiator Health Check', desc: 'Inspect older radiator valves and venting', price: 30 },
            { id: 'thermostat_cal', name: 'Thermostat Calibration', desc: 'Sync and optimize smart/manual thermostats', price: 20 },
            { id: 'filter_replace', name: 'Premium Filter Change', desc: 'Replaces main intake filters for fresh air flow', price: 15 }
        ]
    },
    boiler: {
        name: 'Boiler Repair',
        baseline: 250,
        maxBaseline: 320,
        options: [
            { id: 'pump_swap', name: 'Circulation Pump Swap', desc: 'Replaces faulty loop pumps to restore heat circulation', price: 180 },
            { id: 'feeder_fix', name: 'Auto Feeder Replacement', desc: 'Repairs or installs new automated water makeup valve', price: 95 },
            { id: 'boiler_flush', name: 'Full Radiator Loop Flush', desc: 'Flushes out sediment & balances cold radiator spots', price: 110 }
        ]
    },
    leak: {
        name: 'Leak & Pipe Repair',
        baseline: 180,
        maxBaseline: 240,
        options: [
            { id: 'copper_patch', name: 'Copper Line Weld/Patch', desc: 'Welds/seals damaged or leaking standard water lines', price: 70 },
            { id: 'main_valve', name: 'Main Shut-off Valve Swap', desc: 'Installs new full-port heavy duty brass shutoff valve', price: 120 },
            { id: 'press_balance', name: 'Pressure Balancing Scan', desc: 'Adjusts expansion tanks and regulators back to safe psi', price: 50 }
        ]
    }
};

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set up calculator options for the default service (tune-up)
    renderCalculatorOptions();
    
    // Check url params for default view (e.g. if we want to show pitch directly)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'pitch') {
        switchView('pitch');
    }
});

// View Toggle between Customer and Pitch Mode
function switchView(mode) {
    const body = document.body;
    const btnCustomer = document.getElementById('btn-customer-view');
    const btnPitch = document.getElementById('btn-pitch-view');
    const pitchBanner = document.getElementById('pitch-banner');
    
    if (mode === 'pitch') {
        body.classList.add('pitch-mode');
        btnPitch.classList.add('active');
        btnCustomer.classList.remove('active');
        if (pitchBanner) pitchBanner.style.display = 'block';
    } else {
        body.classList.remove('pitch-mode');
        btnCustomer.classList.add('active');
        btnPitch.classList.remove('active');
        if (pitchBanner) pitchBanner.style.display = 'none';
    }
}

// Service Selector Switcher inside Calculator
function selectCalcService(serviceKey) {
    currentService = serviceKey;
    
    // Update active service buttons in the DOM
    const buttons = document.querySelectorAll('.service-btn-item');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Highlight selected
    const clickedBtn = event.currentTarget || document.querySelector(`[onclick="selectCalcService('${serviceKey}')"]`);
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
    
    // Re-render choices & calculate price
    renderCalculatorOptions();
}

// Render dynamic checkable elements for calculator
function renderCalculatorOptions() {
    const container = document.getElementById('service-options-container');
    if (!container) return;
    
    const activeService = serviceData[currentService];
    let html = '<div class="calc-options-list">';
    
    activeService.options.forEach(opt => {
        html += `
            <div class="calc-option-row">
                <div class="option-info">
                    <span class="option-name">${opt.name}</span>
                    <span class="option-desc">${opt.desc}</span>
                </div>
                <label class="switch">
                    <input type="checkbox" id="${opt.id}" value="${opt.price}" onchange="calculatePrice()">
                    <span class="slider"></span>
                </label>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // Run initial calculation for default state of checked/unchecked options
    calculatePrice();
}

// Live price calculator updates
function calculatePrice() {
    const activeService = serviceData[currentService];
    let minTotal = activeService.baseline;
    let maxTotal = activeService.maxBaseline;
    
    activeService.options.forEach(opt => {
        const checkbox = document.getElementById(opt.id);
        if (checkbox && checkbox.checked) {
            minTotal += opt.price;
            maxTotal += opt.price;
        }
    });
    
    // Render the new price display range
    const display = document.getElementById('calc-price-display');
    if (display) {
        display.textContent = `$${minTotal} - $${maxTotal}`;
    }
}
