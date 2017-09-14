// @flow

import * as StartersType from '../../config/models/types';

/**
 * check starter name or description matches value
 *
 * @export
 * @param {StartersType.Card} starter to compare
 * * @param {String} value to compare
 * @returns {boolean} comparison flag
 */
export function doesMatch(
  starter: StartersType.Card,
  value: string = ''
): boolean {
  if (!starter) {
    return false;
  }

  const namesMaches = starter.name.trim().includes(value.trim());
  const descriptionMatches = starter.description.trim().includes(value.trim());

  return namesMaches || descriptionMatches;
}
