module.exports = {
    languages: {
        main: 'en',
        all: ['dk', 'en'],
        presentation: {
            dk: 'Dansk',
            en: 'English'
        }
    },
    navigation: {
        root: {
            dk: 'Hjem',
            en: 'Home'
        },
        sections: [
            {
                type: 'category',
                id: 'about',
                lang: {
                    dk: {
                        title: 'Om'
                    },
                    en: {
                        title: 'About'
                    }
                }
            },
            {
                type: 'category',
                id: 'examples',
                lang: {
                    dk: {
                        title: 'Eksempler'
                    },
                    en: {
                        title: 'Examples'
                    }
                }
            },
            {
                type: 'category',
                id: 'multilingual',
                lang: {
                    dk: {
                        title: 'Flersproget'
                    },
                    en: {
                        title: 'Multilingual'
                    }
                }
            },{
                type: 'category',
                id: 'hidden',
                lang: {
                    dk: {
                        title: 'Skjulte sider'
                    },
                    en: {
                        title: 'Hidden pages'
                    }
                }
            },
            {
                type: 'custom',
                lang: {
                    dk: {
                        title: 'Selvstændig side',
                        url: '/you-have-to-build-this-page-youself'
                    },
                    en: {
                        title: 'Separate pages',
                        url: '/you-have-to-build-this-page-youself'
                    }
                }
            }
        ]
    }
};