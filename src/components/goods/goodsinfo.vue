<template>
<div>
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/goods.html">购物商城</a>
            <a href="/goods/42/1.html">商品详情</a>
        </div>
    </div>
    <div class="section">
        <div class="wrapper clearfix">
            <div class="wrap-box">
                <div class="left-925" v-if="goodsInfo.goodsinfo">
                    <div class="goods-box clearfix">
                        <div class="pic-box">
							<!-- 放大镜图片 -->
							<div class="magnifier" id="magnifier1">
								<div class="magnifier-container">
									<div class="images-cover"></div>
									<!--当前图片显示容器-->
									<div class="move-view"></div>
									<!--跟随鼠标移动的盒子-->
								</div>
								<div class="magnifier-assembly">
									<div class="magnifier-btn">
										<span class="magnifier-btn-left">&lt;</span>
										<span class="magnifier-btn-right">&gt;</span>
									</div>
									<!--按钮组-->
									<div class="magnifier-line">
										<ul class="clearfix animation03">
											<li v-for="item in goodsInfo.imglist" :key="item.id">
												<div class="small-img">
													<img :src="item.original_path" />
												</div>
											</li>
										</ul>
									</div>
									<!--缩略图-->
								</div>
								<div class="magnifier-view"></div>
								<!--经过放大的图片显示容器-->
							</div>
						</div>
                        <div class="goods-spec">
                            <h1>{{goodsInfo.goodsinfo.title}}</h1>
                            <p class="subtitle">{{goodsInfo.goodsinfo.sub_title}}</p>
                            <div class="spec-box">
                                <dl>
                                    <dt>货号</dt>
                                    <dd id="commodityGoodsNo">{{goodsInfo.goodsinfo.goods_no}}</dd>
                                </dl>
                                <dl>
                                    <dt>市场价</dt>
                                    <dd>
                                        <s id="commodityMarketPrice">¥{{goodsInfo.goodsinfo.market_price}}</s>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>销售价</dt>
                                    <dd>
                                        <em id="commoditySellPrice" class="price">¥{{goodsInfo.goodsinfo.sell_price}}</em>
                                    </dd>
                                </dl>
                            </div>
                            <div class="spec-box">
                                <dl>
                                    <dt>购买数量</dt>
                                    <dd>
                                        <div class="stock-box">
                                            <div class="el-input-number el-input-number--small">
                                                <!-- 计数器 -->
												<el-input-number size="small" :min="1" :max="goodsInfo.goodsinfo.stock_quantity" v-model="buycount"></el-input-number>
                                            </div>
                                        </div>
                                        <span class="stock-txt">
                                            库存
                                            <em id="commodityStockNum">{{goodsInfo.goodsinfo.stock_quantity}}</em>件
                                        </span>
                                    </dd>
                                </dl>
                                <dl>
                                    <dd>
                                        <div id="buyButton" class="btn-buy">
                                            <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                            <button ref="addCart" class="add" @click="addCart">加入购物车</button>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div id="goodsTabs" class="goods-tab bg-wrap">
						<Affix>
							<div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
								<ul>
									<li>
										<a @click="isShowComment = false" href="javascript:;" :class="isShowComment ? '' : 'selected'">商品介绍</a>
									</li>
									<li>
										<a @click="isShowComment = true" href="javascript:;" :class="!isShowComment ? '' : 'selected'">商品评论</a>
									</li>
								</ul>
							</div>
						</Affix>
                        <div v-show="!isShowComment" class="tab-content entry" style="display: block;">
							<p v-html="goodsInfo.goodsinfo.content"></p>
                        </div>
                        <div v-show="isShowComment" class="tab-content" style="display: block;">
                            <div class="comment-box">
                                <div id="commentForm" name="commentForm"
                                    class="form-box">
                                    <div class="avatar-box">
                                        <i class="iconfont icon-user-full"></i>
                                    </div>
                                    <div class="conn-box">
                                        <div class="editor">
                                            <textarea ref="commentContent" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                            <span class="Validform_checktip"></span>
                                        </div>
                                        <div class="subcon">
                                            <input @click="submitComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                            <span class="Validform_checktip"></span>
                                        </div>
                                    </div>
                                </div>
                                <ul id="commentList" class="list-box">
                                    <p v-if="comment.totalcount <= 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                    <li v-for="item in comment.message" :key="item.id">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="inner-box">
                                            <div class="info">
                                                <span>{{item.user_name}}</span>
                                                <span>{{item.add_time | timeFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                            </div>
                                            <p>{{item.content}}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="page-box" style="margin: 5px 0px 0px 62px;">
									<el-pagination
									@size-change="handleSizeChange"
									@current-change="handleCurrentChange"
									:current-page="currentPage"
									:page-sizes="[10, 20, 100, 200]"
									:page-size="pageSize"
									layout="total, sizes, prev, pager, next, jumper"
									:total="comment.totalcount">
									</el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="left-220">
                    <div class="bg-wrap nobg">
                        <div class="sidebar-box">
                            <h4>推荐商品</h4>
                            <ul class="side-img-list">
                                <li v-for="item in goodsInfo.hotgoodslist" :key="item.id">
                                    <div class="img-box">
                                        <router-link :to="'/site/goodsinfo/'+item.id" class="">
                                            <img :src="item.img_url">
                                        </router-link>
                                    </div>
                                    <div class="txt-box">
                                        <router-link :to="'/site/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                        <span>{{item.add_time | timeFmt}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<!-- 动画图片 -->
	<transition
	v-on:before-enter="beforeEnter"
	v-on:enter="enter"
	v-on:after-enter="afterEnter"
	>
		<img class="moveImg" v-show="isMove" v-if="goodsInfo.imglist" :src="goodsInfo.imglist[0].original_path" alt="">
	</transition>
</div>
</template>

<style scoped>
@import '../../statics/site/js/jqimgzoom/css/magnifier.css';

.moveImg {
	transition: all .6s;
	position: absolute;
	top: 0;
	left: 0;
	width: 50px;
	height: 50px;
}
</style>


<script>
// 导入放大镜插件
import '../../statics/site/js/jqimgzoom/js/magnifier.js'

// 导入 iview
import { Affix } from 'iview';

export default {
	data () {
		return {
			goodsInfo: {},			// 商品详细
			comment: [],
			isShowComment: false,	// 是否显示评论
			currentPage: 1,			// 当前显示页码
			pageSize: 10,			// 页容量
			isMove: false,			// 是否开始动画
			startMovePosition: {},	// 动画开始的位置
			endMovePosition: {},	// 动画结束的位置
			buycount: 1				// 购买总数
		}
	},
	created () {
		this.getGoodsInfo()
		this.getComment()
	},
	mounted () {
		this.jqueryPlugins()
		this.getMovePosition()
	},
	watch: {
		// 监听路径的变化，从新调用获取商品详细的方法
		$route () {
			this.getGoodsInfo()
			this.jqueryPlugins()
			this.getComment()
			this.buycount = 1
			this.isShowComment = false
		}
	},
	methods: {
		// 获取商品详细
		getGoodsInfo () {
			const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`
			this.$axios.get(url).then(response => {
				this.goodsInfo = response.data.message
			})
		},
		// 获取评论数据
		getComment () {
			const url = `site/comment/getbypage/goods/${this.$route.params.goodsId}?pageIndex=${this.currentPage}&pageSize=${this.pageSize}`
			this.$axios.get(url).then(response => {
				this.comment = response.data
			})
		},
		// 当页容量发生变化	
		handleSizeChange (pageSize) {
			this.pageSize = pageSize
			this.currentPage = 1
			this.getComment()
		},
		// 当前页码发生变化
		handleCurrentChange (currentPage) {
			this.currentPage = currentPage
			this.getComment()
		},
		// 提交评论
		submitComment () {
			if (this.$refs.commentContent.value.trim().length <= 0) {
				this.$message.error('评论信息不能为空')
				return
			}
			const commenttxt = this.$refs.commentContent.value
			const url = `site/validate/comment/post/goods/${this.$route.params.goodsId}`
			this.$axios.post(url, {commenttxt}).then(response => {
				if (response.data.status === 1) {
					this.$message.error(response.data.message)
					return
				}
				this.getComment()
				this.$refs.commentContent.value = ''
			})
		},
		// 获取加入购物车按钮的位置
		getMovePosition () {
			setTimeout(() => {
				// 获取开始的位置
				let start = $(this.$refs.addCart).offset()
				this.startMovePosition = start

				// 设置图片起始位置
				$('.moveImg').css({left: start.left + 70 + 'px', top: start.top + 'px'})

				// 获取结束的位置
				let end = $('#shoppingCartCount').offset()
				this.endMovePosition = end
			}, 600)
		},
		// 点击加入购物车
		addCart () {
			this.isMove = true
			const goodsObj = {
				goodsId: this.$route.params.goodsId,
				buycount: this.buycount
			}
			this.$store.commit('addLocalData', goodsObj)
		},
		// 初始化插件
		jqueryPlugins () {
			// 初始化放大镜插件
			setTimeout(() => {
				$('#magnifier1').imgzoon({magnifier:'#magnifier1'});
			}, 500);
		},

		// --------
		// 进入中
		// --------
		beforeEnter: function (el) {
			el.style.left = this.startMovePosition.left + 70 + 'px'
			el.style.top = this.startMovePosition.top + 'px'
			el.style.transform = 'scale(.8)'
		},
		enter: function (el, done) {
			el.offsetWidth
			el.style.left = this.endMovePosition.left - 70 + 'px'
			el.style.top = this.endMovePosition.top + 'px'
			el.style.transform = 'scale(.2)'
			done()
		},
		afterEnter: function (el) {
			this.isMove = false
		}
	},
	components: {
		Affix
	}
}
</script>
