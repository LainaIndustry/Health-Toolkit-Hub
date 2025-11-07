class WaterCalculator {
    constructor() {
        this.weightInput = document.getElementById('weight');
        this.weightUnitSelect = document.getElementById('weight-unit');
        this.activitySelect = document.getElementById('activity');
        this.climateSelect = document.getElementById('climate');
        this.pregnantSelect = document.getElementById('pregnant');
        this.calculateBtn = document.getElementById('calculate-water');
        this.resultDiv = document.getElementById('water-result');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
    }
    
    calculate() {
        const weight = parseFloat(this.weightInput.value);
        const weightUnit = this.weightUnitSelect.value;
        const activity = this.activitySelect.value;
        const climate = this.climateSelect.value;
        const pregnant = this.pregnantSelect.value;
        
        if (!weight || weight <= 0) {
            this.showError('Please enter a valid weight');
            return;
        }
        
        // Convert weight to kg if in lbs
        const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
        
        let waterIntake = this.calculateBaseWater(weightKg);
        waterIntake = this.adjustForActivity(waterIntake, activity);
        waterIntake = this.adjustForClimate(waterIntake, climate);
        waterIntake = this.adjustForPregnancy(waterIntake, pregnant);
        
        this.displayResult(waterIntake, weightKg);
        Storage.trackToolUsage('water-calculator');
    }
    
    calculateBaseWater(weightKg) {
        // Base formula: 30-35 ml per kg of body weight
        return weightKg * 0.033; // liters
    }
    
    adjustForActivity(baseIntake, activity) {
        const adjustments = {
            'sedentary': 0,
            'light': 0.2,
            'moderate': 0.5,
            'heavy': 0.8,
            'athlete': 1.2
        };
        return baseIntake + adjustments[activity];
    }
    
    adjustForClimate(baseIntake, climate) {
        const adjustments = {
            'temperate': 0,
            'hot': 0.5,
            'dry': 0.8,
            'cold': -0.2
        };
        return baseIntake + adjustments[climate];
    }
    
    adjustForPregnancy(baseIntake, pregnant) {
        const adjustments = {
            'none': 0,
            'pregnant': 0.3,
            'breastfeeding': 0.8
        };
        return baseIntake + adjustments[pregnant];
    }
    
    displayResult(waterIntake, weightKg) {
        const liters = waterIntake;
        const cups = liters * 4.22675;
        const ounces = liters * 33.814;
        
        this.resultDiv.innerHTML = `
            <div class="result-card">
                <h3>Your Daily Water Needs</h3>
                
                <div class="water-summary">
                    <div class="water-amount">
                        <div class="main-amount">${liters.toFixed(1)}</div>
                        <div class="unit">Liters</div>
                    </div>
                    
                    <div class="water-equivalents">
                        <div class="equivalent">
                            <strong>${cups.toFixed(0)}</strong> cups (8oz each)
                        </div>
                        <div class="equivalent">
                            <strong>${ounces.toFixed(0)}</strong> fluid ounces
                        </div>
                    </div>
                </div>
                
                <div class="hydration-schedule">
                    <h4>Recommended Drinking Schedule</h4>
                    <div class="schedule-grid">
                        <div class="schedule-item">
                            <strong>Morning (7-9 AM):</strong> ${(liters * 0.2).toFixed(2)}L
                        </div>
                        <div class="schedule-item">
                            <strong>Late Morning (10-12 PM):</strong> ${(liters * 0.2).toFixed(2)}L
                        </div>
                        <div class="schedule-item">
                            <strong>Afternoon (1-4 PM):</strong> ${(liters * 0.3).toFixed(2)}L
                        </div>
                        <div class="schedule-item">
                            <strong>Evening (5-8 PM):</strong> ${(liters * 0.3).toFixed(2)}L
                        </div>
                    </div>
                </div>
                
                <div class="hydration-tips">
                    <h4>Hydration Tips</h4>
                    <ul>
                        <li>Drink a glass of water upon waking</li>
                        <li>Keep a water bottle visible throughout the day</li>
                        <li>Drink before you feel thirsty</li>
                        <li>Monitor urine color (pale yellow is ideal)</li>
                    </ul>
                </div>
                
                <!-- Affiliate Section -->
                <div class="affiliate-recommendation">
                    <h4>Stay Hydrated</h4>
                    <p>Check out our recommended <a href="../affiliate/water-bottles.html">water bottles</a> and <a href="../affiliate/hydration-packs.html">hydration tracking tools</a>.</p>
                </div>
            </div>
        `;
        
        this.showRelevantAds();
    }
    
    showError(message) {
        this.resultDiv.innerHTML = `
            <div class="error-message">
                ${message}
            </div>
        `;
    }
    
    showRelevantAds() {
        if (window.adsbygoogle) {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    }
}

// Initialize when page loads
if (document.getElementById('water-calculator')) {
    new WaterCalculator();
}
