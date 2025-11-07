// Utility functions
const Utils = {
    // Format numbers with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Calculate BMI
    calculateBMI: (weight, height) => {
        return (weight / ((height / 100) ** 2)).toFixed(1);
    },
    
    // Calculate Calories (Mifflin-St Jeor Formula)
    calculateCalories: (age, gender, weight, height, activityLevel) => {
        const bmr = gender === 'male' 
            ? (10 * weight) + (6.25 * height) - (5 * age) + 5
            : (10 * weight) + (6.25 * height) - (5 * age) - 161;
            
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            veryActive: 1.9
        };
        
        return Math.round(bmr * activityMultipliers[activityLevel]);
    },
    
    // Get BMI category
    getBMICategory: (bmi) => {
        if (bmi < 18.5) return { category: 'Underweight', color: '#2196F3' };
        if (bmi < 25) return { category: 'Normal weight', color: '#4CAF50' };
        if (bmi < 30) return { category: 'Overweight', color: '#FF9800' };
        return { category: 'Obese', color: '#f44336' };
    },
    
    // Debounce function for search
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
