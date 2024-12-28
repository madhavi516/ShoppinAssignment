const caseOptions = document.querySelectorAll("#case-options.option");
const sizeOptions = document.querySelectorAll("#size-options.option");
const collectionDropdown = document.getElementById("collection-dropdown");
const watchPreview = document.getElementById("watch-preview");
const priceDisplay = document.getElementById("price-display");
const saveButton = document.getElementById("save-button");
const shareButton = document.getElementById("share-button");
const downloadButton = document.getElementById("download-button");

let selectedCase = null;
let selectedSize = null;
let selectedCollection = "Series 10";
let basePrice = 400; // Base price for calculations 

//prices for cases and sizes 
const priceMap = {
    case: {
        Aluminum: 0,
        "Stainless Steel": 200,
        Titanium: 400
    },
    size: {
        "40mm": 0,
        "44mm": 50,
        "49mm": 100
    },
    collection: {
        "Series 10": 0,
        Hermes: 500,
        SE: -100
    },
};

//Helper function to handle selection 
function handleSelection(options, type) {
    options.forEach((option) => {
        option.addEventListener("click", () => {
            //clear previous selection 
            options.forEach((opt) =>
                opt.classList.remove("selected"));
            //mark current option as selected 
            option.classList.add("selected");

            // Update the selected value 
            if (type === "case") {
                selectedCase = option.dataset.case;
            }
            if (type === "size") {
                selectedSize = option.dataset.size;
            }
            // Update the preview and price 
            updatePreview();
            updatePrice();
        });
    });
}
//Handle collection switching 
collectionDropdown.addEventListener("change", () => {
    selectedCollection = collectionDropdown.value;
    updatePreview();
    updatePrice();
});
// Update the watch preview 
function updatePreview() {
    if (selectedcase && selectedSize) {
        watchPreview.textContent = `Selected: ${selectedCollection}, ${selectedCase} Case, ${selectedSize}`;

    } else {
        watchPreview.textContent = "Please select a case and size.";
    }
}

// Update the total price 
function updatePrice() {
    if (selectedCase && selectedSize) {
        const casePrice = priceMap.case[selectedCase] || 0;
        const sizePrice = priceMap.size[selectedSize] || 0;
        const collectionprice = pricemap.collection[selectedCollection] || 0;

        const totalPrice = basePrice + casePrice + sizePrice + collectionPrice;
        priceDisplay.textContent = `Total Price: $${totalPrice}`;
    } else {
        priceDisplay.textContent = "Total Price: $0";
    }
}

// Save and Share functionality 
saveButton.addEventListener("click", () => {
    const config = `Configuration: ${selectedCollection}, ${selectedCase} Case, ${selectedSize}`;
    const shareableLink = `${window.location.href}?config=${encodeURIComponent(config)}`;

    alert(`Saved configuration! Share this link: ${shareableLink}`);
});

// Social media sharing 
shareButton.addEventListener("click", () => {
    const config = `I customised my Apple Watch: ${selectedCollection}, ${selectedcase} Case, ${selectedSize}.Total price:${priceDisplay.textContent}`;
    const shareableLink = `${window.location.href}?config=${encodeURIComponent(config)}`;

    //Share on social media 

    const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(config)}$url=${encodeURIComponent(shareableLink)}`;
    const facebookLink = `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`;

    // Open links in a new tab 
    window.open(twitterLink, "_blank");
    window.open(facebookLink, "_blank");
});
// Download as image 
downloadButton.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set canvas size 
    canvas.width = 500;
    canvas.height = 300;
    // Draw text 
    context.fillStyle = "#000";
    context.font = "16px Arial";
    context.fillText(`Configuration:`, 10, 30);
    context.fillText(`Collection: ${selectedCollection}`, 10, 60);
    context.fillText(`case: ${selectedCase}`, 10, 90);
    context.fillText(`size: ${selectedSize}`, 10, 120);
    context.fillText(`Price: ${priceDisplay.textContent}`, 10, 150);

    // Download the image 
    const link = document.createElement("a");
    link.download = "apple_watch_configuration.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

//initialize event listeners 
handleSelection(caseOptions, "case");
handleSelection(sizeOptions, "size");