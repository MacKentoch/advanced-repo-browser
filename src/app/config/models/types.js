// @flow

/**
 * All repo models have this Type of data
 */

export type Card = {
  name: string,
  url: string,
  imageSrc: string,
  description: string,
  content: Array<string>,
  platform: Array<string>
};
