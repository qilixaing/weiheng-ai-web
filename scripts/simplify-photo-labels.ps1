$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName Microsoft.VisualBasic
$appRoot = Split-Path -Parent $PSScriptRoot
$reviewRoot = Join-Path (Split-Path -Parent $appRoot) 'photo-food-expansion'
$labels = [System.Collections.Generic.HashSet[string]]::new()
foreach ($item in (Get-Content -LiteralPath (Join-Path $reviewRoot 'metadata.json') -Raw -Encoding utf8 | ConvertFrom-Json)) { [void]$labels.Add($item.name) }
foreach ($item in (Get-Content -LiteralPath (Join-Path $appRoot 'src/data/foodPhotoAdditions.json') -Raw -Encoding utf8 | ConvertFrom-Json)) { [void]$labels.Add($item.subject) }
foreach ($file in Get-ChildItem -LiteralPath $reviewRoot -Filter 'review-decisions*.json') {
  $decisions = Get-Content -LiteralPath $file.FullName -Raw -Encoding utf8 | ConvertFrom-Json
  foreach ($entry in $decisions.overrides.PSObject.Properties) { if ($entry.Value.name) { [void]$labels.Add($entry.Value.name) } }
}
$mapping = [ordered]@{}
foreach ($label in $labels) { $mapping[$label] = [Microsoft.VisualBasic.Strings]::StrConv($label, [Microsoft.VisualBasic.VbStrConv]::SimplifiedChinese, 2052) }
$mapping | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $reviewRoot 'simplified-labels.json') -Encoding utf8NoBOM
Write-Output ('Simplified Chinese food labels: ' + $mapping.Count)
