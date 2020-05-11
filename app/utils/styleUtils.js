const { pipe, isNil, curry } = require('ramda');

// define list of breakpoints
const sizes = {
  lg: 1040,
  md: 768,
  sm: 320,
};

/**
 * Converts value to em with a base of 16.
 *
 * @param value {number} Value to be converted.
 *
 * @returns {string} The value converted to em.
 */
const numToEm = value => {
  const base = 16;
  if (typeof value !== 'number')
    throw new TypeError('value must be of type number');

  if (value < 0) throw new RangeError('number must not be negative');

  return `${value / base}em`;
};

/**
 * Converts a number to px value.
 *
 * @param value {number} Value to be converted.
 *
 * @returns {string} The value with 'px' appended to the end.
 */
const appendPx = value => `${value}px`;

/**
 * Generates media query based on given styles, and query params.
 * Null values for min, or max are interpreted as a one-way query.
 * If both min, and max are applied, this is interpreted as a range.
 *
 * @example
 *  // min = 320, max = null => @media (min-width: 320px) ...
 *  // min = null, max = 1040 => @media (max-width: 1040px) ...
 *  // min = 320, max = 1040 => @media (min-width: 320px) and (max-width: 1040px) ...
 *
 * @param prefix {string} Media query prefix.
 * @example
 *  // prefix = '@media'
 *  // prefix = '@media and (orientation: portrait)'
 *
 * @param min {number} min-width value or null.
 * @param max {number} max-width value or null.
 * @param styles {string} Styles created from @link squish.
 *
 * @returns {string} Generated media query.
 */
const queryGenerator = curry((prefix, min, max, styles) => {
  if (isNil(min)) {
    return `${prefix} (max-width: ${appendPx(max)}) {${styles}}`;
  }
  if (isNil(max)) {
    return `${prefix} (min-width: ${appendPx(min)}) {${styles}}`;
  }
  return `${prefix} (min-width: ${appendPx(min)}) and (max-width: ${appendPx(
    max,
  )}) {${styles}}`;
});

/**
 * Used for tagged template literals, combines the list of strings with the list
 * of values.
 *
 * @param strings {Array<string>} List of regular strings from template literal.
 * @param values {Array<any>} List of values from template literal.
 *
 * @returns {string} The combination of the strings, and values into a single string.
 */
const squish = (strings, ...values) =>
  strings.reduce(
    (acc, val, index) =>
      acc + val + (isNil(values[index]) ? '' : values[index]),
    '',
  );

// begin the curry function for query generator with basic media syntax
const media = queryGenerator('@media');

// begin the curry function for query generator with orientation portrait prefix
const portraitMedia = queryGenerator(
  '@media screen and (orientation: portrait) and',
);

// begin the curry function for query generator with orientation landscape prefix
const landscapeMedia = queryGenerator(
  '@media screen and (orientation: landscape) and',
);

/**
 * Takes tagged template literal, pipes calculated string into a media query between
 * mobile, and 1 px below tablet.
 */
const mobileOnly = pipe(squish, media(sizes.sm, sizes.md - 1));

/**
 * Takes tagged template literal, pipes calculated string into a media query between
 * mobile, and 1 px below tablet strictly in portrait mode.
 */
const mobileOnlyPortrait = pipe(squish, portraitMedia(sizes.sm, sizes.md - 1));

/**
 * Takes tagged template literal, pipes calculated string into a media query between
 * mobile, and 1 px below tablet strictly in landscape mode.
 */
const mobileOnlyLandscape = pipe(
  squish,
  landscapeMedia(sizes.sm, sizes.md - 1),
);

/**
 * Takes tagged template literal, pipes calculated string into a media query between
 * tablet, and 1 px below desktop.
 */
const tabletOnly = pipe(squish, media(sizes.md, sizes.lg - 1));

/**
 * Takes tagged template literal, pipes calculated string into a media query between
 * tablet, and 1 px below desktop strictly in portrait mode.
 */
const tabletOnlyPortrait = pipe(squish, portraitMedia(sizes.md, sizes.lg - 1));

/**
 * Takes tagged template literal, pipes calculated string into a media query between
 * tablet, and 1 px below desktop strictly in landscape mode.
 */
const tabletOnlyLandscape = pipe(
  squish,
  landscapeMedia(sizes.md, sizes.lg - 1),
);

/**
 * Takes tagged template literal, pipes calculated string into a media query for
 * desktop or larger.
 */
const desktopOnly = pipe(squish, media(sizes.lg, null));

/**
 * Takes tagged template literal, pipes calculated string into a media query for
 * desktop or larger strictly in portrait mode.
 */
const desktopOnlyPortrait = pipe(squish, portraitMedia(sizes.lg, null));

/**
 * Takes tagged template literal, pipes calculated string into a media query for
 * desktop or larger strictly in landscape mode.
 */
const desktopOnlyLandscape = pipe(squish, landscapeMedia(sizes.lg, null));

/**
 * Takes tagged template literal, pipes calculated string into a media query for
 * 1 px less than desktop.
 */
const devicesOnly = pipe(squish, media(sizes.sm, sizes.lg - 1));

/**
 * Takes tagged template literal, pipes calculated string into a media query for
 * 1 px less than desktop strictly in landscape mode.
 */
const devicesOnlyLandscape = pipe(squish, landscapeMedia(null, sizes.lg - 1));

/**
 * Takes tagged template literal, pipes calculated string into a media query for
 * 1 px less than desktop strictly in portrait mode.
 */
const devicesOnlyPortrait = pipe(squish, portraitMedia(null, sizes.lg - 1));

/**
 * Takes curried min, and max values as params, and tagged template literal, pipes calculated
 * string into a media query between min->max range.
 */
const between = curry((min, max) => pipe(squish, media(min, max)));

/**
 * Takes curried min, and max values as params, and tagged template literal, pipes calculated
 * string into a media query between min->max range strictly in landscape mode.
 */
const betweenLandscape = curry((min, max) =>
  pipe(squish, landscapeMedia(min, max)),
);

/**
 * Takes curried min, and max values as params, and tagged template literal, pipes calculated
 * string into a media query between min->max range strictly in portrait mode.
 */
const betweenPortrait = curry((min, max) =>
  pipe(squish, portraitMedia(min, max)),
);

export {
  numToEm,
  queryGenerator,
  squish,
  sizes,
  appendPx,
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
};
