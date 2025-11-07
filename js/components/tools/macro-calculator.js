class MacroCalculator {
    constructor() {
        this.form = document.getElementById('macro-form');
        this.resultDiv = document.getElementById('macro-result');
        
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
            calories: parseInt(formData.get('calories')),
            goal: formData.get('goal'),
            diet: formData.get('diet')
        };
        
        if (!data.calories || data.calories < 500) {
            this.showError('Please enter valid calorie target (minimum 500)');
            return;
        }
        
        const macros = this.calculateMacros(data);
        this.displayResult(macros, data);
        Storage.trackToolUsage('macro-calculator');
    }
    
    calculateMacros(data) {
        let proteinRatio, carbRatio, fatRatio;
        
        switch(data.goal) {
            case 'weightLoss':
                proteinRatio = 0.35;
                carbRatio = 0.40;
                fatRatio = 0.25;
                break;
            case 'muscleGain':
                proteinRatio = 0.30;
                carbRatio = 0.45;
                fatRatio = 0.25;
                break;
            case 'maintenance':
            default:
                proteinRatio = 0.25;
                carbRatio = 0.50;
                fatRatio = 0.25;
        }
        
        // Adjust for diet type
        if (data.diet === 'keto') {
            carbRatio = 0.05;
            fatRatio = 0.70;
        } else if (data.diet === 'highProtein') {
            proteinRatio += 0.10;
            carbRatio -= 0.05;
            fatRatio -= 0.05;
        }
        
        const proteinGrams = Math.round((data.calories * proteinRatio) / 4);
        const carbGrams = Math.round((data.calories * carbRatio) / 4);
        const fatGrams = Math.round((data.calories * fatRatio) / 9);
        
        return {
            protein: proteinGrams,
            carbs: carbGrams,
            fat: fatGrams,
            ratios: {
                protein: Math.round(proteinRatio * 100),
                carbs: Math.round(carbRatio * 100),
                fat: Math.round(fatRatio * 100)
            }
        };
    }
    
    displayResult(macros, data) {
        this.resultDiv.innerHTML = `
            <div class="result-card">
                <h3>Your Macronutrient Targets</h3>
                
                <div class="macro-summary">
                    <div class="macro-item protein">
                        <h4>Protein</h4>
                        <div class="macro-amount">${macros.protein}g</div>
                        <div class="macro-percent">${macros.ratios.protein}%</div>
                    </div>
                    
                    <div class="macro-item carbs">
                        <h4>Carbohydrates</h4>
                        <div class="macro-amount">${macros.carbs}g</div>
                        <div class="macro-percent">${macros.ratios.carbs}%</div>
                    </div>
                    
                    <div class="macro-item fat">
                        <h4>Fat</h4>
                        <div class="macro-amount">${macros.fat}g</div>
                        <div class="macro-percent">${macros.ratios.fat}%</div>
                    </div>
                </div>
                
                <div class="macro-chart">
                    <div class="chart-bar">
                        <div class="chart-segment protein" style="width: ${macros.ratios.protein}%"></div>
                        <div class="chart-segment carbs" style="width: ${macros.ratios.carbs}%"></div>
                        <div class="chart-segment fat" style="width: ${macros.ratios.fat}%"></div>
                    </div>
                </div>
                
                <div class="meal-plan-suggestion">
                    <h4>Sample Daily Distribution</h4>
                    <div class="meal-grid">
                        <div class="meal-item">
                            <strong>Breakfast:</strong> ${Math.round(macros.protein * 0.25)}g protein
                        </div>
                        <div class="meal-item">
                            <strong>Lunch:</strong> ${Math.round(macros.protein * 0.35)}g protein
                        </div>
                        <div class="meal-item">
                            <strong>Dinner:</strong> ${Math.round(macros.protein * 0.30)}g protein
                        </div>
                        <div class="meal-item">
                            <strong>Snacks:</strong> ${Math.round(macros.protein * 0.10)}g protein
                        </div>
                    </div>
                </div>
                
                <!-- Affiliate Section -->
                <div class="affiliate-recommendation">
                    <h4>Track Your Macros</h4>
                    <p>Use our recommended <a href="../affiliate/nutrition-apps.html">nutrition tracking apps</a> and <a href="../affiliate/food-scales.html">food scales</a> to easily monitor your macro intake.</p>
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
if (document.getElementById('macro-calculator')) {
    new MacroCalculator();
}
