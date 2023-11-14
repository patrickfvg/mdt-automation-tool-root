document.addEventListener('DOMContentLoaded', function() {
    var generateButton = document.getElementById('generate-button');
    var copyButton = document.getElementById('copy-button');
    var dataCenterUrlInput = document.getElementById('data-center-url');
    var foldersToExcludeInput = document.getElementById('folders-to-exclude');
    var outputArea = document.getElementById('output-area');

    if (!generateButton || !copyButton || !dataCenterUrlInput || !foldersToExcludeInput || !outputArea) {
        console.error('One or more essential elements are missing in the HTML structure.');
        return;
    }

    generateButton.addEventListener('click', function() {
        var dataCenterUrl = dataCenterUrlInput.value.trim();
        var tabInput = document.querySelector('input[name="spreadsheet-tab"]:checked');
        var foldersToExclude = foldersToExcludeInput.value.trim().split('\n').join('|');

        if (!dataCenterUrl || !tabInput || !foldersToExclude) {
            alert('Please fill in all required fields.');
            return;
        }

        var tabName = tabInput.value;
        var formula = `=SORT(FILTER(IMPORTRANGE("${dataCenterUrl}", "${tabName}!A2:A"), NOT(REGEXMATCH(IMPORTRANGE("${dataCenterUrl}", "${tabName}!A2:A"), "${foldersToExclude}"))), 1, TRUE)`;
        
        outputArea.textContent = formula;
        copyButton.style.display = 'block';
    });

    copyButton.addEventListener('click', function() {
        var formula = outputArea.textContent;
        navigator.clipboard.writeText(formula).then(function() {
            alert("Formula copied to clipboard!");
        }, function(err) {
            alert("Error in copying text: " + err);
        });
    });
});
