// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    loadFeaturedTools();
    loadLatestBlogs();
    initializeAds();
});

// Load dynamic header
async function loadHeader() {
    const header = document.getElementById('main-header');
    header.innerHTML = `
        <nav class="navbar">
            <div class="nav-brand">
                <a href="index.html">HealthToolkit</a>
            </div>
            <ul class="nav-links">
                <li><a href="tools/index.html">All Tools</a></li>
                <li><a href="blog/index.html">Blog</a></li>
                <li><a href="affiliate/">Recommended Products</a></li>
            </ul>
        </nav>
    `;
}

// Load featured tools
async function loadFeaturedTools() {
    const response = await fetch('./data/tools-config.json');
    const tools = await response.json();
    const featured = tools.filter(tool => tool.featured).slice(0, 6);
    
    const container = document.getElementById('featured-tools');
    container.innerHTML = featured.map(tool => `
        <div class="tool-card">
            <img src="images/tools/${tool.icon}" alt="${tool.name}">
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="tools/${tool.slug}.html" class="btn">Use Tool</a>
        </div>
    `).join('');
}
