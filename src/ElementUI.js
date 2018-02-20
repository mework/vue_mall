// 导入vue
import Vue from 'vue'

// 导入 element-ui
import {
Pagination,	    // 分页
Input,		    // 表单
InputNumber,	// 计数器
Radio,		    // 单选框
RadioGroup,	    // 单选框事件
Switch,		    // 开关
Button,		    // 按钮
Form,			// form表单
FormItem,		// form表单事件
Row,			// 表格
Col,			// 表格
Carousel,		// 走马灯(轮播图)
CarouselItem,	// 走马灯事件
MessageBox,	    // 弹框
Message,		// 消息提示
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message