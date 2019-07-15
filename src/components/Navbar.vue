<template>
    <nav>
        <!-- Tool tips -->
        <v-snackbar v-model="snackbar" :timeout="2000" top color="success">
            <span>
                Awesome! You added a new project
            </span>
            <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>

        <!-- Tool bar -->
        <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span></span>
                <span class="font-weight-light">Backoffice</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- Language -->
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn flat v-on="on">
                        <flag :iso="currentLanguage.flag" v-bind:squared=false />
                    </v-btn>
                </template>

                <v-list>
                    <v-list-tile v-for="lang in languages" :key="lang.language" @click="changeLocale(lang.language)">
                        <v-list-tile-title>
                            <flag :iso="lang.flag" v-bind:squared=false />
                            <span class="pl-1">{{ lang.title }}</span>
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

            <!-- Louout btn -->
            <v-btn flat color="gray" @click="logout">
                <v-icon right>exit_to_app</v-icon>
                <span>Sign Out</span>
            </v-btn>

        </v-toolbar>

        <v-footer  app>
            <v-spacer></v-spacer>
            <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>

        <!-- Left navigation panel -->
        <v-navigation-drawer v-model="drawer" fixed app class="blue-grey" :clipped="$vuetify.breakpoint.mdAndUp">
            <v-list>
                <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{link.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>

// import Popup from "./Popup"
// import { languages, changeLocale } from '@/i18n'
/* eslint-disable */

export default {
    components: {
    },
    data(){
        return {
            drawer : true,
            links : [
                { icon: "account_box", text: "Partners", route: "/"},
                { icon: "folder", text: "My Project", route: "/projects"},
                { icon: "person", text: "Team", route: "/team"},
                //{ icon: "person", text: "Login", route: "/login"},
            ],
            snackbar: false,
            languages: [{ flag: 'us', language: 'en', title: 'English' }, 
                        { flag: 'ru', language: 'ru', title: 'Русский' }
            ],
            //languages: Object.keys(languages),
        }
    },
    computed:
    {
        currentLanguage()
        {
            return this.languages.find(l => this.$i18n.locale === l.language )
        }
    },
    methods: {
        changeLocale(languages)
        {

        },
        setLanguage(lang)
        {
            //changeLocale(lang)
            // localStorage.lang = lang;
            // this.$i18n.locale = lang;
            // // window.t = this;
        },
        logout()
        {
            this.$store.dispatch('LOGOUT');
        }
    }
}
</script>
