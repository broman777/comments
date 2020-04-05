import { commentService } from '../_services';

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
    write({ dispatch, commit }, msg) {
        commentService.write(msg)
            .then(
                msg => {
                    commit('writeSuccess', msg);
                    router.push('/');
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