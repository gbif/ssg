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
                id: 'board',
                name: {
                    dk: 'Bestyrelse',
                    en: 'Board members'
                }
            },
            {
                type: 'category',
                id: 'flat',
                name: {
                    dk: 'Flad',
                    en: 'Flat'
                }
            },
            {
                type: 'custom',
                dk: {
                    title: 'min side',
                    url: 'www.google.com'
                },
                en: {
                    title: 'my page',
                    url: '/tester'
                }
            }
        ]
    }
};