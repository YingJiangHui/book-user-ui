import { history } from '@umijs/max';

export const toLogin = () => {
    history.push({
        pathname: `/login?redirectTo=${window.location.pathname}${window.location.search}`,
    });
};
