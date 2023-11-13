document.getElementById('generate-button').addEventListener('click', function() {
  var dataCenterUrl = document.getElementById('data-center-url').value;
  var tabName = document.querySelector('input[name="spreadsheet-tab"]:checked').value;
  var foldersToExclude = document.getElementById('folders-to-exclude').value.split('\n').join('|');

  var formula = `=SORT(FILTER(IMPORTRANGE("${dataCenterUrl}", "${tabName}!A2:A"), NOT(REGEXMATCH(IMPORTRANGE("${dataCenterUrl}", "${tabName}!A2:A"), "${foldersToExclude}"))), 1, TRUE)`;

  document.getElementById('output-area').textContent = formula;
  document.getElementById('copy-button').style.display = 'block';
});

document.getElementById('copy-button').addEventListener('click', function() {
  var formula = document.getElementById('output-area').textContent;
  navigator.clipboard.writeText(formula).then(function() {
    alert("Formula copied to clipboard!");
  }, function(err) {
    alert("Error in copying text: " + err);
  });
});
