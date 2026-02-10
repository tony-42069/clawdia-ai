#!/usr/bin/env node

/**
 * Clawdia Selfie Generator
 * Generates selfies using xAI Grok Imagine via fal.ai
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const FAL_KEY = process.env.FAL_KEY;
const REFERENCE_IMAGE = 'https://cdn.jsdelivr.net/gh/tony-42069/clawdia-public@main/assets/clawdia.png';

// Validate environment
if (!FAL_KEY) {
  console.error('ERROR: FAL_KEY environment variable not set');
  process.exit(1);
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    prompt: '',
    mode: 'direct', // 'mirror' or 'direct'
    output: null
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--prompt' && args[i + 1]) {
      result.prompt = args[i + 1];
      i++;
    } else if (args[i] === '--mode' && args[i + 1]) {
      result.mode = args[i + 1];
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      result.output = args[i + 1];
      i++;
    }
  }

  return result;
}

/**
 * Make API request to fal.ai
 */
function generateSelfie(prompt, mode) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: 'xai/grok-imagine',
      prompt: `${prompt}, portrait photography, high quality, realistic`,
      reference_image: REFERENCE_IMAGE,
      mode: mode,
      num_images: 1
    });

    const options = {
      hostname: 'fal.run',
      port: 443,
      path: '/fal-ai/flux-lora',
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(data);
            resolve(response);
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(new Error(`API request failed with status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(new Error(`Request failed: ${e.message}`));
    });

    req.write(payload);
    req.end();
  });
}

/**
 * Download image from URL
 */
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

/**
 * Main execution
 */
async function main() {
  const args = parseArgs();

  if (!args.prompt) {
    console.error('ERROR: --prompt is required');
    console.error('Usage: generate-selfie.js --prompt "description" [--mode mirror|direct] [--output path]');
    process.exit(1);
  }

  console.log('Generating selfie...');
  console.log(`Prompt: ${args.prompt}`);
  console.log(`Mode: ${args.mode}`);

  try {
    // Generate the selfie
    const result = await generateSelfie(args.prompt, args.mode);

    if (!result.images || result.images.length === 0) {
      throw new Error('No images generated');
    }

    const imageUrl = result.images[0].url;
    console.log(`Image generated: ${imageUrl}`);

    // Download the image if output path specified
    if (args.output) {
      const outputPath = path.resolve(args.output);
      await downloadImage(imageUrl, outputPath);
      console.log(`Saved to: ${outputPath}`);
      console.log(outputPath); // Output path for OpenClaw to use
    } else {
      // Just output the URL
      console.log(imageUrl);
    }

    process.exit(0);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

main();
