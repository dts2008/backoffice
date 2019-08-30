<template>
    <nav>
        <!-- Tool tips -->
        <v-snackbar v-model="snackbar" :timeout="2000" top color="error">
            <span>
                {{ $t('error.' + this.$store.getters.ERRORID) }}
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
                    <v-list-tile v-for="lang in languages" :key="lang.language" @click="setLanguage(lang.language)">
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
        <v-navigation-drawer clipped fixed v-model="drawer" app class="blue darken-4">
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

/* eslint-disable */

export default {
    components: {
    },
    data(){
        return {
            drawer : true,
            snackbar: false,
            languages: [{ flag: 'us', language: 'en', title: 'English' }, 
                        { flag: 'ru', language: 'ru', title: 'Русский' }
            ],
            snackbar: false
        }
    },
    computed:
    {
        currentLanguage()
        {
            return this.languages.find(l => this.$i18n.locale === l.language )
        },

        links() {
            return [
                { icon: "account_box", text: this.$t('pages.partners'), route: "/"},
                { icon: "person", text: this.$t('pages.users'), route: "/users"},
                { icon: "help", text: this.$t('pages.help'), route: "/help"}
            ]
        },

        isError() {
            return this.$store.getters.ISERROR
        }
    },
    methods: {
        setLanguage(lang)
        {
            this.$i18n.locale = lang
            //dataTable.rowsPerPageText
            //this.$vuetify.lang.current = 'ru'
        },

        logout()
        {
            this.$store.dispatch('LOGOUT');
        }
    },

    watch: {
    // whenever question changes, this function will run
        isError: function (newError, oldError) {
            if (newError)
                this.snackbar = true;
        },

        snackbar: function (newSnackbar, oldSnackbar) {
            if (!newSnackbar)
                this.$store.commit('SET_ISERROR', false);
        }
    }
}
</script>
