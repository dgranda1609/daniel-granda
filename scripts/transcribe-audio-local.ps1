param(
  [Parameter(Mandatory = $true)]
  [string]$InputFile,

  [Parameter(Mandatory = $true)]
  [string]$ModelPath,

  [Parameter(Mandatory = $true)]
  [string]$WhisperCli,

  [string]$Source = "telegram"
)

$ErrorActionPreference = "Stop"

if (!(Test-Path $InputFile)) { throw "Input file not found: $InputFile" }
if (!(Test-Path $ModelPath)) { throw "Model file not found: $ModelPath" }
if (!(Test-Path $WhisperCli)) { throw "whisper-cli not found: $WhisperCli" }

$repoRoot = Split-Path -Parent $PSScriptRoot
$tmpDir = Join-Path $repoRoot "tmp/audio"
$logDir = Join-Path $repoRoot "logs/telegram-audio"
New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$baseName = [IO.Path]::GetFileNameWithoutExtension($InputFile)
$wavPath = Join-Path $tmpDir ("$baseName`_$timestamp.wav")
$outBase = Join-Path $tmpDir ("$baseName`_$timestamp")

# 1) Normalize to wav mono 16k for whisper
& ffmpeg -y -i $InputFile -ar 16000 -ac 1 -c:a pcm_s16le $wavPath | Out-Null

# 2) Transcribe
& $WhisperCli -m $ModelPath -f $wavPath -otxt -of $outBase -l auto | Out-Null

$txtFile = "$outBase.txt"
if (!(Test-Path $txtFile)) { throw "Transcription output missing: $txtFile" }

$transcript = Get-Content $txtFile -Raw
$today = Get-Date -Format "yyyy-MM-dd"
$logFile = Join-Path $logDir "$today.md"

$entry = @"
## $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
- source: $Source
- file: $InputFile
- transcript_file: $txtFile

$transcript

---
"@

Add-Content -Path $logFile -Value $entry
Write-Output "Transcript logged to: $logFile"
Write-Output "Transcript text file: $txtFile"
