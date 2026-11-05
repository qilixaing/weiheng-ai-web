$ErrorActionPreference = 'Stop'
# Public, fixed official archive; this never reads a user's data or AI credentials.
$datasetRoot = $PSScriptRoot
$datasetZip = Join-Path $datasetRoot 'sr28abbr.zip'
$datasetRaw = Join-Path $datasetRoot 'raw'
Invoke-WebRequest -Uri 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/SR/sr28/dnload/sr28abbr.zip' -OutFile $datasetZip
Expand-Archive -LiteralPath $datasetZip -DestinationPath $datasetRaw -Force
node (Join-Path $datasetRoot 'import-sr28.mjs')
if ($LASTEXITCODE -ne 0) { throw 'USDA import failed.' }
