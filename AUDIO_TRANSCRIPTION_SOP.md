# Audio Transcription SOP (Local Whisper) — Telegram Voice Notes

Goal: transcribe Telegram audio locally (no paid API), then log transcript files for content drafting.

## 0) Folder convention

- Incoming audio drop: `inbox/telegram-audio/`
- Output transcripts: `logs/telegram-audio/YYYY-MM-DD.md`
- Temp processing files: `tmp/audio/`

## 1) One-time setup (Windows)

### A. Install whisper.cpp binaries
1. Download latest Windows release from: `https://github.com/ggml-org/whisper.cpp/releases`
2. Extract to: `D:\Tools\whisper.cpp\`
3. Ensure this file exists:
   - `D:\Tools\whisper.cpp\build\bin\Release\whisper-cli.exe`

### B. Download a model (recommended)
- Start with `ggml-base.en.bin` (fast) or `ggml-small.en.bin` (better quality)
- Put model at:
  - `D:\Tools\whisper.cpp\models\ggml-small.en.bin`

### C. ffmpeg
Already installed at `C:\ffmpeg\bin\ffmpeg.exe` in your environment.

## 2) Transcribe one file

From repo root:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/transcribe-audio-local.ps1 `
  -InputFile "inbox/telegram-audio/voice-note.ogg" `
  -ModelPath "D:\Tools\whisper.cpp\models\ggml-small.en.bin" `
  -WhisperCli "D:\Tools\whisper.cpp\build\bin\Release\whisper-cli.exe" `
  -Source "telegram"
```

This will:
1. Convert audio to mono 16k wav
2. Transcribe with whisper.cpp
3. Append transcript entry to `logs/telegram-audio/<today>.md`
4. Save raw text under `tmp/audio/`

## 3) Batch mode (folder)

```powershell
Get-ChildItem "inbox/telegram-audio" -File | ForEach-Object {
  powershell -ExecutionPolicy Bypass -File scripts/transcribe-audio-local.ps1 `
    -InputFile $_.FullName `
    -ModelPath "D:\Tools\whisper.cpp\models\ggml-small.en.bin" `
    -WhisperCli "D:\Tools\whisper.cpp\build\bin\Release\whisper-cli.exe" `
    -Source "telegram"
}
```

## 4) Telegram workflow for now

Until fully automated Telegram ingestion is wired, do this:
1. Save/download voice notes to `inbox/telegram-audio/`
2. Run batch mode command
3. Use transcript log as source for article/case-study drafting

## 5) Quality notes

- If transcript quality is weak, switch model to `ggml-medium.en.bin`
- For Spanish-heavy notes, use multilingual model (non `.en`) like `ggml-small.bin`
- Keep voice notes under 5–7 min for best turnaround
