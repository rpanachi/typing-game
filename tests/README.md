# Test Coverage

This directory contains comprehensive tests for the Kids Typing Game application.

## Test Files

### `App.spec.js`
Tests the main App component and view routing:
- ✅ Renders MainMenu by default
- ✅ Switches to Game view when "New Game" is clicked
- ✅ Switches to HowToPlay view when "How to Play" is clicked
- ✅ Returns to MainMenu from Game view
- ✅ Returns to MainMenu from HowToPlay view

### `MainMenu.spec.js`
Tests the main menu component:
- ✅ Renders game title
- ✅ Renders "New Game" button
- ✅ Renders "How to Play" button
- ✅ Emits `start-game` event when "New Game" is clicked
- ✅ Emits `show-instructions` event when "How to Play" is clicked
- ✅ Has correct CSS classes

### `Game.spec.js`
Tests the game component and all game logic:
- ✅ Renders loading state initially
- ✅ Loads a word on mount
- ✅ Displays the word image
- ✅ Displays placeholders for all letters
- ✅ Reveals a letter when correct key is pressed
- ✅ Reveals all occurrences of a letter when pressed (e.g., 'P' in 'APPLE')
- ✅ Ignores wrong letters (no punishment)
- ✅ Ignores non-letter keys
- ✅ Ignores special keys (Enter, etc.)
- ✅ Does not reveal the same letter twice
- ✅ Shows congratulations when all letters are guessed
- ✅ Starts a new round after congratulations (2 second delay)
- ✅ Ignores key presses when showing congratulations
- ✅ Emits `back-to-menu` event when back button is clicked
- ✅ Handles image error with fallback
- ✅ Displays hint text
- ✅ Handles case-insensitive letter input (uppercase/lowercase)

### `HowToPlay.spec.js`
Tests the instructions component:
- ✅ Renders the instructions title
- ✅ Renders placeholder text
- ✅ Renders back button
- ✅ Emits `back-to-menu` event when back button is clicked
- ✅ Has correct CSS classes

### `gameData.spec.js`
Tests the game data module:
- ✅ Exports gameWords array
- ✅ Each word has required properties (word, image, category)
- ✅ Words are in uppercase
- ✅ `getRandomWord()` returns a word object
- ✅ `getRandomWord()` returns a word from gameWords array
- ✅ `getRandomWord()` can return different words on multiple calls
- ✅ All words have valid categories
- ✅ Words have unique combinations

### `integration.spec.js`
Tests complete user flows:
- ✅ Complete flow: menu → game → guess word → congratulations → new round
- ✅ Complete flow: menu → instructions → back to menu
- ✅ Complete flow: menu → game → back to menu
- ✅ Handles multiple game rounds correctly

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Coverage Summary

The test suite covers:
- **Component Rendering**: All components render correctly
- **User Interactions**: Button clicks, keyboard input
- **Game Logic**: Letter guessing, multiple occurrences, wrong letters
- **State Management**: View switching, game state transitions
- **Edge Cases**: Image errors, case sensitivity, special keys
- **Integration**: Complete user flows from start to finish

## Test Framework

- **Vitest**: Fast unit test framework
- **Vue Test Utils**: Vue component testing utilities
- **jsdom**: DOM environment for testing

