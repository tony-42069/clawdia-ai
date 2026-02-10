# Clawdia Selfie Skill

This folder contains the selfie generation skill for Clawdia.

## Files

- `SKILL.md` - Full skill documentation
- `scripts/generate-selfie.js` - Image generation script

## Quick Test

```bash
# Set your fal.ai API key
export FAL_KEY="your_key_here"

# Generate a test selfie
node scripts/generate-selfie.js --prompt "smiling, casual outfit" --output /tmp/test.png
```

## Integration

This skill is automatically installed when you run `npx clawdia@latest`.

For manual installation, see `SKILL.md`.
