import { THEME_TOGGLE, USER_PROFILE } from './actions';

export const reducer = (state, { type, payload = null }) => {
    switch (type) {
        case USER_PROFILE: {
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: {
                        id: payload._id,
                        email: payload.email,
                        firstName: payload.firstName,
                        lastName: payload.lastName
                    }
                }
            }
        }

        case THEME_TOGGLE: {
            return {
                ...state,
                theme: {
                    ...state.theme,
                    dark: !state.theme.dark
                }
            }
        }

        default:
            return state;
    }
};
