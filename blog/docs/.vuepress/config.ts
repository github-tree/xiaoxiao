import { defaultTheme,defineUserConfig } from 'vuepress'

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'doc',
    description: '',
    // head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
    theme: defaultTheme({
        // 侧边栏对象
        sidebar: {
            '/': [
                {
                    text: 'Golang',
                    collapsible: true,
                    children: [
                        {
                            text: '数据类型',
                            collapsible: true,
                            children: [
                                '/go/shujuleixing/arr_slice.md',
                                '/go/shujuleixing/hanshu_zhi_yinyong.md',
                                '/go/shujuleixing/init.md',
                                '/go/shujuleixing/interface_bijiao.md',
                                '/go/shujuleixing/map_shunxu.md',
                                '/go/shujuleixing/new_make.md',
                                '/go/shujuleixing/nil_xiangdeng.md',
                                '/go/shujuleixing/rune.md',
                                '/go/shujuleixing/select.md',
                                '/go/shujuleixing/slice_kuorong.md',
                                '/go/shujuleixing/slice_nil.md',
                                '/go/shujuleixing/struct_bijiao.md',
                                '/go/shujuleixing/struct_nil.md',
                                '/go/shujuleixing/struct_nil_yongtu.md',
                                '/go/shujuleixing/zhi_yinyong.md',
                                '/go/shujuleixing/zhi_yinyong_jieshou.md',
                            ],
                        },
                        {
                            text: 'goroutine',
                            collapsible: true,
                            children: [
                                '/go/xiecheng/goroutine_diaodu.md',
                                '/go/xiecheng/goroutine_wait.md',
                                '/go/xiecheng/xiecheng.md',
                                '/go/xiecheng/xiecheng_xian.md',
                            ],
                        },
                        {
                            text: 'channel',
                            collapsible: true,
                            children: [
                                '/go/chan/anquan.md',
                                '/go/chan/gongxiang.md',
                                '/go/chan/texing.md',
                                '/go/chan/tongbu.md',
                                '/go/chan/yibu.md',
                            ],
                        },
                        {
                            text: 'gc',
                            collapsible: true,
                            children: [
                                '/go/gc/chufatiaojian.md',
                                '/go/gc/duiqi.md',
                                '/go/gc/jiance.md',
                                '/go/gc/jingtai.md',
                                '/go/gc/jizhi.md',
                                '/go/gc/taoyi.md',
                                '/go/gc/why.md',
                                '/go/gc/xiaoduixiang.md',
                            ],
                        },
                        {
                            text: '包',
                            collapsible: true,
                            children: [
                                '/go/bao/sync.md',
                                '/go/bao/context.md'
                            ],
                        },
                        '/go/shejimoshi.md',
                        '/go/youhua.md',
                    ],
                },
                {
                    text: 'MySQL',
                    collapsible: true,
                    children: [
                        '/mysql/char_varchar.md',
                        '/mysql/check.md',
                        '/mysql/datetime.md',
                        '/mysql/engine.md',
                        '/mysql/float.md',
                        '/mysql/man.md',
                        '/mysql/shiwu.md',
                        '/mysql/suoyin_guanli.md',
                        '/mysql/suoyin_tiaoyou.md',
                        '/mysql/suoyin_zhu.md',
                        '/mysql/youhua.md',
                    ],
                },
                {
                    text: 'PHP',
                    collapsible: true,
                    children: [
                        '/php/composer.md',
                        '/php/hanshu.md',
                        '/php/moshu.md',
                        '/php/oop.md',
                        '/php/session.md',
                        '/php/zhi_yinyong.md',
                    ],
                },
                {
                    text: 'Redis',
                    collapsible: true,
                    children: [
                        '/redis/huancun.md',
                        '/redis/jichuan.md',
                        '/redis/chuantou.md',
                        '/redis/xuebeng.md',
                        '/redis/chijiuhua.md',
                        '/redis/fenbushisuo.md',
                        '/redis/shaobing.md',
                        '/redis/shaobing_jiqun.md',
                    ],
                },
                {
                    text: '分布式',
                    collapsible: true,
                    children: [
                        '/fenbushi/id.md',
                        '/fenbushi/shiwu.md',
                        '/fenbushi/suo.md',
                    ],
                },
                {
                    text: '协议',
                    collapsible: true,
                    children: [
                        '/agreement/http_code.md',
                        '/agreement/http_qingqiu.md',
                        '/agreement/http_url.md',
                        '/agreement/tcp_three.md',
                    ],
                },
                {
                    text: '算法',
                    collapsible: true,
                    children: [
                        '/algorithm/algorithm_01.md',
                        '/algorithm/algorithm_02.md',
                        '/algorithm/paixu.md',
                    ],
                },
            ],
        },
        //导航栏配置
        navbar: [
            // {
            //     text: 'GitHub',
            //     link: '/foo/',
            // },
        ],
    }),
})
