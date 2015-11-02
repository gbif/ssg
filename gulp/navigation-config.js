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
                name: {
                    dk: 'Om',
                    en: 'About'
                }
            },
            {
                type: 'category',
                id: 'examples',
                name: {
                    dk: 'Eksempler',
                    en: 'Examples'
                }
            },
            {
                type: 'category',
                id: 'multilingual',
                name: {
                    dk: '',
                    en: ''
                }
            },
            {
                type: 'custom',
                dk: {
                    title: 'Selvstændig side',
                    url: '/you-have-to-build-this-page-youself'
                },
                en: {
                    title: 'Separate pages',
                    url: '/you-have-to-build-this-page-youself'
                }
            }
        ]
    }
};