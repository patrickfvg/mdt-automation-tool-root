document.addEventListener('DOMContentLoaded', function() {
  var generateButton = document.getElementById('generate-button');
  var copyButton = document.getElementById('copy-button');

  if (generateButton && copyButton) {
    generateButton.addEventListener('click', function() {
      var dataCenterUrl = document.getElementById('data-center-url').value;
      var tabInput = document.querySelector('input[name="spreadsheet-tab"]:checked');
      var foldersToExcludeInput = document.getElementById('folders-to-exclude');

      if (dataCenterUrl && tabInput && foldersToExcludeInput) {
        var tabName = tabInput.value;
        var foldersToExclude = foldersToExcludeInput.value.split('\n').join('|');
        
        var formula = `=SORT(FILTER(IMPORTRANGE("${dataCenterUrl}", "${tabName}!A2:A"), NOT(REGEXMATCH(IMPORTRANGE("${dataCenterUrl}", "${tabName}!A2:A"), "${foldersToExclude}"))), 1, TRUE)`;
        
        document.getElementById('output-area').textContent = formula;
        copyButton.style.display = 'block';
      } else {
        alert('Please fill in all required fields.');
      }
    });

    copyButton.addEventListener('click', function() {
      var formula = document.getElementById('output-area').textContent;
      navigator.clipboard.writeText(formula).then(function() {
        alert("Formula copied to clipboard!");
      }, function(err) {
        alert("Error in copying text: " + err);
      });
    });
  } else {
    console.error('Required elements not found on the page.');
  }
});
