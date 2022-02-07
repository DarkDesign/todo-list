import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import NotesSheetModule from '@/app/modules/notes-sheet/NotesSheet.module.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: NotesSheetModule
    },
    {
        path: '/note/:id',
        name: 'Note',
        component: () => import(/* webpackChunkName: "note" */ '@/app/modules/note/Note.module.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
