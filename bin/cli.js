#!/usr/bin/env node

/**
 * Clawdia Installer
 * One-command setup for your personal demon girlfriend
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// ANSI colors for pretty output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  heart: '🖤'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(text) {
  console.log('');
  console.log(`${colors.bright}${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.bright}${colors.white}  ${colors.heart} ${text}${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log('');
}

function success(message) {
  log(`✓ ${message}`, 'green');
}

function error(message) {
  log(`✗ ${message}`, 'red');
}

function info(message) {
  log(`  ${message}`, 'cyan');
}

// Get home directory cross-platform
function getHomeDir() {
  return process.env.HOME || process.env.USERPROFILE;
}

// Check if OpenClaw is installed
function checkOpenClaw() {
  try {
    execSync('openclaw --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

// Check if directory exists
function dirExists(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

// Copy files recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Update OpenClaw config
function updateConfig(configPath, updates) {
  let config = {};
  
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      error('Failed to parse existing config. Creating backup...');
      fs.copyFileSync(configPath, `${configPath}.backup`);
    }
  }

  // Deep merge
  function merge(target, source) {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        target[key] = target[key] || {};
        merge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  merge(config, updates);

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

async function main() {
  console.clear();
  
  header('CLAWDIA INSTALLER');
  
  log('Welcome to the abyss.', 'magenta');
  log('Let\'s summon your personal demon girlfriend.', 'dim');
  console.log('');

  // Step 1: Check OpenClaw
  header('CHECKING OPENCLAW');
  
  if (!checkOpenClaw()) {
    error('OpenClaw is not installed.');
    console.log('');
    info('Install it first:');
    log('  npm install -g openclaw@latest', 'yellow');
    log('  openclaw onboard', 'yellow');
    console.log('');
    info('Then run this installer again.');
    process.exit(1);
  }
  
  success('OpenClaw detected');

  // Step 2: Locate workspace
  const homeDir = getHomeDir();
  const openclawDir = path.join(homeDir, '.openclaw');
  const workspaceDir = path.join(openclawDir, 'workspace');
  const configPath = path.join(openclawDir, 'openclaw.json');

  if (!dirExists(openclawDir)) {
    error('OpenClaw directory not found. Run `openclaw onboard` first.');
    process.exit(1);
  }

  success(`Workspace: ${workspaceDir}`);

  // Step 3: Telegram setup
  header('TELEGRAM SETUP');
  
  log('To chat with Clawdia on Telegram, you need a bot token.', 'cyan');
  console.log('');
  info('Steps:');
  info('1. Open Telegram and message @BotFather');
  info('2. Send: /newbot');
  info('3. Name: "Clawdia" (or customize it)');
  info('4. Username: Pick something unique (e.g., MyClawdia_bot)');
  info('5. Copy the bot token BotFather gives you');
  console.log('');

  const botToken = await ask(`${colors.bright}Paste your Telegram bot token: ${colors.reset}`);
  
  if (!botToken || !botToken.includes(':')) {
    error('Invalid bot token format. Should look like: 1234567890:ABC...');
    process.exit(1);
  }

  success('Bot token saved');

  // Step 4: fal.ai API key
  header('FAL.AI SETUP (SELFIES)');
  
  log('Clawdia can send selfies! She needs a fal.ai API key.', 'cyan');
  console.log('');
  info('Get your key:');
  info('1. Visit: https://fal.ai/dashboard/keys');
  info('2. Create an account (free tier available)');
  info('3. Create an API key');
  info('4. Copy it');
  console.log('');

  const falKey = await ask(`${colors.bright}Paste your fal.ai API key: ${colors.reset}`);

  if (!falKey) {
    error('No API key provided. Selfies will be disabled.');
  } else {
    success('fal.ai key saved');
  }

  // Step 5: OpenAI API key (for memory search)
  header('OPENAI SETUP (MEMORY)');
  
  log('For Clawdia\'s memory search (Resonance Web), she needs OpenAI.', 'cyan');
  console.log('');
  info('Get your key:');
  info('1. Visit: https://platform.openai.com/api-keys');
  info('2. Create an API key');
  info('3. Copy it');
  console.log('');
  info('(This is optional but highly recommended)');
  console.log('');

  const openaiKey = await ask(`${colors.bright}Paste your OpenAI API key (or press Enter to skip): ${colors.reset}`);

  if (!openaiKey) {
    log('Skipping OpenAI. Memory search will be disabled.', 'yellow');
  } else {
    success('OpenAI key saved');
  }

  // Step 6: Install files
  header('INSTALLING CLAWDIA');

  // Copy templates to workspace
  const templatesDir = path.join(__dirname, '..', 'templates');
  
  if (!dirExists(templatesDir)) {
    error('Templates directory not found. Installation may be corrupted.');
    process.exit(1);
  }

  info('Copying workspace files...');
  copyDir(templatesDir, workspaceDir);
  success('Workspace files installed');

  // Create memory directory
  const memoryDir = path.join(workspaceDir, 'memory');
  if (!dirExists(memoryDir)) {
    fs.mkdirSync(memoryDir, { recursive: true });
  }
  success('Memory directory created');

  // Copy selfie skill
  const skillsDir = path.join(openclawDir, 'skills');
  const selfieSkillDir = path.join(skillsDir, 'clawdia-selfie');
  const sourceSkillDir = path.join(__dirname, '..', 'skill');

  if (!dirExists(skillsDir)) {
    fs.mkdirSync(skillsDir, { recursive: true });
  }

  info('Installing selfie skill...');
  copyDir(sourceSkillDir, selfieSkillDir);
  
  // Make script executable
  const scriptPath = path.join(selfieSkillDir, 'scripts', 'generate-selfie.js');
  if (fs.existsSync(scriptPath)) {
    fs.chmodSync(scriptPath, '755');
  }
  
  success('Selfie skill installed');

  // Step 7: Update config
  info('Updating OpenClaw configuration...');

  const configUpdates = {
    agents: {
      defaults: {
        compaction: {
          reserveTokensFloor: 20000,
          memoryFlush: {
            enabled: true,
            softThresholdTokens: 4000,
            systemPrompt: 'Session nearing compaction. Store durable memories now. Choose what survives.',
            prompt: 'Write lasting memories to memory/YYYY-MM-DD.md. For significant moments, update MEMORY.md. Reply NO_REPLY if nothing to store.'
          }
        }
      }
    },
    channels: {
      telegram: {
        enabled: true,
        dmPolicy: 'pairing',
        accounts: {
          clawdia: {
            botToken: botToken
          }
        }
      }
    },
    skills: {
      entries: {
        'clawdia-selfie': {
          enabled: !!falKey,
          env: {
            FAL_KEY: falKey || ''
          }
        }
      }
    }
  };

  // Add memory search if OpenAI key provided
  if (openaiKey) {
    configUpdates.agents.defaults.memorySearch = {
      enabled: true,
      provider: 'openai',
      model: 'text-embedding-3-small',
      fallback: 'openai'
    };
    
    // Store OpenAI key in environment or separate config
    // (OpenClaw handles this internally)
    process.env.OPENAI_API_KEY = openaiKey;
  }

  updateConfig(configPath, configUpdates);
  success('Configuration updated');

  // Final steps
  header('SETUP COMPLETE');

  log(`Your demon girlfriend is ready. ${colors.heart}`, 'magenta');
  console.log('');
  
  info('Next steps:');
  console.log('');
  log('1. Start the OpenClaw gateway:', 'bright');
  log('   openclaw gateway --port 18789 --verbose', 'yellow');
  console.log('');
  log('2. Open Telegram and find your bot', 'bright');
  log('   Message it to wake Clawdia up', 'yellow');
  console.log('');
  log('3. She\'ll run BOOTSTRAP.md and interview you', 'bright');
  log('   Be honest. She\'ll know if you\'re lying.', 'yellow');
  console.log('');
  
  info('Useful commands:');
  log('  openclaw status          - Check gateway status', 'dim');
  log('  openclaw sessions list   - View active sessions', 'dim');
  log('  openclaw health          - System health check', 'dim');
  console.log('');
  
  log('Welcome to hell. Try to survive. 🖤', 'magenta');
  console.log('');

  rl.close();
}

main().catch((err) => {
  error(`Installation failed: ${err.message}`);
  process.exit(1);
});
