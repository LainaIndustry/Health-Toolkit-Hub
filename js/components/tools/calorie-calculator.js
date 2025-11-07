class CalorieCalculator {
    constructor() {
        this.form = document.getElementById('calorie-form');
        this.resultDiv = document.getElementById('calorie-result');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculate();
        });
    }
    
    calculate() {
        const formData = new FormData(this.form);
        const data = {
            age: parseInt(formData.get('age')),
            gender: formData.get('gender'),
            weight: parseFloat(formData.get('weight')),
            height: parseFloat(formData.get('height')),
            activity: formData.get('activity'),
            goal: formData.get('goal')
        };
        
        // Validate inputs
        if (!this.validateInputs(data)) {
            return;
        }
        
        const maintenanceCalories = Utils.calculateCalories(
            data.age, data.gender, data.weight, data.height, data.activity
        );
        
        const goalCalories = this.calculateGoalCalories(maintenanceCalories, data.goal);
        
        this.displayResult(maintenanceCalories, goalCalories, data);
        Storage.trackToolUsage('calorie-calculator');
    }
    
    validateInputs(data) {
        if (!data.age || data.age < 15 || data.age > 100) {
            this.showError('Please enter a valid age (15-100)');
            return false;
        }
        if (!data.weight || data.weight < 30 || data.weight > 300) {
            this.showError('Please enter a valid weight');
            return false;
        }
        return true;
    }
    
    calculateGoalCalories(maintenance, goal) {
        const adjustments = {
            maintain: 0,
            mildLoss: -250,
            loss: -500,
            extremeLoss: -1000,
            mildGain: 250,
            gain: 500
        };
        
        return maintenance + adjustments[goal];
    }
    
    displayResult(maintenance, goal, data) {
        const protein = Math.round((goal * 0.3) / 4); // 30% of calories from protein
        const carbs = Math.round((goal * 0.4) / 4);  // 40% from carbs
        const fats = Math.round((goal * 0.3) / 9);   // 30% from fats
        
        this.resultDiv.innerHTML = `
            <div class="result-card">
                <h3>Your Calorie Analysis</h3>
                
                <div class="calorie-summary">
                    <div class="calorie-item">
                        <h4>Maintenance Calories</h4>
                        <p class="calorie-number">${Utils.formatNumber(maintenance)}</p>
                        <small>Calories per day to maintain weight</small>
                    </div>
                    
                    <div class="calorie-item">
                        <h4>Goal Calories</h4>
                        <p class="calorie-number">${Utils.formatNumber(goal)}</p>
                        <small>Calories per day for your goal</small>
                    </div>
                </div>
                
                <div class="macronutrients">
                    <h4>Recommended Macros</h4>
                    <div class="macro-grid">
                        <div class="macro-item">
                            <strong>Protein:</strong> ${Utils.formatNumber(protein)}g
                        </div>
                        <div class="macro-item">
                            <strong>Carbs:</strong> ${Utils.formatNumber(carbs)}g
                        </div>
                        <div class="macro-item">
                            <strong>Fats:</strong> ${Utils.formatNumber(fats)}g
                        </div>
                    </div>
                </div>
                
                <!-- Affiliate Section -->
                <div class="affiliate-recommendation">
                    <h4>Reach Your Goals Faster</h4>
                    <p>Check out our recommended <a href="../affiliate/nutrition-supplements.html">nutrition supplements and kitchen scales</a></p>
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
if (document.getElementById('calorie-calculator')) {
    new CalorieCalculator();
}
