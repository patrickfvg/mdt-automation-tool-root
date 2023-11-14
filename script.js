document.getElementById('generateFormula').addEventListener('click', function() {
    var dataCenterUrl = document.getElementById('dataCenterUrl').value;
    var spreadsheetTabName = document.querySelector('input[name="spreadsheetTabName"]:checked').value;
    var foldersToExclude = document.getElementById('foldersToExclude').value;

    var formula = `=SORT(FILTER(IMPORTRANGE("${dataCenterUrl}", "${spreadsheetTabName}!A2:A"), NOT(REGEXMATCH(IMPORTRANGE("${dataCenterUrl}", "${spreadsheetTabName}!A2:A"), "${foldersToExclude}"))), 1, TRUE)`;

    document.getElementById('formulaOutput').value = formula;
});

document.getElementById('copyFormula').addEventListener('click', function() {
    var formulaOutput = document.getElementById('formulaOutput');
    formulaOutput.select();
    formulaOutput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert("Formula copied to clipboard!");
});
