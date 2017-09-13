// @flow

import moment from 'moment';

const dateFormat = 'DD/MM/YYYY HH:mm';

// /////////////////////
// constants
// /////////////////////
const ENTER_HOME_VIEW       = 'ENTER_HOME_VIEW';
const LEAVE_HOME_VIEW       = 'LEAVE_HOME_VIEW';

const ENTER_ABOUT_VIEW      = 'ENTER_ABOUT_VIEW';
const LEAVE_ABOUT_VIEW      = 'LEAVE_ABOUT_VIEW';

const ENTER_WEB_STARTERS_VIEW  = 'ENTER_WEB_STARTERS_VIEW';
const LEAVE_WEB_STARTERS_VIEW  = 'LEAVE_WEB_STARTERS_VIEW';

const ENTER_WEB_APPS_VIEW  = 'ENTER_WEB_APPS_VIEW';
const LEAVE_WEB_APPS_VIEW  = 'LEAVE_WEB_APPS_VIEW';

const ENTER_MOBILE_STARTERS_VIEW  = 'ENTER_MOBILE_STARTERS_VIEW';
const LEAVE_MOBILE_STARTERS_VIEW  = 'LEAVE_MOBILE_STARTERS_VIEW';

type State = {
  currentView: string,
  enterTime?: string,
  leaveTime?: string
};

type Action = {
  type: string,
  currentView: string
};
// /////////////////////
// reducer
// /////////////////////
const initialState = {
  currentView:  'not set',
  enterTime:    null,
  leaveTime:    null
};

export default function (
  state: State = initialState,
  action: Action
) {
  const rigthNow = moment().format(dateFormat);

  switch (action.type) {

  case ENTER_HOME_VIEW:
  case ENTER_ABOUT_VIEW:
  case ENTER_WEB_STARTERS_VIEW:
  case ENTER_WEB_APPS_VIEW:
  case ENTER_MOBILE_STARTERS_VIEW:
    // can't enter if you are already inside
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    rigthNow
      };
    }
    return state;

  case LEAVE_HOME_VIEW:
  case LEAVE_ABOUT_VIEW:
  case LEAVE_WEB_STARTERS_VIEW:
  case LEAVE_WEB_APPS_VIEW:
  case LEAVE_MOBILE_STARTERS_VIEW:
    // can't leave if you aren't already inside
    if (state.currentView === action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        leaveTime:    rigthNow
      };
    }
    return state;

  default:
    return state;
  }
}


// /////////////////////
// action creators
// /////////////////////
export function enterHome(): Action {
  return {
    type:         ENTER_HOME_VIEW,
    currentView:  'home'
  };
}

export function leaveHome(): Action {
  return {
    type:         LEAVE_HOME_VIEW,
    currentView:  'home'
  };
}

export function enterAbout(): Action {
  return {
    type:         ENTER_ABOUT_VIEW,
    currentView:  'about'
  };
}

export function leaveAbout(): Action {
  return {
    type:         LEAVE_ABOUT_VIEW,
    currentView:  'about'
  };
}

// export function enterLogin(): Action {
//   return {
//     type:         ENTER_LOGIN_VIEW,
//     currentView:  'Login'
//   };
// }

// export function leaveLogin(): Action {
//   return {
//     type:         LEAVE_LOGIN_VIEW,
//     currentView:  'Login'
//   };
// }


export function enterWebStarters(): Action {
  return {
    type:         ENTER_WEB_STARTERS_VIEW,
    currentView:  'web-starters'
  };
}

export function leaveWebStarters(): Action {
  return {
    type:         LEAVE_WEB_STARTERS_VIEW,
    currentView:  'web-starters'
  };
}


export function enterWebApps(): Action {
  return {
    type:         ENTER_WEB_STARTERS_VIEW,
    currentView:  'web-apps'
  };
}

export function leaveWebApps(): Action {
  return {
    type:         LEAVE_WEB_STARTERS_VIEW,
    currentView:  'web-apps'
  };
}


export function enterMobileStarters(): Action {
  return {
    type:         ENTER_MOBILE_STARTERS_VIEW,
    currentView:  'mobile-starter'
  };
}

export function leaveMobileStarters(): Action {
  return {
    type:         LEAVE_MOBILE_STARTERS_VIEW,
    currentView:  'mobile-starter'
  };
}
