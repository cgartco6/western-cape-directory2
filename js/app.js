// Mock data for demonstration (in a real app, this would come from Firebase)
const regions = [
    { name: "West Coast", towns: ["Langebaan", "Saldanha", "Velddrif", "Yzerfontein"] },
    { name: "Winelands", towns: ["Stellenbosch", "Franschhoek", "Paarl", "Wellington"] },
    { name: "Overberg", towns: ["Hermanus", "Grabouw", "Caledon", "Gansbaai"] },
    { name: "Cape Metro", towns: ["Cape Town CBD", "Southern Suburbs", "Northern Suburbs", "Atlantic Seaboard"] }
];

const categories = [
    { name: "Estate Agents", icon: "fa-home" },
    { name: "Plumbers", icon: "fa-faucet" },
    { name: "Electricians", icon: "fa-bolt" },
    { name: "Auto Repairs", icon: "fa-car" },
    { name: "Builders", icon: "fa-hammer" },
    { name: "Restaurants", icon: "fa-utensils" }
];

const boostedListings = [
    {
        id: 1,
        name: "Cape Coastal Properties",
        description: "Specializing in coastal properties along the West Coast",
        area: "West Coast",
        town: "Langebaan",
        category: "Estate Agents",
        tier: "premium",
        boostExpiry: new Date(Date.now() + 3*24*60*60*1000), // 3 days from now
        image: "https://source.unsplash.com/random/600x400/?real-estate"
    },
    {
        id: 2,
        name: "Winelands Plumbing Solutions",
        description: "24/7 emergency plumbing services in the Winelands region",
        area: "Winelands",
        town: "Stellenbosch",
        category: "Plumbers",
        tier: "free",
        boostExpiry: new Date(Date.now() + 2*24*60*60*1000), // 2 days from now
        image: "https://source.unsplash.com/random/600x400/?plumber"
    },
    {
        id: 3,
        name: "Atlantic Electric",
        description: "Certified electricians for residential and commercial properties",
        area: "Cape Metro",
        town: "Atlantic Seaboard",
        category: "Electricians",
        tier: "enterprise",
        boostExpiry: new Date(Date.now() + 7*24*60*60*1000), // 7 days from now
        image: "https://source.unsplash.com/random/600x400/?electrician"
    }
];

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedAreas();
    loadFeaturedCategories();
    loadBoostedListings();
    
    // Set up search form
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = this.querySelector('input').value;
        alert(`Search functionality would show results for: ${searchTerm}`);
        // In a real app, this would redirect to search results page
    });
});

// Load featured areas on homepage
function loadFeaturedAreas() {
    const container = document.getElementById('featuredAreas');
    container.innerHTML = '';
    
    regions.forEach(region => {
        const col = document.createElement('div');
        col.className = 'col-md-3 mb-4';
        
        col.innerHTML = `
            <div class="card area-card h-100">
                <div class="card-body text-center">
                    <h5 class="card-title">${region.name}</h5>
                    <p class="card-text">${region.towns.slice(0, 3).join(', ')}${region.towns.length > 3 ? '...' : ''}</p>
                    <a href="area.html?area=${encodeURIComponent(region.name)}" class="btn btn-outline-light btn-sm">
                        Explore ${region.towns.length} Towns
                    </a>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Load featured categories on homepage
function loadFeaturedCategories() {
    const container = document.getElementById('featuredCategories');
    container.innerHTML = '';
    
    categories.forEach(category => {
        const col = document.createElement('div');
        col.className = 'col-md-2 mb-4';
        
        col.innerHTML = `
            <div class="card category-card h-100">
                <div class="card-body text-center">
                    <i class="${category.icon} fa-2x mb-3 text-primary"></i>
                    <h6 class="card-title">${category.name}</h6>
                    <a href="category.html?category=${encodeURIComponent(category.name)}" class="stretched-link"></a>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Load boosted listings on homepage
function loadBoostedListings() {
    const container = document.getElementById('boostedListings');
    container.innerHTML = '';
    
    boostedListings.forEach(listing => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        
        col.innerHTML = `
            <div class="card listing-card">
                <div class="position-relative">
                    <img src="${listing.image}" class="card-img-top" alt="${listing.name}">
                    <span class="area-tag">${listing.town}</span>
                    <span class="boosted-badge">BOOSTED</span>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <h5 class="card-title">${listing.name}</h5>
                        <span class="tier-badge tier-${listing.tier}">${listing.tier}</span>
                    </div>
                    <p class="card-text">${listing.description}</p>
                    <div class="d-flex justify-content-between">
                        <span class="badge badge-primary">${listing.category}</span>
                        <small class="text-muted">${getDaysRemaining(listing.boostExpiry)} days left</small>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Helper function to calculate days remaining
function getDaysRemaining(date) {
    const diff = date - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
