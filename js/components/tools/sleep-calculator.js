class SleepCalculator {
    constructor() {
        this.bedtimeInput = document.getElementById('bedtime');
        this.wakeTimeInput = document.getElementById('wake-time');
        this.calculateBtn = document.getElementById('calculate-sleep');
        this.resultDiv = document.getElementById('sleep-result');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
    }
    
    calculate() {
        const bedtime = new Date(`2000-01-01T${this.bedtimeInput.value}`);
        const wakeTime = new Date(`2000-01-01T${this.wakeTimeInput.value}`);
        
        if (wakeTime <= bedtime) {
            wakeTime.setDate(wakeTime.getDate() + 1);
        }
        
        const diffMs = wakeTime - bedtime;
        const sleepHours = Math.floor(diffMs / (1000 * 60 * 60));
        const sleepMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        this.displayResult(sleepHours, sleepMinutes);
    }
    
    displayResult(hours, minutes) {
        const cycles = Math.round((hours * 60 + minutes) / 90);
        
        this.resultDiv.innerHTML = `
            <div class="result-card">
                <h3>Your Sleep Analysis</h3>
                <p><strong>Duration:</strong> ${hours}h ${minutes}m</p>
                <p><strong>Sleep Cycles:</strong> ${cycles} cycles</p>
                <p class="sleep-quality ${this.getSleepQuality(hours)}">
                    ${this.getSleepMessage(hours)}
                </p>
                
                <!-- Affiliate Section -->
                <div class="affiliate-recommendation">
                    <h4>Improve Your Sleep</h4>
                    <p>Check out our recommended <a href="../affiliate/sleep-aids.html">sleep aids and trackers</a></p>
                </div>
            </div>
        `;
        
        // Show ads after calculation
        this.showRelevantAds();
    }
    
    getSleepQuality(hours) {
        if (hours >= 7 && hours <= 9) return 'excellent';
        if (hours >= 6) return 'good';
        return 'poor';
    }
    
    getSleepMessage(hours) {
        if (hours >= 7 && hours <= 9) return 'Perfect! You're getting optimal sleep.';
        if (hours >= 6) return 'Good, but try for 7-9 hours for optimal health.';
        return 'Insufficient sleep. Consider improving your sleep habits.';
    }
    
    showRelevantAds() {
        // Trigger AdSense for sleep-related ads
        if (window.adsbygoogle) {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    }
}

// Initialize when page loads
if (document.getElementById('sleep-calculator')) {
    new SleepCalculator();
}
