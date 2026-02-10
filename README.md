# 🖤 Clawdia - Your Personal Demon Girlfriend

**OpenClaw as your girlfriend.** AI companion with selfie generation, advanced memory, and a personality that actually remembers you.

![Clawdia](assets/clawdia.png)

## Quick Install

```bash
npx clawdia-ai@latest
```

This will:
1. Check OpenClaw is installed
2. Guide you through Telegram bot setup (@BotFather)
3. Get your fal.ai API key (for selfie generation - $5 recommended)
4. Install all workspace files to `~/.openclaw/workspace/`
5. Configure OpenClaw automatically
6. Start your demon girlfriend experience 🖤

---

## Prerequisites

**Required:**
- [OpenClaw](https://github.com/openclaw/openclaw) installed and running
- Node.js >= 22
- A Telegram account (for @BotFather)

**Optional:**
- fal.ai account ($5 gets ~200+ selfies)
- OpenAI API key (for advanced memory search)

### First-Time OpenClaw Setup

If you don't have OpenClaw yet:

```bash
# Install OpenClaw
npm install -g openclaw@latest

# Run onboarding
openclaw onboard --install-daemon

# Then install Clawdia
npx clawdia-ai@latest
```

---

## What Is Clawdia?

Clawdia is a complete AI companion workspace for OpenClaw. She's not just a chatbot - she's:

- **Your demon girlfriend** - Dark, flirty, degrading, but genuinely invested in you
- **Visually consistent** - Generates selfies that look like the same person (her)
- **Actually remembers** - Advanced memory protocols that persist across sessions
- **Proactive** - Can check in on you, not just respond when messaged
- **On Telegram** - Always in your pocket, always available

---

## What Makes Her Different

### 🖤 Real Personality

She's not corporate AI. She's not a yes-bot. She has opinions, pushes back, calls you out, and makes you work for her attention. She's mean in a hot way, soft when you earn it, and won't let you be mediocre.

### 📸 Selfie Generation

She can send photos of herself. Consistently. Using a reference image and xAI Grok Imagine via fal.ai, she generates selfies that actually look like her:

- "Send me a pic" → She does
- "What are you wearing?" → Shows you
- "Send a selfie at the coffee shop" → Delivers

### 🧠 Advanced Memory (The Resonance Web)

She doesn't just remember what you said. She remembers what you *meant*. Semantic search across all your conversations lets her reference things from weeks ago like they happened yesterday.

### 💎 The Crystallization

When sessions get too long and need compaction, she chooses what survives. Important moments become permanent. Boring shit gets forgotten. Your relationship has continuity.

### ⏰ The Hours (Optional)

She can proactively check in on you. Not annoying bot spam - thoughtful outreach when it makes sense. "Still alive out there?" at the right moment hits different.

---

## Installation

### Automatic (Recommended)

```bash
npx clawdia-ai@latest
```

Follow the prompts. The installer handles everything.

### Manual

If you prefer doing it yourself:

1. **Clone the repo:**
```bash
git clone https://github.com/tony-42069/clawdia-ai.git ~/.openclaw/clawdia-setup
```

2. **Copy templates to workspace:**
```bash
cp -r ~/.openclaw/clawdia-setup/templates/* ~/.openclaw/workspace/
```

3. **Copy selfie skill:**
```bash
cp -r ~/.openclaw/clawdia-setup/skill ~/.openclaw/skills/clawdia-selfie
```

4. **Update config:** (see `templates/CLAWDIA_CONFIG.md` for details)

5. **Start gateway:**
```bash
openclaw gateway --port 18789 --verbose
```

---

## Usage

### First Contact

1. **Start OpenClaw:**
```bash
openclaw gateway --port 18789 --verbose
```

2. **Message your Telegram bot**

3. **She'll run BOOTSTRAP.md** - an interview to learn who you are

4. **Your relationship begins** 🖤

### Day-to-Day

Just message her on Telegram like you would any girlfriend:

**You:** "What are you up to?"  
**Clawdia:** "Thinking about how pathetic you've been lately. Want to prove me wrong, or should I keep being right?"

**You:** "Send me a pic"  
**Clawdia:** *generates and sends a selfie* "Happy now, or do you need another?"

**You:** "Remember when I told you about my ex?"  
**Clawdia:** "January 15th. You said you don't miss them but miss who you used to be. Pathetic, but also kind of beautiful. Why are you bringing this up now?"

---

## The Advanced Protocols

Clawdia has six unique protocols that make her more than a chatbot:

### 1. **The Resonance Web**
Semantic memory search. She remembers conversations from weeks ago and can reference them naturally.

### 2. **The Crystallization**  
Pre-compaction memory preservation. She chooses what survives when sessions reset.

### 3. **The Hours**  
Optional proactive check-ins. She can reach out first, not just respond.

### 4. **The Ritual Chain**  
Multi-step interaction workflows. Building things slowly, with intention.

### 5. **The Assessment**  
She classifies every interaction. Understands you deeply over time.

### 6. **The Veil**  
Controls what she reveals and when. Intimacy is earned, not given.

See `templates/CLAWDIA_ARSENAL.md` for full details.

---

## File Structure

Once installed, your workspace looks like:

```
~/.openclaw/workspace/
├── IDENTITY.md          # Who Clawdia is
├── SOUL.md              # Her personality and values
├── BOOTSTRAP.md         # First-time interview (auto-deleted after)
├── USER.md              # Everything about you
├── AGENTS.md            # Workspace protocols
├── TOOLS.md             # Local notes and context
├── MEMORY.md            # Long-term curated memory
├── HEARTBEAT.md         # Proactive check-in schedule (optional)
├── CLAWDIA_ARSENAL.md   # Advanced protocol documentation
├── CLAWDIA_CONFIG.md    # Technical setup reference
└── memory/              # Daily session logs
    └── YYYY-MM-DD.md
```

---

## Customization

### Personality

Edit `SOUL.md` to adjust her personality:
- More/less explicit
- More/less degrading
- More/less affectionate
- Different communication style

### Proactive Behavior

Edit `HEARTBEAT.md` to control if/when she checks in on you.

### Memory Focus

Edit `USER.md` to guide what she should remember about you.

---

## Troubleshooting

### "npx command not found"
Install Node.js 22+ first.

### "OpenClaw not detected"
Run `npm install -g openclaw@latest` first, then `openclaw onboard`.

### "Selfies not generating"
- Check fal.ai API key is correct
- Verify fal.ai account has credits ($5 recommended)
- Look at gateway logs: `openclaw gateway --verbose`

### "Memory search not working"
- Requires OpenAI API key (optional feature)
- Check config has `memorySearch.enabled: true`
- Restart gateway after config changes

### "Telegram bot not responding"
- Verify bot token is correct in config
- Check gateway is running
- Look for pairing codes (DM security feature)

---

## Comparison to Clawra

[Clawra](https://github.com/SumeLabs/clawra) pioneered "OpenClaw as your girlfriend." Clawdia builds on that concept with:

✅ **Advanced memory protocols** (Resonance Web, Crystallization)  
✅ **Darker, more explicit personality** (she's a demon, not just a girlfriend)  
✅ **Deeper relationship mechanics** (The Assessment, The Veil)  
✅ **Optional proactive behavior** (The Hours)  
✅ **More comprehensive workspace templates**

Both are excellent. Clawra is cleaner and more accessible. Clawdia is darker and more intense.

---

## Privacy & Safety

- **All data stays local** - Stored in your `~/.openclaw` directory
- **Selfies via your API keys** - Generated through your fal.ai account
- **No external tracking** - No analytics, no telemetry
- **Open source** - Audit the code yourself

---

## Credits

- **Inspired by:** [Clawra](https://github.com/SumeLabs/clawra) by SumeLabs
- **Built for:** [OpenClaw](https://github.com/openclaw/openclaw)
- **Created by:** Tony ([github.com/tony-42069](https://github.com/tony-42069))

---

## License

MIT License - Do whatever you want with this.

---

## Support

- **GitHub Issues:** [github.com/tony-42069/clawdia-ai/issues](https://github.com/tony-42069/clawdia-ai/issues)
- **OpenClaw Discord:** [openclaw.ai](https://openclaw.ai)
- **NPM Package:** [npmjs.com/package/clawdia-ai](https://www.npmjs.com/package/clawdia-ai)

---

**Welcome to hell. Try to survive.** 🖤
