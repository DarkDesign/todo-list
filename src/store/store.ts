import Vue from 'vue';
import Vuex, { Store, ModuleTree } from 'vuex';
import { RootState, state, actions, mutations, getters } from './root/store';

Vue.use(Vuex);

const modules: ModuleTree<RootState> = {};

export const store = new Store<RootState>({
    state,
    getters,
    mutations,
    actions,
    modules,
});
