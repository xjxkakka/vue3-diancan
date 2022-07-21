//先引入mockjs模块
import Mock from 'mockjs'
import { computed } from "vue";
//把JSON数据格式引入进来[JSON数据格式根本没有对外暴露，但是可以引入]
//webpack默认对外暴露的:图片、JSON数据格式

const data = [
    {
        name: '热菜', id: 1, sum: 0, money: 0, menu: [
            {
                id: 1,
                pic: 'https://img0.baidu.com/it/u=1944289348,2211613780&fm=253&fmt=auto&app=138&f=JPEG?w=891&h=500',
                title: '土洞牛腩',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 15,
                state: false
            },
            {
                id: 2,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '手撕包菜',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 35,
                state: false
            },
            {
                id: 3,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '肉末切丝',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 25,
                state: false
            },
            {
                id: 4,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '番茄牛肉',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 22,
                state: false
            },
            {
                id: 5,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '火鸡面',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 44,
                state: false
            },
        ]
    },
    {
        name: '凉菜', id: 2, sum: 0, money: 0, menu: [
            {
                id: 6,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '小鸡炖蘑菇',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 15,
                state: false
            },
            {
                id: 7,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '龙虾炒肉',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 25,
                state: false
            },
            {
                id: 8,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '清蒸大闸蟹',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 42,
                state: false
            },
            {
                id: 9,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '酥炸春花肉酥炸春花肉',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 33,
                state: false
            },
            {
                id: 10,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '烤花揽桂鱼',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 22,
                state: false
            },
        ]
    },
    {
        name: '甜点', id: 3, sum: 0, money: 0, menu: [
            {
                id: 11,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '奶汤蒲菜',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 443,
                state: false
            },
            {
                id: 12,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '龙凤双腿',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 232,
                state: false
            },
            {
                id: 13,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '清汤柳叶燕菜',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 343,
                state: false
            },
            {
                id: 14,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '蒜苗火鸡排',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 23,
                state: false
            },
            {
                id: 15,
                pic: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimagepphcloud.thepaper.cn%2Fpph%2Fimage%2F74%2F154%2F849.jpg&refer=http%3A%2F%2Fimagepphcloud.thepaper.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659170250&t=6777ee36f1123f7c5e55d388b15a9adf',
                title: '杨梅虾球',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 22,
                state: false
            },
        ]
    },
    {
        name: '汤', id: 4, sum: 0, money: 0, menu: [
            {
                id: 16,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '蜜汁叉烧',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 312,
                state: false
            },
            {
                id: 17,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '蒜香鲶鱼',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 222,
                state: false
            },
            {
                id: 18,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '金银菜东菇墨鱼煲猪踭',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 251,
                state: false
            },
            {
                id: 19,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '灵芝鸡汤',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 322,
                state: false
            },
            {
                id: 20,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '凉拌海蜇',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 444,
                state: false
            },
        ]
    },
    {
        name: '饮料', id: 5, sum: 0, money: 0, menu: [
            {
                id: 21,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '罗汉果焖瓜子鸡',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 152,
                state: false
            },
            {
                id: 22,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '黑鸡拆烩老猫公',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 353,
                state: false
            },
            {
                id: 23,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '沙丁鱼烙',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 235,
                state: false
            },
            {
                id: 24,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '什锦烩饭',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 242,
                state: false
            },
            {
                id: 25,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '可口的葡萄醋',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 464,
                state: false
            },
        ]
    },
    {
        name: '米饭', id: 6, sum: 0, money: 0, menu: [
            {
                id: 26,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '梅干菜烧肉  ',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 152,
                state: false
            },
            {
                id: 27,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '豆腐咸鱼头汤',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 353,
                state: false
            },
            {
                id: 28,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '红枣炖蚕蛹',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 25,
                state: false
            },
            {
                id: 29,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '西式芦笋汤',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 242,
                state: false
            },
            {
                id: 30,
                pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
                title: '姜丝肉蟹',
                desc: '家里的味道,拼单却不简单',
                count: 0,
                price: 454,
                state: false
            },
        ]
    },
/*        {name:'米饭',id:7,sum:0,money:0,menu:[
                {id:31,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'梅干菜烧肉  ',desc:'家里的味道,拼单却不简单',count: 0, price: 152,state:false},
                {id:32,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'豆腐咸鱼头汤',desc:'家里的味道,拼单却不简单',count: 0, price: 353,state:false},
                {id:33,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'红枣炖蚕蛹',desc:'家里的味道,拼单却不简单',count: 0, price: 25,state:false},
                {id:34,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'西式芦笋汤',desc:'家里的味道,拼单却不简单',count: 0, price: 242,state:false},
                {id:35,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'姜丝肉蟹',desc:'家里的味道,拼单却不简单',count: 0, price: 454,state:false},
            ]},
        {name:'米饭',id:8,sum:0,money:0,menu:[
                {id:36,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'梅干菜烧肉  ',desc:'家里的味道,拼单却不简单',count: 0, price: 152,state:false},
                {id:37,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'豆腐咸鱼头汤',desc:'家里的味道,拼单却不简单',count: 0, price: 353,state:false},
                {id:38,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'红枣炖蚕蛹',desc:'家里的味道,拼单却不简单',count: 0, price: 25,state:false},
                {id:39,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'西式芦笋汤',desc:'家里的味道,拼单却不简单',count: 0, price: 242,state:false},
                {id:40,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'姜丝肉蟹',desc:'家里的味道,拼单却不简单',count: 0, price: 454,state:false},
            ]},
        {name:'米饭',id:9,sum:0,money:0,menu:[
                {id:41,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'梅干菜烧肉  ',desc:'家里的味道,拼单却不简单',count: 0, price: 152,state:false},
                {id:42,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'豆腐咸鱼头汤',desc:'家里的味道,拼单却不简单',count: 0, price: 353,state:false},
                {id:43,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'红枣炖蚕蛹',desc:'家里的味道,拼单却不简单',count: 0, price: 25,state:false},
                {id:44,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'西式芦笋汤',desc:'家里的味道,拼单却不简单',count: 0, price: 242,state:false},
                {id:45,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'姜丝肉蟹',desc:'家里的味道,拼单却不简单',count: 0, price: 454,state:false},
            ]},
        {name:'米饭',id:10,sum:0,money:0,menu:[
                {id:46,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'梅干菜烧肉  ',desc:'家里的味道,拼单却不简单',count: 0, price: 152,state:false},
                {id:47,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'豆腐咸鱼头汤',desc:'家里的味道,拼单却不简单',count: 0, price: 353,state:false},
                {id:48,pic:'https://img.yzcdn.cn/vant/ipad.jpeg',title:'红枣炖蚕蛹',desc:'家里的味道,拼单却不简单',count: 0, price: 25,state:false},

            ]}*/
]

