import { createRouter, createWebHistory } from 'vue-router';


import { HomeView, DespositView, SaqueView } from '@/views';

import Guard from "../service/middleware"

import DashboardLayout from "../components/Layout/DashboardLayout"
import LoginLayout from "../components/Layout/LoginLayout"
import MeLayout from "../components/Layout/MeLayout"

import LoginView from "../modules/Users/Views/Usuarios/LoginView.vue"
import RegisterView from "../modules/Users/Views/Usuarios/RegisterView.vue"
import MeView from "../modules/Me/Views/MeView.vue"

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'bg-teal-500/80',
    linkExactActiveClass: 'bg-teal-500/80',
    routes: [
        {
            path: '/',
            component: DashboardLayout,
            beforeEnter: Guard.redirectIfNotAuthenticated,
            children: [
                {
                    path: "",
                    name: "index",
                    component: MeView
                }
            ]
        },
        {
            path: '/me',
            component: MeLayout,
            beforeEnter: Guard.redirectIfNotAuthenticated,
            children: [
                {
                    path: "",
                    name: "me",
                    component: MeView
                }
            ]

        },
        {
            path: '/login',
            // beforeEnter: Guard.redirectIfAuthenticated,
            children: [{
                path: "",
                name: "login",
                component: LoginView
            }]
        },
        {
            path: '/register',
            name: "register",
            component: RegisterView
        }
    ]
});





// router.beforeEach(async (to) => {
//     const publicPages = ['/login', '/register'];
//     const authRequired = !publicPages.includes(to.path);
//     const auth = useAuthStore();

//     if (authRequired && !auth.user) {
//         auth.returnUrl = to.fullPath;
//         window.document.location.href = "/login"
//     }

// });
