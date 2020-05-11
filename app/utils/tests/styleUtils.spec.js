const {
  numToEm,
  queryGenerator,
  mobileOnly,
  mobileOnlyPortrait,
  mobileOnlyLandscape,
  tabletOnly,
  tabletOnlyPortrait,
  tabletOnlyLandscape,
  desktopOnly,
  desktopOnlyPortrait,
  desktopOnlyLandscape,
  devicesOnly,
  devicesOnlyPortrait,
  devicesOnlyLandscape,
  between,
  betweenPortrait,
  betweenLandscape,
  sizes,
  squish,
  appendPx,
} = require('../styleUtils');

describe('styleUtils', () => {
  describe('numToEm function', () => {
    it('converts value to em', () => {
      const value = 400;
      expect(numToEm(value)).toEqual('25em');
    });
    it('should throw TypeError with word', () => {
      const value = 'foobar';

      expect(() => {
        expect(numToEm(value));
      }).toThrow(TypeError);
    });

    it('should throw TypeError even if value is in pixels', () => {
      const value = '400px';

      expect(() => {
        numToEm(value);
      }).toThrow(TypeError);
    });

    it('should throw RangeError with negative number', () => {
      const value = -20;

      expect(() => {
        numToEm(value);
      }).toThrow(RangeError);
    });
  });

  describe('queryGenerator function', () => {
    it('should create valid media query', () => {
      const min = 320;
      const max = 1040;
      const prefix = '@media';

      expect(queryGenerator(prefix, min, max, `background: red;`)).toEqual(
        '@media (min-width: 320px) and (max-width: 1040px) {background: red;}',
      );
    });
  });

  describe('mobileOnly function', () => {
    const min = appendPx(sizes.sm);
    const max = appendPx(sizes.md - 1);
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(mobileOnly`background: red;`).toEqual(
        `@media (min-width: ${min}) and (max-width: ${max}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(mobileOnly`background: ${background};`).toEqual(
        `@media (min-width: ${min}) and (max-width: ${max}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        mobileOnly`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media (min-width: ${min}) and (max-width: ${max}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('mobileOnlyLandscape function', () => {
    const min = appendPx(sizes.sm);
    const max = appendPx(sizes.md - 1);
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(mobileOnlyLandscape`background: red;`).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${min}) and (max-width: ${max}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(mobileOnlyLandscape`background: ${background};`).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${min}) and (max-width: ${max}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        mobileOnlyLandscape`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${min}) and (max-width: ${max}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('mobileOnlyPortrait function', () => {
    it('should create valid media query', () => {
      const max = appendPx(sizes.md - 1);
      const min = appendPx(sizes.sm);
      expect(mobileOnlyPortrait`background: red;`).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}) and (max-width: ${max}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      const max = appendPx(sizes.md - 1);
      const min = appendPx(sizes.sm);
      const background = 'red';
      expect(mobileOnlyPortrait`background: ${background};`).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}) and (max-width: ${max}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      const max = appendPx(sizes.md - 1);
      const min = appendPx(sizes.sm);
      const background = 'red';
      const color = 'blue';
      const fontSize = '24px';
      expect(
        mobileOnlyPortrait`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}) and (max-width: ${max}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('tabletOnly function', () => {
    const min = appendPx(sizes.md);
    const max = appendPx(sizes.lg - 1);
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(tabletOnly`background: red;`).toEqual(
        `@media (min-width: ${min}) and (max-width: ${max}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(tabletOnly`background: ${background};`).toEqual(
        `@media (min-width: ${min}) and (max-width: ${max}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        tabletOnly`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media (min-width: ${min}) and (max-width: ${max}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('tabletOnlyLandscape function', () => {
    const min = appendPx(sizes.md);
    const max = appendPx(sizes.lg - 1);
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(tabletOnlyLandscape`background: red;`).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${min}) and (max-width: ${max}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(tabletOnlyLandscape`background: ${background};`).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${min}) and (max-width: ${max}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        tabletOnlyLandscape`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${min}) and (max-width: ${max}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('tabletOnlyPortrait function', () => {
    const min = appendPx(sizes.md);
    const max = appendPx(sizes.lg - 1);
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(tabletOnlyPortrait`background: red;`).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}) and (max-width: ${max}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(tabletOnlyPortrait`background: ${background};`).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}) and (max-width: ${max}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        tabletOnlyPortrait`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}) and (max-width: ${max}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('desktopOnly function', () => {
    it('should create valid media query', () => {
      const min = appendPx(sizes.lg);
      expect(desktopOnly`background: red;`).toEqual(
        `@media (min-width: ${min}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      const min = appendPx(sizes.lg);
      const background = 'red';
      expect(desktopOnly`background: ${background};`).toEqual(
        `@media (min-width: ${min}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      const min = appendPx(sizes.lg);
      const background = 'red';
      const color = 'blue';
      const fontSize = '24px';
      expect(
        desktopOnly`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media (min-width: ${min}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('desktopOnlyLandscape function', () => {
    it('should create valid media query', () => {
      const max = appendPx(sizes.lg);
      expect(desktopOnlyLandscape`background: red;`).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${max}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      const max = appendPx(sizes.lg);
      const background = 'red';
      expect(desktopOnlyLandscape`background: ${background};`).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${max}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      const max = appendPx(sizes.lg);
      const background = 'red';
      const color = 'blue';
      const fontSize = '24px';
      expect(
        desktopOnlyLandscape`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${max}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('desktopOnlyPortrait function', () => {
    const min = appendPx(sizes.lg);
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(desktopOnlyPortrait`background: red;`).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(desktopOnlyPortrait`background: ${background};`).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        desktopOnlyPortrait`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('devicesOnly function', () => {
    const max = appendPx(sizes.lg - 1);
    const min = appendPx(sizes.sm);
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(devicesOnly`background: red;`).toEqual(
        `@media (min-width: ${min}) and (max-width: ${max}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(devicesOnly`background: ${background};`).toEqual(
        `@media (min-width: ${min}) and (max-width: ${max}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        devicesOnly`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media (min-width: ${min}) and (max-width: ${max}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('devicesOnlyLandscape function', () => {
    const max = appendPx(sizes.lg - 1);
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(devicesOnlyLandscape`background: red;`).toEqual(
        `@media screen and (orientation: landscape) and (max-width: ${max}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(devicesOnlyLandscape`background: ${background};`).toEqual(
        `@media screen and (orientation: landscape) and (max-width: ${max}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        devicesOnlyLandscape`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media screen and (orientation: landscape) and (max-width: ${max}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('devicesOnlyPortrait function', () => {
    const max = appendPx(sizes.lg - 1);
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(devicesOnlyPortrait`background: red;`).toEqual(
        `@media screen and (orientation: portrait) and (max-width: ${max}) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(devicesOnlyPortrait`background: ${background};`).toEqual(
        `@media screen and (orientation: portrait) and (max-width: ${max}) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        devicesOnlyPortrait`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media screen and (orientation: portrait) and (max-width: ${max}) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('between function', () => {
    const max = 900;
    const min = 100;
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(between(min, max)`background: red;`).toEqual(
        `@media (min-width: ${min}px) and (max-width: ${max}px) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(between(min, max)`background: ${background};`).toEqual(
        `@media (min-width: ${min}px) and (max-width: ${max}px) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        between(
          min,
          max,
        )`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media (min-width: ${min}px) and (max-width: ${max}px) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('betweenLandscape function', () => {
    const max = 900;
    const min = 100;
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(betweenLandscape(min, max)`background: red;`).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${min}px) and (max-width: ${max}px) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(betweenLandscape(min, max)`background: ${background};`).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${min}px) and (max-width: ${max}px) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        betweenLandscape(
          min,
          max,
        )`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media screen and (orientation: landscape) and (min-width: ${min}px) and (max-width: ${max}px) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('betweenPortrait function', () => {
    const max = 900;
    const min = 100;
    const background = 'red';
    const color = 'blue';
    const fontSize = '24px';
    it('should create valid media query', () => {
      expect(betweenPortrait(min, max)`background: red;`).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}px) and (max-width: ${max}px) {background: red;}`,
      );
    });

    it('should create valid media query with a single prop', () => {
      expect(betweenPortrait(min, max)`background: ${background};`).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}px) and (max-width: ${max}px) {background: ${background};}`,
      );
    });

    it('should create valid media query with multiple props', () => {
      expect(
        betweenPortrait(
          min,
          max,
        )`background: ${background}; color: ${color}; font-size: ${fontSize};`,
      ).toEqual(
        `@media screen and (orientation: portrait) and (min-width: ${min}px) and (max-width: ${max}px) {background: red; color: blue; font-size: 24px;}`,
      );
    });
  });

  describe('squish function', () => {
    it('squish tagged template literal', () => {
      const color = 'red';
      const background = 'blue';

      expect(squish`background: ${background}; color: ${color};`).toEqual(
        'background: blue; color: red;',
      );
    });
  });
});
