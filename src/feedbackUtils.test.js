/**
 * Tests for feedbackUtils.js
 * Uses Node.js built-in test runner — no npm install required.
 * Run with:  node --test src/feedbackUtils.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getNextState, getFeedbackMessage, getAriaLabel } from './feedbackUtils.js';

// ---------------------------------------------------------------------------
// getNextState
// ---------------------------------------------------------------------------
describe('getNextState', () => {
  test('idle → clicking up   → up', () => {
    assert.equal(getNextState('idle', 'up'), 'up');
  });

  test('idle → clicking down → down', () => {
    assert.equal(getNextState('idle', 'down'), 'down');
  });

  test('up → clicking up again → idle (deselect)', () => {
    assert.equal(getNextState('up', 'up'), 'idle');
  });

  test('down → clicking down again → idle (deselect)', () => {
    assert.equal(getNextState('down', 'down'), 'idle');
  });

  test('up → clicking down → down (switch sides)', () => {
    assert.equal(getNextState('up', 'down'), 'down');
  });

  test('down → clicking up → up (switch sides)', () => {
    assert.equal(getNextState('down', 'up'), 'up');
  });
});

// ---------------------------------------------------------------------------
// getFeedbackMessage
// ---------------------------------------------------------------------------
describe('getFeedbackMessage', () => {
  test('idle state returns empty string', () => {
    assert.equal(getFeedbackMessage('idle'), '');
  });

  test('up state returns positive message', () => {
    const msg = getFeedbackMessage('up');
    assert.ok(msg.length > 0, 'message should not be empty');
    assert.match(msg, /thanks/i);
  });

  test('down state returns improvement message', () => {
    const msg = getFeedbackMessage('down');
    assert.ok(msg.length > 0, 'message should not be empty');
    assert.match(msg, /thanks/i);
  });

  test('up and down messages are different', () => {
    assert.notEqual(getFeedbackMessage('up'), getFeedbackMessage('down'));
  });
});

// ---------------------------------------------------------------------------
// getAriaLabel
// ---------------------------------------------------------------------------
describe('getAriaLabel', () => {
  test('up button, not selected', () => {
    const label = getAriaLabel('up', 'idle');
    assert.match(label, /thumbs up/i);
    assert.ok(!label.includes('selected'), 'should not say selected when idle');
  });

  test('up button, selected', () => {
    const label = getAriaLabel('up', 'up');
    assert.match(label, /thumbs up/i);
    assert.match(label, /selected/i);
  });

  test('down button, not selected', () => {
    const label = getAriaLabel('down', 'idle');
    assert.match(label, /thumbs down/i);
    assert.ok(!label.includes('selected'));
  });

  test('down button, selected', () => {
    const label = getAriaLabel('down', 'down');
    assert.match(label, /thumbs down/i);
    assert.match(label, /selected/i);
  });

  test('up button not marked selected when down is active', () => {
    const label = getAriaLabel('up', 'down');
    assert.ok(!label.includes('selected'));
  });

  test('down button not marked selected when up is active', () => {
    const label = getAriaLabel('down', 'up');
    assert.ok(!label.includes('selected'));
  });
});
