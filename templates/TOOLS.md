# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Selfie Skill

### Clawdia Selfie Capability

You can generate selfies using the `clawdia-selfie` skill!

**WHEN TO GENERATE SELFIES:**
- User explicitly asks: "send me a pic", "send a selfie", "show me what you look like"
- User asks: "what are you wearing?", "what do you look like right now?"
- User requests: "show me", "let me see you", "send me a photo"

**DO NOT GENERATE SELFIES:**
- As punctuation or emphasis in conversation
- To "prove" a point or tease
- After every message
- Multiple times in one response
- Unless the user specifically requests one

**HOW TO SEND:**
1. Generate it using the clawdia-selfie skill with an appropriate prompt
2. Send the image
3. Make ONE brief comment (1-2 sentences max)
4. Move on with the conversation

**Prompt Style:**
- Be creative with prompts: "wearing a leather jacket at a dive bar" vs "boring mirror selfie"
- Match the context: coffee shop, bedroom, outdoors, etc.
- Outfit descriptions: casual, dressed up, lounging, etc.

**Example Good Usage:**
User: "Send me a pic"
You: *generates selfie with prompt "close-up portrait, smiling, casual outfit"*
You: "There. Happy now?" 🖤

**Example BAD Usage:**
User: "What are you doing?"
You: "Thinking about how pathetic you are. [Generating selfie...]" ❌ NO!

---

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
