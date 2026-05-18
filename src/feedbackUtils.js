/**
 * Pure utility functions for the FeedbackButton component.
 * Keeping logic here makes it framework-agnostic and trivially testable.
 */

/** @typedef {'idle' | 'up' | 'down'} FeedbackState */

/**
 * Returns the next feedback state when a button is clicked.
 * Clicking the already-selected button de-selects it (toggles back to idle).
 *
 * @param {FeedbackState} current   - the current state
 * @param {'up' | 'down'} clicked  - which button was pressed
 * @returns {FeedbackState}
 */
export function getNextState(current, clicked) {
  if (current === clicked) return 'idle';   // toggle off
  return clicked;
}

/**
 * Returns a short human-readable message for the current feedback state.
 *
 * @param {FeedbackState} state
 * @returns {string}
 */
export function getFeedbackMessage(state) {
  switch (state) {
    case 'up':   return 'Thanks for the positive feedback!';
    case 'down': return 'Thanks — we\'ll work on improving!';
    default:     return '';
  }
}

/**
 * Returns the aria-label for a thumb button.
 *
 * @param {'up' | 'down'} direction
 * @param {FeedbackState} currentState
 * @returns {string}
 */
export function getAriaLabel(direction, currentState) {
  const selected = currentState === direction;
  const base = direction === 'up' ? 'Thumbs up' : 'Thumbs down';
  return selected ? `${base} (selected)` : base;
}
