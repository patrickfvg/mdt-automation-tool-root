document.addEventListener('DOMContentLoaded', function() {
  var formulaGenerator = document.getElementById('formula-generator');

  if (!formulaGenerator) {
    console.error('Formula generator element not found on the page.');
    return;
  }

  formulaGenerator.addEventListener('click', function(event) {
    if (event.target.id === 'generate-button') {
      generateFormula();
    } else if (event.target.id === 'copy-button') {
      copyToClipboard();
    }
  });

  function generateFormula() {
    var dataCenterUrl = document.getElementById('data-center-url').value;
    var tabInput = document.querySelector('input[name="spreadsheet-tab"]:checked');
    var foldersToExcludeInput = document.getElementById('folders-to-exclude');
    var outputArea = document.getElementById('output-area');
    var copyButton = document.getElementById('copy-button');

    if (!dataCenterUrl || !isValidURL(dataCenterUrl)) {
      alert('Please enter a valid Data Center URL.');
      return;
    }
    if (!tabInput) {
      alert('Please select a Spreadsheet Tab.');
      return;
    }
    if (!foldersToExcludeInput) {
      console.error('Folders to exclude input not found on the page.');
      return;
    }

    var tabName = tabInput.value;
    var foldersToExclude = foldersToExcludeInput.value.split('\n').join('|');
    
    var formula = `=SORT(FILTER(IMPORTRANGE("${dataCenterUrl}", "${tabName}!A2:A"), NOT(REGEXMATCH(IMPORTRANGE("${dataCenterUrl}", "${tabName}!A2:A"), "${foldersToExclude}"))), 1, TRUE)`;
    
    outputArea.textContent = formula;
    copyButton.style.display = 'block';
  }

  function copyToClipboard() {
    var formula = document.getElementById('output-area').textContent;
    navigator.clipboard.writeText(formula).then(function() {
      alert("Formula copied to clipboard!");
    }, function(err) {
      alert("Error in copying text: " + err);
    });
  }

  function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }
});
