function main() {
    // Get UI components
    const appContainer = document.getElementById('app-container');
    const productNumber = document.getElementById('product-number');
    const productCount = document.getElementById('product-count-total');
    const rowCount = document.getElementById('products-per-row');
    const columnCount = document.getElementById('row-count');
    const additionalCount = document.getElementById('extra');
    const submitButton = document.getElementById('get-count');

    document.addEventListener('focusin', handleFocusInputElement);
    document.addEventListener('focusout', handleUnfocusInputElement);
    submitButton.addEventListener('click', handleSubmit);

    // Event handlers
    function handleFocusInputElement(e) {
        if (e.target.value == 0) e.target.value = '';
    }

    function handleUnfocusInputElement(e) {
        if (!e.target.value) e.target.value = 0;
    }

    function handleSubmit() {
        const total = +productCount.value;
        const rows = +rowCount.value;
        const cols = +columnCount.value;
        const additional = +additionalCount.value;
        
        if (!total || !rows || !cols) return;

        const results = getPalletCount(total, rows, cols, additional);

        /* Reset form fields */
        productCount.value = '';
        rowCount.value = '';
        columnCount.value = '';
        additionalCount.value= '';

        /* Create UI components */
        const resultsContainer = document.createElement('div');
        const resultsHeading = document.createElement('h2');
        const resultsList = document.createElement('ul');
        const resultsProductsPerPallet = document.createElement('li');
        const resultsPalletCount = document.createElement('li');
        const resultsProductRemaining = document.createElement('li');

        /* Configure UI components */
        resultsContainer.classList.add('results');
        resultsHeading.innerHTML = productNumber.value ? `Expected count for <span class=brand-1>${productNumber.value}</span>` : 'Expected count for this line';
        resultsProductsPerPallet.innerHTML = '<span class="label">Boxes per pallet:</span> ' + results.productsPerPallet;
        resultsPalletCount.innerHTML = '<span class="label">Total pallets:</span> ' + results.palletCount;
        resultsProductRemaining.innerHTML = '<span class="label">Remaining boxes:</span> ' + results.productsRemaining;

        /* Append components to UI */
        resultsContainer.appendChild(resultsHeading);
        resultsList.appendChild(resultsProductsPerPallet);
        resultsList.appendChild(resultsProductsPerPallet);
        resultsList.appendChild(resultsPalletCount);
        resultsList.appendChild(resultsProductRemaining);
        resultsContainer.appendChild(resultsList);
        appContainer.appendChild(resultsContainer);
    }
}

function getPalletCount(total, rows, cols, additional) {
    const productsPerPallet = rows * cols + additional;
    const palletCount = Math.floor(total / productsPerPallet);
    const productsRemaining = total % productsPerPallet;

    return { productsPerPallet, palletCount, productsRemaining };
}

main();