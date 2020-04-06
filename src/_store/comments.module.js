import { commentService } from '../_services';
import { router } from '../_helpers';

const state = () => ({
    comments: []
})

const actions = {
    get({ dispatch, commit }) {
        commentService.get()
            .then(
                comments => commit('getAllSuccess', comments),
                error => commit('getAllFailure', error)
            );
    },
    write({ dispatch, commit }, data) {
        commentService.write(data)
            .then(
                msg => {
                    commit('writeSuccess', msg);
                    router.go(0);
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Writing successful', { root: true });
                    })
                },
                error => {
                    commit('writeFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    getAllSuccess(state, comments) {
        state.comments = comments;
    },
    getAllFailure(state, error) {
        state.comments = { error };
    }
};

export const comments = {
    namespaced: true,
    state,
    mutations,
    actions
};