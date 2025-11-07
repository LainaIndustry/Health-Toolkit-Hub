class ToolsHub {
    constructor() {
        this.tools = [];
        this.filteredTools = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        this.initialize();
    }
    
    async initialize() {
        await this.loadTools();
        this.renderTools();
        this.setupEventListeners();
    }
    
    async loadTools() {
        try {
            const response = await fetch('../data/tools-config.json');
            const data = await response.json();
            this.tools = data.tools;
            this.filteredTools = [...this.tools];
        } catch (error) {
            console.error('Error loading tools:', error);
        }
    }
    
    renderTools() {
        const container = document.getElementById('all-tools');
        if (!container) return;
        
        container.innerHTML = this.filteredTools.map(tool => `
            <div class="tool-card" data-category="${tool.category}" data-name="${tool.name.toLowerCase()}">
                <img src="../images/tools/${tool.icon}" alt="${tool.name}">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <div class="tool-meta">
                    <span class="tool-category">${this.getCategoryLabel(tool.category)}</span>
                    <span class="tool-popularity">${tool.usage || 'Popular'}</span>
                </div>
                <a href="${tool.slug}.html" class="btn">Use Tool</a>
            </div>
        `).join('');
    }
    
    getCategoryLabel(category) {
        const labels = {
            'nutrition': 'Nutrition',
            'fitness': 'Fitness', 
            'wellness': 'Wellness',
            'health': 'Health'
        };
        return labels[category] || category;
    }
    
    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });
        
        // Search input
        const searchInput = document.getElementById('tool-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }
    
    handleFilterClick(button) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Filter tools
        this.currentFilter = button.dataset.filter;
        this.applyFilters();
    }
    
    handleSearch(term) {
        this.searchTerm = term.toLowerCase();
        this.applyFilters();
    }
    
    applyFilters() {
        this.filteredTools = this.tools.filter(tool => {
            const matchesCategory = this.currentFilter === 'all' || tool.category === this.currentFilter;
            const matchesSearch = !this.searchTerm || 
                tool.name.toLowerCase().includes(this.searchTerm) ||
                tool.description.toLowerCase().includes(this.searchTerm) ||
                tool.keywords.some(keyword => keyword.toLowerCase().includes(this.searchTerm));
            
            return matchesCategory && matchesSearch;
        });
        
        this.renderTools();
    }
}

// Initialize on tools hub page
if (document.getElementById('all-tools')) {
    new ToolsHub();
}
