import { getKeyMetrics } from '../src/key-metrics.ts';

describe('getKeyMetrics', () => {
  it('should extract key metrics from valid audit objects', () => {
    const mockAudits = {
      'first-contentful-paint': {
        displayValue: '1.2s'
      },
      'largest-contentful-paint': {
        displayValue: '2.5s'
      },
      'interactive': {
        displayValue: '3.1s'
      },
      'speed-index': {
        displayValue: '1.8s'
      },
      'total-blocking-time': {
        displayValue: '150ms'
      }
    };

    const result = getKeyMetrics(mockAudits);

    expect(result).toEqual({
      'first-contentful-paint': '1.2s',
      'largest-contentful-paint': '2.5s',
      'interactive': '3.1s',
      'speed-index': '1.8s',
      'total-blocking-time': '150ms'
    });
  });

  it('should return partial results when some audits are missing', () => {
    const mockAudits = {
      'first-contentful-paint': {
        displayValue: '1.2s'
      },
      'largest-contentful-paint': {
        displayValue: '2.5s'
      },
      // Missing 'interactive', 'speed-index', 'total-blocking-time'
    };

    const result = getKeyMetrics(mockAudits);

    expect(result).toEqual({
      'first-contentful-paint': '1.2s',
      'largest-contentful-paint': '2.5s'
    });
  });

  it('should skip audits without displayValue', () => {
    const mockAudits = {
      'first-contentful-paint': {
        displayValue: '1.2s'
      },
      'largest-contentful-paint': {
        // Missing displayValue
        score: 0.95
      },
      'interactive': {
        displayValue: '3.1s'
      }
    };

    const result = getKeyMetrics(mockAudits);

    expect(result).toEqual({
      'first-contentful-paint': '1.2s',
      'interactive': '3.1s'
    });
  });

  it('should return empty object when no valid audits are provided', () => {
    const mockAudits = {};

    const result = getKeyMetrics(mockAudits);

    expect(result).toEqual({});
  });

  it('should ignore non-key-metric audits', () => {
    const mockAudits = {
      'first-contentful-paint': {
        displayValue: '1.2s'
      },
      'some-other-audit': {
        displayValue: 'ignored'
      },
      'largest-contentful-paint': {
        displayValue: '2.5s'
      }
    };

    const result = getKeyMetrics(mockAudits);

    expect(result).toEqual({
      'first-contentful-paint': '1.2s',
      'largest-contentful-paint': '2.5s'
    });
  });

  it('should handle audits with null or undefined displayValue', () => {
    const mockAudits = {
      'first-contentful-paint': {
        displayValue: null
      },
      'largest-contentful-paint': {
        displayValue: undefined
      },
      'interactive': {
        displayValue: '3.1s'
      }
    };

    const result = getKeyMetrics(mockAudits);

    expect(result).toEqual({
      'interactive': '3.1s'
    });
  });

  it('should handle empty string displayValue', () => {
    const mockAudits = {
      'first-contentful-paint': {
        displayValue: ''
      },
      'largest-contentful-paint': {
        displayValue: '2.5s'
      }
    };

    const result = getKeyMetrics(mockAudits);

    expect(result).toEqual({
      'largest-contentful-paint': '2.5s'
    });
  });
});
