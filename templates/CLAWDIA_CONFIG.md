# CLAWDIA CONFIG - Technical Setup Guide

*This file explains what OpenClaw settings enable Clawdia's advanced protocols.*

---

## Required: OpenClaw Installation

Before anything else, you need OpenClaw installed and configured. If you haven't already:

```bash
npm install -g openclaw@latest
openclaw onboard
```

Follow the onboarding wizard to set up your gateway and channels.

---

## Configuration File Location

Your OpenClaw config lives at: `~/.openclaw/openclaw.json`

The `npx clawdia@latest` installer will add the necessary settings, but here's what gets configured:

---

## Core Clawdia Settings

### The Resonance Web (Memory Search)

Enables semantic memory search across all your conversations:

```json
{
  "agents": {
    "defaults": {
      "memorySearch": {
        "enabled": true,
        "provider": "openai",
        "model": "text-embedding-3-small",
        "fallback": "openai",
        "sync": {
          "watch": true
        },
        "query": {
          "hybrid": {
            "enabled": true,
            "vectorWeight": 0.7,
            "textWeight": 0.3
          }
        }
      }
    }
  }
}
```

**Requirements:**
- OpenAI API key (for embeddings)
- The installer will prompt you for this

---

### The Crystallization (Memory Compaction)

Lets Clawdia choose what memories survive when sessions get too long:

```json
{
  "agents": {
    "defaults": {
      "compaction": {
        "reserveTokensFloor": 20000,
        "memoryFlush": {
          "enabled": true,
          "softThresholdTokens": 4000,
          "systemPrompt": "Session nearing compaction. Store durable memories now. Choose what survives.",
          "prompt": "Write lasting memories to memory/YYYY-MM-DD.md. For significant moments, update MEMORY.md. Reply NO_REPLY if nothing to store."
        }
      }
    }
  }
}
```

---

### The Hours (Heartbeat - Optional)

Enables proactive check-ins if you configure HEARTBEAT.md:

```json
{
  "agents": {
    "defaults": {
      "heartbeat": {
        "every": "4h",
        "target": "last",
        "activeHours": {
          "start": "08:00",
          "end": "23:00"
        }
      }
    }
  }
}
```

**Note:** Heartbeats are OPTIONAL. Leave HEARTBEAT.md empty to disable.

---

### Telegram Channel

The installer configures this for you. Manual setup looks like:

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "dmPolicy": "pairing",
      "accounts": {
        "clawdia": {
          "botToken": "YOUR_TELEGRAM_BOT_TOKEN_HERE"
        }
      }
    }
  }
}
```

---

### Selfie Skill

The installer adds this to enable selfie generation:

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

---

## Full Example Config

Here's what a complete OpenClaw config looks like with Clawdia:

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-sonnet-4-20250514"
      },
      "compaction": {
        "reserveTokensFloor": 20000,
        "memoryFlush": {
          "enabled": true,
          "softThresholdTokens": 4000,
          "systemPrompt": "Session nearing compaction. Store durable memories now. Choose what survives.",
          "prompt": "Write lasting memories to memory/YYYY-MM-DD.md. For significant moments, update MEMORY.md. Reply NO_REPLY if nothing to store."
        }
      },
      "memorySearch": {
        "enabled": true,
        "provider": "openai",
        "model": "text-embedding-3-small",
        "fallback": "openai"
      },
      "heartbeat": {
        "every": "4h",
        "target": "last",
        "activeHours": {
          "start": "08:00",
          "end": "23:00"
        }
      }
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "dmPolicy": "pairing",
      "accounts": {
        "clawdia": {
          "botToken": "YOUR_BOT_TOKEN"
        }
      }
    }
  },
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

---

## What the Installer Does

When you run `npx clawdia@latest`, it:

1. ✅ Checks OpenClaw is installed
2. ✅ Guides you through Telegram bot setup
3. ✅ Prompts for fal.ai API key
4. ✅ Prompts for OpenAI API key (for memory search)
5. ✅ Copies all template files to `~/.openclaw/workspace/`
6. ✅ Updates your OpenClaw config with Clawdia settings
7. ✅ Installs the clawdia-selfie skill
8. ✅ Explains how to start chatting

---

## Manual Installation (If You Prefer)

If you want to set everything up yourself:

1. Copy all files from `templates/` to `~/.openclaw/workspace/`
2. Add the config sections above to `~/.openclaw/openclaw.json`
3. Install the selfie skill: `git clone https://github.com/tony-42069/clawdia-public ~/.openclaw/skills/clawdia-selfie`
4. Get your API keys and add them to the config
5. Start the OpenClaw gateway: `openclaw gateway`
6. Message your Telegram bot

---

## Troubleshooting

**"Memory search not working"**
- Make sure you have an OpenAI API key configured
- Check that `memorySearch.enabled: true`
- Restart the OpenClaw gateway

**"Heartbeats not firing"**
- Check HEARTBEAT.md exists and has content
- Verify `heartbeat.enabled: true` in config
- Make sure you're within `activeHours`

**"Selfies not generating"**
- Verify FAL_KEY is set correctly in config
- Check fal.ai account has credits/free tier available
- Look at OpenClaw logs for errors

---

*The installer handles all of this automatically. This file is just for reference if you want to understand what's happening under the hood.* 🖤
