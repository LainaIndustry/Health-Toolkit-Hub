class BlogLoader {
    constructor() {
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.allPosts = [];
        this.filteredPosts = [];
        this.currentFilter = 'all';
        
        this.initialize();
    }
    
    async initialize() {
        await this.loadPosts();
        this.renderPosts();
        this.setupEventListeners();
    }
    
    async loadPosts() {
        try {
            const response = await fetch('../data/blog-posts.json');
            this.allPosts = await response.json();
            this.filteredPosts = [...this.allPosts];
        } catch (error) {
            console.error('Error loading blog posts:', error);
        }
    }
    
    renderPosts() {
        const container = document.getElementById('blog-grid');
        if (!container) return;
        
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const postsToShow = this.filteredPosts.slice(0, endIndex);
        
        container.innerHTML = postsToShow.map(post => `
            <div class="blog-card" data-category="${post.category}">
                <img src="../images/blog/${post.image}" alt="${post.title}">
                <div class="blog-content">
                    <span class="blog-meta">${post.date} • ${post.readTime}</span>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="../blog/${post.slug}.html" class="read-more">Read More</a>
                </div>
            </div>
        `).join('');
        
        this.toggleLoadMoreButton();
    }
    
    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });
        
        // Load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMorePosts();
            });
        }
    }
    
    handleFilterClick(button) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Filter posts
        this.currentFilter = button.dataset.filter;
        this.currentPage = 1;
        
        if (this.currentFilter === 'all') {
            this.filteredPosts = [...this.allPosts];
        } else {
            this.filteredPosts = this.allPosts.filter(post => 
                post.category === this.currentFilter
            );
        }
        
        this.renderPosts();
    }
    
    loadMorePosts() {
        this.currentPage++;
        this.renderPosts();
    }
    
    toggleLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more');
        if (!loadMoreBtn) return;
        
        const totalPosts = this.filteredPosts.length;
        const shownPosts = this.currentPage * this.postsPerPage;
        
        if (shownPosts >= totalPosts) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

// Initialize on blog listing page
if (document.getElementById('blog-grid')) {
    new BlogLoader();
}
