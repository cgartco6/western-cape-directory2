// Mock data for demonstration
const regions = [
    { 
        name: "West Coast", 
        towns: ["Langebaan", "Saldanha", "Velddrif", "Yzerfontein"],
        listings: {
            "Langebaan": [
                { id: 1, name: "Langebaan Properties", category: "Estate Agents", tier: "premium" },
                { id: 2, name: "West Coast Plumbing", category: "Plumbers", tier: "free" }
            ],
            "Saldanha": [
                { id: 3, name: "Saldanha Steel Services", category: "Manufacturing", tier: "enterprise" }
            ]
        }
    },
    { 
        name: "Winelands", 
        towns: ["Stellenbosch", "Franschhoek", "Paarl", "Wellington"],
        listings: {
            "Stellenbosch": [
                { id: 4, name: "Winelands Real Estate", category: "Estate Agents", tier: "premium" },
                { id: 5, name: "Stellenbosch Electric", category: "Electricians", tier: "free" }
            ],
            "Franschhoek": [
                { id: 6, name: "Franschhoek Fine Dining", category: "Restaurants", tier: "enterprise" }
            ]
        }
    },
    { 
        name: "Overberg", 
        towns: ["Hermanus", "Grabouw", "Caledon", "Gansbaai"],
        listings: {
            "Hermanus": [
                { id: 7, name: "Hermanus Whale Tours", category: "Tourism", tier: "premium" }
            ]
        }
    },
    { 
        name: "Cape Metro", 
        towns: ["Cape Town CBD", "Southern Suburbs", "Northern Suburbs", "Atlantic Seaboard"],
        listings: {
            "Cape Town CBD": [
                { id: 8, name: "CBD Auto Repairs", category: "Auto Repairs", tier: "free" },
                { id: 9, name: "City Electrical", category: "Electricians", tier: "premium" }
            ],
            "Southern Suburbs": [
                { id: 10, name: "Claremont Builders", category: "Builders", tier: "enterprise" }
            ]
        }
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadRegions();
});

function loadRegions() {
    const regionList = document.getElementById('regionList');
    
    regions.forEach(region => {
        const item = document.createElement('a');
        item.href = '#';
        item.className = 'list-group-item list-group-item-action';
        item.textContent = region.name;
        item.dataset.region = region.name;
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            loadTowns(region);
        });
        
        regionList.appendChild(item);
    });
}

function loadTowns(region) {
    document.getElementById('areaTitle').textContent = region.name;
    document.getElementById('townControls').classList.remove('d-none');
    
    const townList = document.getElementById('townList');
    townList.innerHTML = '';
    
    const townGroup = document.createElement('div');
    townGroup.className = 'btn-group flex-wrap';
    townGroup.setAttribute('role', 'group');
    
    region.towns.forEach(town => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-primary mb-2';
        button.textContent = town;
        button.dataset.town = town;
        
        button.addEventListener('click', function() {
            loadListingsForTown(region, town);
        });
        
        townGroup.appendChild(button);
    });
    
    townList.appendChild(townGroup);
    document.getElementById('areaListings').classList.add('d-none');
}

function loadListingsForTown(region, town) {
    document.getElementById('currentTown').textContent = town;
    document.getElementById('areaListings').classList.remove('d-none');
    
    const listingsContainer = document.getElementById('listingsContainer');
    listingsContainer.innerHTML = '';
    
    if (region.listings[town] && region.listings[town].length > 0) {
        region.listings[town].forEach(listing => {
            const col = document.createElement('div');
            col.className = 'col-md-6 mb-4';
            
            col.innerHTML = `
                <div class="card listing-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <h5 class="card-title">${listing.name}</h5>
                            <span class="tier-badge tier-${listing.tier}">${listing.tier}</span>
                        </div>
                        <p class="card-text">${listing.description || 'Specializing in quality services'}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge badge-primary">${listing.category}</span>
                            <button class="btn btn-sm btn-outline-primary">View Details</button>
                        </div>
                    </div>
                </div>
            `;
            
            listingsContainer.appendChild(col);
        });
    } else {
        listingsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-building fa-3x mb-3 text-muted"></i>
                <h4>No businesses listed in ${town} yet</h4>
                <p class="text-muted">Be the first to add your business to this area!</p>
                <a href="add-listing.html?town=${encodeURIComponent(town)}&area=${encodeURIComponent(region.name)}" 
                   class="btn btn-primary mt-2">
                    Add Your Business
                </a>
            </div>
        `;
    }
}
