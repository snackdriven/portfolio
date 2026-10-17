/**
 * @jest-environment jsdom
 */

describe('Scrollbar visual behavior', () => {
  beforeEach(() => {
    // Reset the DOM
    document.documentElement.className = '';

    // Use fake timers
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('adds the "scrolling" class to html on scroll and removes it after 700ms idle', () => {
    // Load the file (since it's an IIFE, it will attach the event listener)
    jest.isolateModules(() => {
      require('./site.js');
    });

    const root = document.documentElement;

    // Initially, there should be no scrolling class
    expect(root.classList.contains('scrolling')).toBe(false);

    // Trigger a scroll event
    window.dispatchEvent(new Event('scroll'));

    // The 'scrolling' class should be added immediately
    expect(root.classList.contains('scrolling')).toBe(true);

    // Fast-forward time by 500ms
    jest.advanceTimersByTime(500);

    // The 'scrolling' class should still be there
    expect(root.classList.contains('scrolling')).toBe(true);

    // Fast-forward another 200ms (total 700ms)
    jest.advanceTimersByTime(200);

    // The 'scrolling' class should be removed
    expect(root.classList.contains('scrolling')).toBe(false);
  });

  it('resets the timeout if another scroll event occurs before 700ms', () => {
    // Load the file
    jest.isolateModules(() => {
      require('./site.js');
    });

    const root = document.documentElement;

    // Trigger a scroll event
    window.dispatchEvent(new Event('scroll'));

    // Fast-forward time by 500ms
    jest.advanceTimersByTime(500);

    // The 'scrolling' class should still be there
    expect(root.classList.contains('scrolling')).toBe(true);

    // Trigger another scroll event
    window.dispatchEvent(new Event('scroll'));

    // Fast-forward another 500ms
    jest.advanceTimersByTime(500);

    // The 'scrolling' class should still be there, because the second scroll event reset the timer
    expect(root.classList.contains('scrolling')).toBe(true);

    // Fast-forward another 200ms (total 700ms from the second scroll)
    jest.advanceTimersByTime(200);

    // The 'scrolling' class should be removed
    expect(root.classList.contains('scrolling')).toBe(false);
  });
});