//mock数据:第一个参数请求地址   第二个参数:请求数据
Mock.mock(
    '/mock/menu',
    'get',
    () => {
        return {
            code: 200,
            msg: 'success',
            data
        }
    }
)
Mock.mock(
    '/mock/menu',
    'post',
    // 传父id，还有整个需要修改的字段重新赋值  需要 redact.body才能拿到传过来的值
    (redact) => {
        let sum = 0
        // console.log(redact)
        const { id ,card} = JSON.parse(redact.body)
        // console.log(id,card)
        data.forEach(item => {
            if (item.id === id) {
                item.menu.forEach(food =>{
                    if (food.id === card.id){
                        food.count = card.count
                        // console.log(food)
                    }
                })
                // 在遍历下当前的父节点下的子节点中的count总数
                item.menu.forEach(i=>{
                    sum+=i.count
                })
                item.sum = sum
            }
        })
        return {
            code: 200,
            msg: 'success',
            data
        }
    }
)
Mock.mock(
    '/mock/reset/menu',
    'post',
    // 传父id，还有整个需要修改的字段重新赋值  需要 redact.body才能拿到传过来的值
    () => {
        data.forEach(item => {
            // {name:'米饭',id:10,sum:0,money:0,menu:[
            item.sum = 0
            item.money = 0
            item.menu.forEach(i=>{
                i.count = 0
            })
        })
        return {
            code: 200,
            msg: 'success',
            data
        }
    }
)

