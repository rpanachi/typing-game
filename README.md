# Kids Typing Game

A fun and colorful typing game designed for children, built with Vite and Vue.js.

## Product Requirements

### Core Functionality
- **Main Menu**: Display game title with "New Game" and "How to Play" buttons
- **Game Flow**: Display random images (animals, objects, food, vegetables) with letter placeholders
- **Letter-by-Letter Input**: Players type letters one at a time in sequence
- **Current Letter Highlight**: Visual indicator shows which letter to type next
- **Word Completion**: Show congratulations message with fireworks animation for 5 seconds before next word
- **No Error Punishment**: Wrong letters are ignored, only correct letters are accepted
- **No Word Repetition**: All words shown before repeating (cycle resets when all words used)

### Multi-Language Support
- **Browser Language Detection**: Automatically detect and use browser language preference
- **Language Selection**: Manual language selection from main menu (overrides browser detection)
- **Supported Languages**: English and Portuguese
- **Full Translation**: All UI text (including congratulations, instructions) changes with language
- **Word Mapping**: Words stored as locale map (en/pt) for each entry

### User Experience
- **Kid-Friendly Design**: Colorful, clean, and visually appealing interface
- **Image Display**: 400x400 pixel images with cartoon/drawing style
- **Letter Boxes**: Large, non-wrapping letter boxes displayed horizontally with scroll
- **Congratulations Overlay**: Full-page overlay with lighter background and fireworks animation
- **Instructions Page**: Short, kid-friendly "How to Play" instructions

### Image Management
- **Image Verification**: Three-state verification system ('yes', 'invalid', 'pending')
- **Verification Criteria**: Images verified using AI object detection (confidence >= 70% and matches English word)
- **Invalid Image Handling**: Images marked invalid if confidence < 70%, no matching object found, or 404 error
- **Game Filtering**: Game only uses verified images (verified: 'yes')
- **Image Replacement**: Automated Unsplash API search for invalid images using English word as search term

## Features

- 🎮 Simple and intuitive gameplay
- 🎨 Colorful, kids-friendly design
- 🖼️ Random images of animals, objects, food, and vegetables
- ⌨️ Letter-by-letter typing practice
- 🎉 Celebration animations when words are completed
- 🌍 Multi-language support (English and Portuguese)
- 🔄 No word repetition until all words are shown

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## How to Play

1. Click "New Game" to start playing
2. Look at the image displayed
3. Type the letters one by one to guess the word
4. The current letter to type is highlighted
5. When you complete a word, you'll see a congratulations message with fireworks
6. A new word will appear automatically after 5 seconds

## Local Development

### Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```


## Image Management Scripts

The project includes several scripts in the `scripts/` directory to manage images and their verification status. All scripts support batch processing with the `--batch=N` argument.

### Available Scripts

#### 1. Image Verification (`verify-images.js`)

Verifies images using the [API Ninjas Object Detection API](https://api-ninjas.com/api/objectdetection) to ensure images correctly represent their associated words.

**Setup:**
1. Get an API key from [API Ninjas](https://api-ninjas.com/)
2. Add to your `.env` file:
   ```bash
   NINJAS_API_KEY=your_api_key_here
   ```

**Usage:**
```bash
# Verify all unverified images
npm run images:verify

# Verify only pending images
npm run images:verify:pending

# Verify with debug logs
npm run images:verify -- --debug

# Process first 10 images (batch mode)
npm run images:verify -- --batch=10
```

**Features:**
- Uses AI object detection to verify image content
- Three-state verification: 'yes', 'invalid', 'pending'
- Confidence threshold >= 70% with English word matching
- Uses local images from `public/images/` when available
- Caches results to avoid redundant API calls
- Skips already verified images

**Verification Status:**
- `verified: 'yes'` - Image correctly represents the word (confidence >= 70%)
- `verified: 'invalid'` - Image doesn't match or has low confidence
- `verified: 'pending'` - Needs verification

#### 2. Image Generation (`generate-images.js`)

Generates images for invalid entries using the [HuggingFace Inference API](https://huggingface.co/docs/api-inference/index).

**Setup:**
1. Get an API token from [HuggingFace](https://huggingface.co/settings/tokens)
   - Make sure it has "Make calls to Inference Providers" permission
2. Add to your `.env` file:
   ```bash
   HUGGINGFACE_API_TOKEN=your_token_here
   ```
3. Optionally set a different model:
   ```bash
   HUGGINGFACE_MODEL_ID=stabilityai/stable-diffusion-xl-base-1.0
   ```

**Usage:**
```bash
# Generate images for all invalid entries
npm run images:generate

# Process first 5 entries (batch mode)
npm run images:generate -- --batch=5

# Enable debug logs
npm run images:generate -- --debug
```

**Features:**
- Generates kid-friendly cartoon images using AI
- Saves images to `public/images/` directory
- Updates `gameData.js` with local image paths (`/images/filename.jpg`)
- Sets `verified: 'pending'` for generated images (ready for verification)
- Uses router endpoint: `https://router.huggingface.co/hf-inference/models/{model_id}`
- Default model: `stabilityai/stable-diffusion-xl-base-1.0`

**Note**: After generating images, run `npm run images:verify` to verify them.

#### 3. Image Status Update (`update-images.js`)

Updates verification status based on local file existence in the `public/images/` directory.

**Usage:**
```bash
# Update all entries
npm run images:update

# Process first 20 entries (batch mode)
npm run images:update -- --batch=20
```

**Features:**
- Checks if image files exist in `public/images/` directory
- Sets `verified: 'yes'` if file exists
- Sets `verified: 'pending'` if file doesn't exist
- Only processes local image paths (skips external URLs)
- Only updates status if it has changed
- Shows summary of updates

**Use Cases:**
- After downloading images, update their verification status
- After generating images, mark them as ready for verification
- Quick status check of local image files

### Script Workflow

A typical workflow for managing images:

1. **Generate images** for invalid entries:
   ```bash
   npm run images:generate
   ```

2. **Update status** based on file existence:
   ```bash
   npm run images:update
   ```

3. **Verify generated images**:
   ```bash
   npm run images:verify
   ```

### Batch Processing

All scripts support batch processing to limit the number of entries processed:

```bash
# Process first 10 entries
npm run images:verify -- --batch=10
npm run images:generate -- --batch=10
npm run images:update -- --batch=10
```

This is useful for:
- Testing scripts with a small subset
- Processing large datasets in chunks
- Avoiding API rate limits

## Technology Stack

- **Vite** - Build tool and dev server
- **Vue.js 3** - Frontend framework
- **Vanilla CSS** - Styling with animations
- **Vitest** - Testing framework

