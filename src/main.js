import { createApp } from 'vue'
import App from './App.vue'
import './style/reset.css'
import router from './router/index'
import store from './store'
// 引入rem配置
import '../src/utils/rem.js'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入懒加载的图片
import loading from './assets/images/loading.gif'
//引入mock
// import './mock/mockServe.js'
import {
    Icon, Button, Tabbar, TabbarItem, Swipe, SwipeItem, Tab, Tabs, Sidebar, SidebarItem,Card ,Tag,Sticky,Notify,
    IndexBar,Switch,Field,AddressList,NavBar,AddressEdit,Area, RadioGroup, Radio, PasswordInput, NumberKeyboard,Image as VanImage,
    ContactCard , IndexAnchor, Cell, CellGroup,Stepper,SubmitBar,ActionSheet,Popup,Grid, GridItem,Empty,Rate,Divider,Uploader,ImagePreview
} from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);
app.use(VueLazyload, {
    preLoad: 1.3,
    loading: loading,
    attempt: 1
})
app.use(Icon).use(Button).use(Tabbar).use(TabbarItem).use(Field).use(Tag).use(Sticky).use(Empty).use(Rate).use(Divider).use(Uploader).use(ImagePreview)
    .use(AddressList).use(NavBar).use(AddressEdit).use(Area).use(PasswordInput).use(NumberKeyboard).use(VanImage).use(Notify)
    .use(Switch).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(IndexBar).use(Popup).use(Grid).use(GridItem).use(RadioGroup).use(Radio)
    .use(IndexAnchor).use(Cell).use(CellGroup).use(Sidebar).use(SidebarItem).use(Card).use(Stepper).use(SubmitBar).use(ActionSheet).use(ContactCard)
app.use(router).use(store).mount('#app')
