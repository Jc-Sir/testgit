title: 'JunCai He',
    module.exports = {
        description: 'Replace the stars and rivers in the body with unlimited methods for the future.',
        head: [
            ['link', { rel: 'icon', href: '/favicon2.png' }]
        ],
        themeConfig: {
            sidebarDepth: 2,
            nav: require("./nav"),
            sidebar: require("./slide"),
            lastUpdated: 'Last Updated', // string | boolean
        },
        plugins: [
            '@vuepress/back-to-top', [
                'vuepress-plugin-comment',
                {
                    choosen: 'valine',
                    // options选项中的所有参数，会传给Valine的配置
                    options: {
                        el: '#valine-vuepress-comment',
                        appId: '2GlT2DnLy4iW1uW6sfyTvqpc-gzGzoHsz',
                        appKey: '4QFcy7xkpj622FrfEzRQTPik',
                        notify: false,
                        verify: false,
                        visitor: true,
                        avatar: 'mm',
                        placeholder: 'write here'
                    }
                }
            ]
        ]
    }