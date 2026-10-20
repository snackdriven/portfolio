/**
 * @jest-environment jsdom
 */

describe('Repo shortcut easter egg', () => {
  let openSpy;

  beforeEach(() => {
    // Reset the DOM
    document.body.innerHTML = '';

    // Mock window.open
    openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    // Load the script
    jest.isolateModules(() => {
      require('./repo-shortcut.js');
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const dispatchKeydown = (options = {}) => {
    const event = new KeyboardEvent('keydown', {
      key: '?',
      altKey: true,
      bubbles: true,
      cancelable: true,
      ...options
    });

    // Handle read-only properties if necessary
    if (options.isComposing) {
      Object.defineProperty(event, 'isComposing', { value: true });
    }

    // Set target if provided
    if (options.target) {
      options.target.dispatchEvent(event);
    } else {
      document.dispatchEvent(event);
    }
    return event;
  };

  it('opens github repo when Alt+? is pressed', () => {
    const event = dispatchKeydown();
    expect(event.defaultPrevented).toBe(true);
    expect(openSpy).toHaveBeenCalledWith('https://github.com/snackdriven/portfolio', '_blank', 'noopener,noreferrer');
  });

  it('ignores event when repeat is true', () => {
    dispatchKeydown({ repeat: true });
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('ignores event when isComposing is true', () => {
    dispatchKeydown({ isComposing: true });
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('ignores event when defaultPrevented is true', () => {
    const event = new KeyboardEvent('keydown', {
      key: '?',
      altKey: true,
      bubbles: true,
      cancelable: true
    });
    event.preventDefault();
    document.dispatchEvent(event);
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('ignores event when ctrlKey is true', () => {
    dispatchKeydown({ ctrlKey: true });
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('ignores event when metaKey is true', () => {
    dispatchKeydown({ metaKey: true });
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('ignores event when key is not "?"', () => {
    dispatchKeydown({ key: 'a' });
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('ignores event when altKey is false', () => {
    dispatchKeydown({ altKey: false });
    expect(openSpy).not.toHaveBeenCalled();
  });

  describe('ignored elements', () => {
    const tags = ['input', 'textarea', 'select'];

    tags.forEach(tag => {
      it(`ignores event when target is an ${tag}`, () => {
        const el = document.createElement(tag);
        document.body.appendChild(el);
        dispatchKeydown({ target: el });
        expect(openSpy).not.toHaveBeenCalled();
      });

      it(`ignores event when target is a child of an ${tag}`, () => {
        const parent = document.createElement(tag);
        const child = document.createElement('span');
        parent.appendChild(child);
        document.body.appendChild(parent);
        dispatchKeydown({ target: child });
        expect(openSpy).not.toHaveBeenCalled();
      });
    });

    it('ignores event when target is [contenteditable]', () => {
      const el = document.createElement('div');
      el.setAttribute('contenteditable', 'true');
      document.body.appendChild(el);
      dispatchKeydown({ target: el });
      expect(openSpy).not.toHaveBeenCalled();
    });

    it('ignores event when target is a child of [contenteditable]', () => {
      const parent = document.createElement('div');
      parent.setAttribute('contenteditable', '');
      const child = document.createElement('span');
      parent.appendChild(child);
      document.body.appendChild(parent);
      dispatchKeydown({ target: child });
      expect(openSpy).not.toHaveBeenCalled();
    });

    it('does not ignore event when target is [contenteditable="false"]', () => {
      const el = document.createElement('div');
      el.setAttribute('contenteditable', 'false');
      document.body.appendChild(el);
      dispatchKeydown({ target: el });
      expect(openSpy).toHaveBeenCalled();
    });

    it('ignores event when target has isContentEditable true', () => {
      const el = document.createElement('div');
      // Mock isContentEditable property
      Object.defineProperty(el, 'isContentEditable', { value: true });
      document.body.appendChild(el);
      dispatchKeydown({ target: el });
      expect(openSpy).not.toHaveBeenCalled();
    });
  });
});
