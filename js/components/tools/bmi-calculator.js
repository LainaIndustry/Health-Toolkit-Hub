class BMICalculator {
    constructor() {
        this.weightInput = document.getElementById('weight');
        this.heightInput = document.getElementById('height');
        this.unitSelect = document.getElementById('unit');
        this.calculateBtn = document.getElementById('calculate-bmi');
        this.resultDiv = document.getElementById('bmi-result');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
        this.unitSelect.addEventListener('change', () => this.toggleUnits());
    }
    
    toggleUnits() {
        const isMetric = this.unitSelect.value === 'metric';
        
        document.getElementById('weight-unit').textContent = isMetric ? 'kg' : 'lbs';
        document.getElementById('height-unit').textContent = isMetric ? 'cm' : 'inches';
        
        // Clear inputs when switching units
        this.weightInput.value = '';
        this.heightInput.value = '';
    }
    
    calculate() {
        const weight = parseFloat(this.weightInput.value);
        const height = parseFloat(this.heightInput.value);
        const isMetric = this.unitSelect.value === 'metric';
        
        if (!weight || !height) {
            this.showError('Please enter valid weight and height');
            return;
        }
        
        let bmi;
        if (isMetric) {
            bmi = weight / ((height / 100) ** 2);
        } else {
            bmi = (weight / (height ** 2)) * 703;
        }
        
        this.displayResult(bmi);
        Storage.trackToolUsage('bmi-calculator');
    }
    
    displayResult(bmi) {
        const category = Utils.getBMICategory(bmi);
        
        this.resultDiv.innerHTML = `
            <div class="result-card">
                <h3>Your BMI Result</h3>
                <div class="bmi-score" style="color: ${category.color}">
                    <strong>${bmi.toFixed(1)}</strong>
                </div>
                <p><strong>Category:</strong> ${category.category}</p>
                <div class="bmi-chart">
                    <div class="bmi-bar">
                        <div class="bmi-indicator" style="left: ${Math.min((bmi / 40) * 100, 100)}%"></div>
                    </div>
                    <div class="bmi-labels">
                        <span>Underweight</span>
                        <span>Normal</span>
                        <span>Overweight</span>
                        <span>Obese</span>
                    </div>
                </div>
                
                <!-- Affiliate Section -->
                <div class="affiliate-recommendation">
                    <h4>Healthy Weight Management</h4>
                    <p>Check out our recommended <a href="../affiliate/fitness-equipment.html">fitness equipment and nutrition guides</a></p>
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
if (document.getElementById('bmi-calculator')) {
    new BMICalculator();
}
