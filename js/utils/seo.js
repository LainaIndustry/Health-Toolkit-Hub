// SEO and analytics utilities
const SEO = {
    // Track page views (simple version)
    trackPageView: (pageName) => {
        // You can integrate with Google Analytics here
        console.log(`Page viewed: ${pageName}`);
        
        // Simple analytics storage
        const analytics = Storage.getData('pageAnalytics') || {};
        analytics[pageName] = (analytics[pageName] || 0) + 1;
        Storage.saveData('pageAnalytics', analytics);
    },
    
    // Update meta tags dynamically
    updateMetaTags: (title, description, keywords = '') => {
        document.title = title;
        
        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = description;
        
        // Update keywords if provided
        if (keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = 'keywords';
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.content = keywords;
        }
    },
    
    // Generate JSON-LD structured data
    generateStructuredData: (data) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        document.head.appendChild(script);
    }
};
