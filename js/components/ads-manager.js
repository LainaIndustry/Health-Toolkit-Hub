class AdsManager {
    constructor() {
        this.adUnits = [];
        this.initialized = false;
    }
    
    initialize() {
        if (this.initialized) return;
        
        this.setupAdUnits();
        this.injectAdSenseScript();
        this.initialized = true;
    }
    
    setupAdUnits() {
        // Define ad units for different page sections
        this.adUnits = [
            {
                id: 'header-ad',
                client: 'ca-pub-XXXXXXXXXXXXXX',
                slot: 'XXXXXXXXXX',
                format: 'auto'
            },
            {
                id: 'in-article-ad',
                client: 'ca-pub-XXXXXXXXXXXXXX', 
                slot: 'XXXXXXXXXX',
                format: 'fluid'
            },
            {
                id: 'sidebar-ad',
                client: 'ca-pub-XXXXXXXXXXXXXX',
                slot: 'XXXXXXXXXX',
                format: 'vertical'
            }
        ];
    }
    
    injectAdSenseScript() {
        // Script is already in HTML, just push ads
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
    
    showAd(adUnitId) {
        const adElement = document.getElementById(adUnitId);
        if (adElement && window.adsbygoogle) {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    }
    
    showRelevantAds(pageType, keywords = []) {
        // Show contextually relevant ads based on page content
        switch(pageType) {
            case 'sleep-calculator':
                this.showAd('in-article-ad');
                break;
            case 'blog-post':
                this.showAd('header-ad');
                this.showAd('in-article-ad');
                break;
            case 'affiliate-page':
                this.showAd('sidebar-ad');
                break;
        }
    }
    
    trackAdPerformance(adUnit, metrics) {
        // Basic ad performance tracking
        const analytics = Storage.getData('adAnalytics') || {};
        if (!analytics[adUnit]) {
            analytics[adUnit] = { views: 0, clicks: 0 };
        }
        analytics[adUnit].views++;
        Storage.saveData('adAnalytics', analytics);
    }
}

// Initialize ads
const adsManager = new AdsManager();
document.addEventListener('DOMContentLoaded', () => {
    adsManager.initialize();
});
