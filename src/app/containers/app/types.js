// @flow

import * as RouterTypes from 'react-router';
import * as CardTypes   from '../../config/models/types';


export type Props = {
  // react-router 4:
  match: RouterTypes.Match,
  location: RouterTypes.Location,
  history: RouterTypes.RouterHistory,

  // views:
  currentView: string
};

export type State = {
  nav: Array<CardTypes.Card>,
  drawer: Array<CardTypes.Card>,
  selectedSidemenu: Array<string>,
  collapsed: boolean
};
