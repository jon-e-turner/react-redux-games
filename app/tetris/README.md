# Tetris Redux

Initially, this came from <https://makeschool.org/mediabook/oa/tutorials/react-redux-tetris-app-tutorial-o4s/tetris-introduction/>

## In-progress

- Check high scores and update
- Add historical stats

## My Changes

- Hosted as a page within a react-router app
- Migrated to "modern Redux" style
- Added transparent style for un-colored squares
- Changed background color of playing surface
- Simplified message popup
- Arranged controls to a 'wasd' grid
- Added key bindings for movement controls (arrows & wasd)
- Used icons from [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.size=24&icon.color=%23e3e3e3&icon.style=Rounded&icon.query=new) for buttons
- Added counter-clockwise rotation (shift + up_arrow, W)
- Fixed hydration mismatch error due to using a random value in the TetrisNextBlock component
- Added key bindings for pause (space) and new game (escape)
- Added saving game state to localStorage
- Added loading saved state from localStorage
- Added button for counter-clockwise rotation
- Added new slice for game history
- Added view for player's past games
- Added view for high scores
- Moved preview to right side (guideline)
- Implemented standard "35-bag" piece randomizer
- Added statistics for piece frequency for current game

## To-do

- Load game stopped (but not paused)
- Implement level advancement (alg)
  - S-curve based on total lines cleared?
- Adjust speed (alg)
  - Logarithmic based on level?
  - Guidelines are based on G where 1G = 60 rows dropped per second.
  - Max is ~20G
- Score algorithm
  - [I 💚 the internet](https://tetris.wiki/Scoring)
  - Implement Nintendo system with line drop bonus
- Look into implementing the "recommended guidelines"
  - Field should be 10 x 20
  - Have hidden row buffer above playing field
  - Show part of the 21st row
  - Player can hold a single piece for later
  - Piece locking with 15-move reset timer
  - Soft vs hard drop
    - Soft -> ~20 \* level speed, non-locking
    - Hard -> straight to bottom, locking
      - Should provide a score bonus based on rows dropped
- Figure out bug that leads to early game over
  - One or two blank lines at the top of the grid still
- Save high scores
- Update main page button to show if a game is in progress
- Implement UI changes to mimic NES game
- Break up CSS and learn about Tailwind
- Implement themes
- Encapsulate/isolate the Tetris clone
- Implement as an SPA
  - Prefer 800x600 or 1280x960
- I18n
  - Spanish
  - French
  - Chinese (simplified & traditional)
  - Japanese
