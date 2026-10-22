# VoiceGuard

**AI-powered voice authenticity analysis for detecting synthetic, cloned, and manipulated speech.**

VoiceGuard is a security-focused web prototype designed to help users identify potentially AI-generated voices. The project combines voice authenticity analysis with a clear risk-oriented interface, with the architecture prepared for integration with a real machine-learning inference backend.

> **Project status:** Frontend prototype / hackathon MVP\
> **Current detection:** Demo simulation\
> **Planned detection:** Real pretrained deepfake-voice model + FastAPI backend

## Why VoiceGuard?

AI voice cloning has made it possible to imitate a person's voice convincingly enough to support impersonation and social-engineering attacks.

Traditional caller identification cannot answer a critical question:

**"Is the voice itself genuine?"**

VoiceGuard is designed around that problem. Instead of presenting users with a complicated machine-learning output, it translates voice analysis into a simple risk assessment that can be understood quickly.

## Core Concept

```text
Audio Recording
      │
      ▼
Voice Preprocessing
      │
      ▼
AI Voice Detection Model
      │
      ▼
Authenticity Probability
      │
      ├───────────────┐
      ▼               ▼
Risk Assessment    Explanation
      │               │
      └───────┬───────┘
              ▼
       User-Friendly Result
```

The planned full system will extend this pipeline with:

```text
Voice Detection
      +
Speech-to-Text
      +
Scam/Manipulation Detection
      +
Trusted Speaker Verification
      ↓
Unified Call Risk Score
```

## Features

### Current Prototype

- Dark black and red security-oriented interface
- Responsive viewport-based layout
- Audio file upload
- Drag-and-drop audio input
- Voice analysis result screen
- AI probability and confidence indicators
- Low / Elevated / High Risk classifications
- Analysis history
- Search and risk filtering
- About and privacy information
- Themed internal scrollbar
- Mobile-responsive design

### Planned Features

- Real AI-generated voice detection
- Real-time audio analysis
- Speech-to-text transcription
- Scam conversation detection
- OTP/payment/credential request detection
- Trusted speaker profiles
- Voice-cloning detection
- Multi-signal risk scoring
- Explainable detection results
- Secure analysis history
- FastAPI inference service

## Technology

### Current frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Planned AI/backend stack

- Python
- PyTorch
- Torchaudio
- Librosa
- NumPy
- FastAPI
- Hugging Face
- Speech-to-text model such as Whisper
- ASVspoof-compatible datasets and evaluation methodology

## Project Structure

```text
voiceguard/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
├── backend/
├── models/
└── test_audio/
```

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/voiceguard.git
cd voiceguard
```

The current frontend requires no build system.

Open:

```text
index.html
```

in a browser.

For local development:

```bash
npx http-server
```

## Current Analysis Behaviour

The current frontend contains a **demo analysis simulation** so the complete user experience can be tested before connecting the machine-learning backend.

The simulated pipeline produces:

- Risk level
- AI voice probability
- Model confidence
- Processing time
- Security recommendation

The simulated result can later be replaced by a real model API.

## Planned AI Architecture

VoiceGuard is intended to use existing research and pretrained models rather than training an entire voice-deepfake detector from scratch.

Potential model families include:

- AASIST
- RawNet2
- wav2vec 2.0 based classifiers

The model will be evaluated on genuine and spoofed speech and, importantly, tested against **unseen generators and real-world audio conditions**.

## Future Risk Engine

```text
                 ┌─────────────────────┐
                 │   Incoming Audio    │
                 └──────────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
        Voice Deepfake   Speaker       Speech-to-
          Detection    Verification      Text
              │             │             │
              └─────────────┼─────────────┘
                            ▼
                    Scam Detection
                            │
                            ▼
                     Risk Engine
                            │
                            ▼
                 ┌─────────────────────┐
                 │   FINAL RISK SCORE  │
                 └─────────────────────┘
```

This moves VoiceGuard beyond simple **"real vs fake"** classification toward practical voice-scam protection.

## Example Use Case

A caller claims to be a family member:

> "I need money urgently. Don't call anyone else. Send it now."

VoiceGuard could eventually evaluate:

```text
Voice authenticity       → Suspicious
Speaker similarity        → High
Urgency language          → Detected
Financial request         → Detected
Secrecy/manipulation      → Detected

                ↓

        🔴 HIGH RISK
```

The goal is not to make an irreversible decision for the user, but to provide an early warning and recommend independent verification.

## Limitations

VoiceGuard is a prototype and should **not** be treated as definitive proof that a voice is real or fake.

Detection accuracy can be affected by:

- Background noise
- Low-quality recordings
- Phone compression
- Short audio samples
- Unseen voice-generation systems
- Voice conversion techniques
- New AI synthesis methods

A production system would require extensive testing, calibration, security review, privacy controls, and continuous evaluation.

## Privacy & Security

Voice recordings can contain highly sensitive personal information.

A production implementation should:

- Process audio securely
- Minimize audio retention
- Obtain explicit user consent
- Encrypt data in transit and at rest
- Avoid unnecessary storage of raw recordings
- Provide clear deletion controls
- Protect user and speaker profiles

## Roadmap

### Phase 1 — Frontend Prototype

- [x] VoiceGuard UI
- [x] Audio upload
- [x] Drag and drop
- [x] Risk result interface
- [x] Analysis history
- [x] Responsive layout

### Phase 2 — AI Detection

- [ ] Select and integrate pretrained detector
- [ ] Audio preprocessing pipeline
- [ ] Genuine/spoof evaluation
- [ ] Confidence calibration
- [ ] Unseen-generator testing

### Phase 3 — Backend

- [ ] FastAPI service
- [ ] `/analyze` endpoint
- [ ] Model inference service
- [ ] Error handling
- [ ] Secure file handling

### Phase 4 — Scam Intelligence

- [ ] Speech-to-text
- [ ] Scam-language detection
- [ ] OTP/payment request detection
- [ ] Urgency/manipulation detection
- [ ] Unified risk engine

### Phase 5 — Advanced Protection

- [ ] Trusted speaker profiles
- [ ] Speaker verification
- [ ] Voice-cloning detection
- [ ] Real-time call analysis
- [ ] Explainable alerts

## Hackathon Vision

VoiceGuard is designed to evolve from an **AI voice detector** into an **AI-powered voice security layer**.

The central idea is:

> **Don't just ask whether a voice sounds real. Ask whether the entire interaction should be trusted.**

## Contributing

Contributions, ideas, experiments, and model evaluations are welcome.

Please:

1. Prefer measurable improvements over unsupported accuracy claims.
2. Test against audio conditions not present in training data.
3. Document datasets and evaluation methods.
4. Never upload private voice recordings.
5. Keep security and privacy considerations visible throughout development.

## License

Choose and add an appropriate open-source license before publishing the project for public reuse.

---

**VoiceGuard — Detect the voice. Understand the risk. Protect the user.**
