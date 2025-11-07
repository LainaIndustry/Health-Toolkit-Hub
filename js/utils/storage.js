// Local storage management
const Storage = {
    // Save user data
    saveData: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    
    // Get user data
    getData: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    
    // Save user preferences
    savePreferences: (prefs) => {
        return this.saveData('userPreferences', prefs);
    },
    
    // Get user preferences
    getPreferences: () => {
        return this.getData('userPreferences') || {
            theme: 'light',
            units: 'metric',
            notifications: true
        };
    },
    
    // Track tool usage
    trackToolUsage: (toolName) => {
        const usage = this.getData('toolUsage') || {};
        usage[toolName] = (usage[toolName] || 0) + 1;
        this.saveData('toolUsage', usage);
    }
};
