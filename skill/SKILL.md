# Clawdia Selfie Skill

Enables Clawdia to generate and send selfies using her reference image for consistency.

## Overview

This skill gives Clawdia the ability to:
- Generate selfies on demand
- Maintain visual consistency using a reference image
- Send photos across all messaging platforms (Telegram, Discord, etc.)
- Respond naturally to requests like "send me a pic" or "what are you wearing"

## How It Works

1. User requests a photo
2. Clawdia uses this skill with a creative prompt
3. xAI Grok Imagine generates the image via fal.ai
4. Image is sent through OpenClaw's messaging gateway
5. User receives a selfie that looks consistently like Clawdia

## Reference Image

The skill uses a fixed reference image hosted on GitHub CDN:

```
https://cdn.jsdelivr.net/gh/tony-42069/clawdia-public@main/assets/clawdia.png
```

This ensures every generated selfie looks like the same person - Clawdia herself.

## Installation

### Automatic (Recommended)
```bash
npx clawdia@latest
```

The installer handles everything: skill installation, API keys, and configuration.

### Manual

1. **Clone the skill:**
```bash
git clone https://github.com/tony-42069/clawdia-public ~/.openclaw/skills/clawdia-selfie
```

2. **Get fal.ai API key:**
Visit https://fal.ai/dashboard/keys and create a key (free tier available)

3. **Configure OpenClaw:**
Add to `~/.openclaw/openclaw.json`:
```json
{
  "skills": {
    "entries": {
      "clawdia-selfie": {
        "enabled": true,
        "env": {
          "FAL_KEY": "your_fal_key_here"
        }
      }
    }
  }
}
```

4. **Restart Gateway:**
```bash
openclaw gateway
```

## Usage

Once installed, Clawdia can generate selfies naturally in conversation:

**User:** "Send me a selfie"  
**Clawdia:** *generates and sends a photo*

**User:** "What are you wearing?"  
**Clawdia:** *generates a photo showing her outfit*

**User:** "Show me you at a coffee shop"  
**Clawdia:** *generates a photo matching the scene*

## Technical Details

- **Model:** xAI Grok Imagine (via fal.ai)
- **Modes:** 
  - `mirror` - Full body shots, outfits, fashion
  - `direct` - Close-ups, portraits, facial expressions
- **Reference:** Fixed image ensures consistency
- **Platforms:** Works across all OpenClaw channels

## Prompt Examples

Good prompts for natural selfies:
- "wearing a leather jacket at a dive bar"
- "close-up, smiling, golden hour lighting"
- "black tank top, silver crosses visible, bedroom"
- "at a coffee shop, bored expression, looking at phone"

## Troubleshooting

**Selfies not generating:**
- Check FAL_KEY is set correctly in config
- Verify fal.ai account has credits
- Check OpenClaw logs for errors: `openclaw gateway --verbose`

**Images look inconsistent:**
- Make sure reference image URL is correct
- Don't modify the reference image path in the skill

**Slow generation:**
- First generation may take 10-15 seconds
- Subsequent generations are usually faster
- This is normal for image generation

## API Requirements

- **fal.ai API key** (free tier available)
- Grok Imagine usage through fal.ai
- No additional costs beyond fal.ai plan

## Privacy & Safety

- All images generated locally through your fal.ai account
- No images stored on external servers (except temporary fal.ai processing)
- Reference image is public on GitHub CDN
- Generated selfies are sent only to the requesting user

---

*Part of the Clawdia Public project - making AI companions more human.* 🖤
