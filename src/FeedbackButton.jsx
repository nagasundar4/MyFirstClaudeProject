import { useState } from 'react';
import { getNextState, getFeedbackMessage, getAriaLabel } from './feedbackUtils.js';

/**
 * FeedbackButton
 *
 * A simple thumbs-up / thumbs-down widget.
 * Clicking a selected thumb de-selects it (toggles back to idle).
 *
 * Props:
 *   onFeedback?: (state: 'up' | 'down' | 'idle') => void
 *     Optional callback fired whenever the state changes.
 */
export default function FeedbackButton({ onFeedback }) {
  const [state, setState] = useState('idle');

  function handleClick(direction) {
    const next = getNextState(state, direction);
    setState(next);
    onFeedback?.(next);
  }

  const message = getFeedbackMessage(state);

  return (
    <div className="feedback-widget" role="group" aria-label="Was this helpful?">
      <span className="feedback-label">Was this helpful?</span>

      <button
        type="button"
        className={`feedback-btn feedback-btn--up ${state === 'up' ? 'feedback-btn--selected' : ''}`}
        aria-label={getAriaLabel('up', state)}
        aria-pressed={state === 'up'}
        onClick={() => handleClick('up')}
      >
        👍
      </button>

      <button
        type="button"
        className={`feedback-btn feedback-btn--down ${state === 'down' ? 'feedback-btn--selected' : ''}`}
        aria-label={getAriaLabel('down', state)}
        aria-pressed={state === 'down'}
        onClick={() => handleClick('down')}
      >
        👎
      </button>

      {message && (
        <p className="feedback-message" role="status" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}
