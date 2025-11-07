class BodyFatCalculator {
    constructor() {
        this.genderInputs = document.querySelectorAll('input[name="gender"]');
        this.ageInput = document.getElementById('age');
        this.weightInput = document.getElementById('weight');
        this.heightInput = document.getElementById('height');
        this.waistInput = document.getElementById('waist');
        this.neckInput = document.getElementById('neck');
        this.hipInput = document.getElementById('hip');
        this.calculateBtn = document.getElementById('calculate-bodyfat');
        this.resultDiv = document.getElementById('bodyfat-result');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
        
        // Show/hide hip input based on gender
        this.genderInputs.forEach(input => {
            input.addEventListener('change', () => this.toggleHipInput());
        });
    }
    
    toggleHipInput() {
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const hipGroup = document.getElementById('hip-group');
        
        if (gender === 'female') {
            hipGroup.style.display = 'block';
        } else {
            hipGroup.style.display = 'none';
        }
    }
    
    calculate() {
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseInt(this.ageInput.value);
        const weight = parseFloat(this.weightInput.value);
        const height = parseFloat(this.heightInput.value);
        const waist = parseFloat(this.waistInput.value);
        const neck = parseFloat(this.neckInput.value);
        const hip = gender === 'female' ? parseFloat(this.hipInput.value) : 0;
        
        if (!this.validateInputs(age, weight, height, waist, neck, hip, gender)) {
            return;
        }
        
        const bodyFat = this.calculateBodyFat(gender, age, weight, height, waist, neck, hip);
        this.displayResult(bodyFat, gender);
        Storage.trackToolUsage('bodyfat-calculator');
    }
    
    validateInputs(age, weight, height, waist, neck, hip, gender) {
        if (!age || age < 15 || age > 100) {
            this.showError('Please enter a valid age (15-100)');
            return false;
        }
        if (!weight || weight <= 0) {
            this.showError('Please enter a valid weight');
            return false;
        }
        if (gender === 'female' && (!hip || hip <= 0)) {
            this.showError('Please enter hip measurement for female calculation');
            return false;
        }
        return true;
    }
    
    calculateBodyFat(gender, age, weight, height, waist, neck, hip) {
        // US Navy Method formula
        if (gender === 'male') {
            return 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
        } else {
            return 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
        }
    }
    
    displayResult(bodyFat, gender) {
        const category = this.getBodyFatCategory(bodyFat, gender);
        
        this.resultDiv.innerHTML = `
            <div class="result-card">
                <h3>Your Body Fat Analysis</h3>
                
                <div class="bodyfat-score">
                    <div class="main-percentage" style="color: ${category.color}">
                        ${bodyFat.toFixed(1)}%
                    </div>
                    <div class="category" style="color: ${category.color}">
                        ${category.name}
                    </div>
                </div>
                
                <div class="bodyfat-chart">
                    <h4>Body Fat Categories</h4>
                    <div class="category-list">
                        ${this.getCategoryList(gender)}
                    </div>
                </div>
                
                <div class="health-recommendations">
                    <h4>Health Recommendations</h4>
                    <p>${category.recommendation}</p>
                </div>
                
                <!-- Affiliate Section -->
                <div class="affiliate-recommendation">
                    <h4>Track Your Progress</h4>
                    <p>Consider using <a href="../affiliate/body-scales.html">smart body scales</a> or <a href="../affiliate/measurement-tools.html">measurement tools</a> to monitor your body composition changes.</p>
                </div>
            </div>
        `;
        
        this.showRelevantAds();
    }
    
    getBodyFatCategory(percentage, gender) {
        const categories = gender === 'male' ? 
            // Male categories
            [
                { max: 6, name: 'Essential Fat', color: '#2196F3', recommendation: 'Maintain current level - this is the minimum for basic physiological function.' },
                { max: 14, name: 'Athletic', color: '#4CAF50', recommendation: 'Excellent level - maintain through balanced diet and regular exercise.' },
                { max: 18, name: 'Fitness', color: '#8BC34A', recommendation: 'Good level - continue current fitness routine.' },
                { max: 25, name: 'Average', color: '#FFC107', recommendation: 'Consider adding more cardio and strength training to your routine.' },
                { max: 100, name: 'High', color: '#f44336', recommendation: 'Focus on consistent exercise and balanced nutrition to reduce health risks.' }
            ] :
            // Female categories
            [
                { max: 14, name: 'Essential Fat', color: '#2196F3', recommendation: 'Maintain current level - this is the minimum for basic physiological function.' },
                { max: 21, name: 'Athletic', color: '#4CAF50', recommendation: 'Excellent level - maintain through balanced diet and regular exercise.' },
                { max: 25, name: 'Fitness', color: '#8BC34A', recommendation: 'Good level - continue current fitness routine.' },
                { max: 32, name: 'Average', color: '#FFC107', recommendation: 'Consider adding more cardio and strength training to your routine.' },
                { max: 100, name: 'High', color: '#f44336', recommendation: 'Focus on consistent exercise and balanced nutrition to reduce health risks.' }
            ];
        
        return categories.find(cat => percentage <= cat.max);
    }
    
    getCategoryList(gender) {
        const ranges = gender === 'male' ? 
            [
                'Essential: 2-6%',
                'Athletic: 6-14%', 
                'Fitness: 14-18%',
                'Average: 18-25%',
                'High: 25%+'
            ] :
            [
                'Essential: 10-14%',
                'Athletic: 14-21%',
                'Fitness: 21-25%', 
                'Average: 25-32%',
                'High: 32%+'
            ];
        
        return ranges.map(range => `<div class="category-item">${range}</div>`).join('');
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
if (document.getElementById('bodyfat-calculator')) {
    new BodyFatCalculator();
}
