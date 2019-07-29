import axios from 'axios'
import app from '../main'

const service = axios.create({
    baseURL: process.env.API_ROOT,
})

let loading = null
// let Authorization = sessionStorage.getItem('Authorization')   // 用户登录token

// 请求拦截器
service.interceptors.request.use(
    config => {
        loading = app.$loading({
            lock: true,
            text: '请稍等...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0)',
            customClass: 'request-loading',
        })

        let Authorization = sessionStorage.getItem('Authorization')
        if (Authorization) {
            config.headers.Authorization = Authorization
        }

        return config
    },
    err => {
        // console.log(err)
        loading.close()
        app.$message.error(err)
        Promise.reject(err)
    }
)

//响应拦截器
service.interceptors.response.use(
    res => {
        loading.close()
        if (res.data.code !== 0) {
            app.$message.error(res.data.msg)
            if (res.data.code === 99999) {
                sessionStorage.removeItem('Authorization')
                sessionStorage.removeItem('userInfo')
                app.$store.commit('setUserInfo', {})
                app.$router.replace({ name: 'SignIn' })
            }
        }
        if (res.headers.token) {
            sessionStorage.setItem('Authorization', res.headers.token)
        }
        return res.data
    },
    err => {
        // console.log(JSON.parse(JSON.stringify(err)))
        loading.close()
        // let text = JSON.parse(JSON.stringify(err)).response.status === 404 ? '404' : '网络异常，请重试'
        app.$message.error('网络异常')
        return Promise.reject(err)
    }
)

// 页面刷新，Authorization存在时获取用户信息
// if(Authorization) {
//     service({url: '/user/getUser', method: 'post'}).then( res => {
//       app.$store.commit('setUserInfo', res.data)
//     })
// }

/****************************************         请求API           *******************************************/
export default {
    service,

    // 验证注册的用户名
    checkUserName(data) {
        return service({
            url: '/auth/verityregister/username',
            method: 'post',
            data
        })
    },

    // 注册验证公众号名称
    checkOfficialAccountName(data) {
        return service({
            url: '/auth/verityregister/officialName',
            method: 'post',
            data
        })
    },

    // 提交注册信息验证
    submitSignUpInfo(data) {
        return service({
            url: '/auth/verityregister',
            method: 'post',
            data
        })
    },

    // 获取手机验证
    getPhoneCode(data) {
        return service({
            url: '/auth/getcode',
            method: 'post',
            data
        })
    },

    //上传单张图片
    uploadImg(file) {
        let data = new FormData()
        data.append('resource', file)

        return service({
            url: '/upload/image',
            method: 'post',
            data,
        })
    },

    // 提交注册
    signUp(data) {
        return service({
            url: '/auth/register',
            method: 'post',
            data
        })
    },

    // 登录
    signIn(data) {
        return service({
            url: '/auth/login',
            method: 'post',
            data
        })
    },

    // 退出登录
    logout() {
        return service({
            url: '/auth/logout',
            method: 'post',
        })
    },

    // 查询素材
    getMaterial(data) {
        return service({
            url: '/sourceMaterial/getSourceMaterials',
            method: 'post',
            data
        })
    },

    // 根据ID查询素材详情
    getMaterialById(data) {
        return service({
            url: '/sourceMaterial/getSourceMaterialById',
            method: 'post',
            data
        })
    },

    // 添加素材
    addMaterial(data) {
        return service({
            url: '/sourceMaterial/saveSourceMaterial',
            method: 'post',
            data
        })
    },

    // 修改素材
    updateMaterial(data) {
        return service({
            url: '/sourceMaterial/updateSourceMaterial',
            method: 'post',
            data
        })
    },

    // 删除素材
    delMaterial(data) {
        return service({
            url: '/sourceMaterial/delSourceMaterial',
            method: 'post',
            data
        })
    },

    // 获取图片分类
    getImgTypes(data) {
        return service({
            url: '/sourceMaterialIcon/getSourceMaterialIcons',
            method: 'post',
            data
        })
    },

    // 添加图片分类
    addImgTypes(data) {
        return service({
            url: '/sourceMaterialIcon/saveSourceMaterialIcon',
            method: 'post',
            data
        })
    },

    // 修改图片所属分类
    updateImgTypes(data) {
        return service({
            url: '/sourceMaterial/updateSourceMaterialgroup',
            method: 'post',
            data
        })
    },

    // 获取关键词回复列表
    getKeyWordResponseList(data) {
        return service({
            url: '/keywordreply/search',
            method: 'post',
            data
        })
    },
    //分页查询粉丝和标签
    getFansAndLables(data) {
        return service({
            url: '/fansmanagement/search',
            method: 'post',
            data
        })
    },
    //添加粉丝标签
    addFansLable(data) {
        return service({
            url: '/fansmanagement/add/newLabel',
            method: 'post',
            data
        })
    },
    //点击标签查找粉丝
    getFansByLable(data) {
        return service({
            url: '/fansmanagement/search/labelFans',
            method: 'post',
            data
        })
    },
    //修改粉丝备注
    updateFansRemark(data) {
        return service({
            url: '/fansmanagement/addRemark',
            method: 'post',
            data
        })
    },

    //添加或取消黑名单
    addOrRemoveBlaklist(data) {
        return service({
            url: '/fansmanagement/add/type',
            method: 'post',
            data
        })
    },
    //打标签
    labelOperation(data) {
        return service({
            url: '/fansmanagement/labelOperation',
            method: 'post',
            data
        })
    },
    //黑名单列表
    getBlackList(data) {
        return service({
            url: '/fansmanagement/blacklist',
            method: 'post',
            data
        })
    },
    //修改/删除标签
    updateLabel(data) {
        return service({
            url: '/fansmanagement/updateLabel',
            method: 'post',
            data
        })
    },

    // 添加关键词回复
    addKeyWordResponse(data) {
        return service({
            url: '/keywordreply/add',
            method: 'post',
            data
        })
    },

    // 修改关键词回复
    updateKeyWordResponse(data) {
        return service({
            url: '/keywordreply/update',
            method: 'put',
            data
        })
    },

    // 删除关键词回复
    deleteKeyWordResponse(data) {
        return service({
            url: '/keywordreply/delete',
            method: 'delete',
            data
        })
    },

    // 获取回复
    getAutoResponse(data) {
        return service({
            url: '/automaticreply/search',
            method: 'post',
            data
        })
    },

    // 添加 / 修改收到消息回复 / 关注回复
    editAutoResponse(data) {
        return service({
            url: '/automaticreply/add',
            method: 'post',
            data
        })
    },

    // 删除回复
    deleteAutoResponse(data) {
        return service({
            url: '/automaticreply/delete',
            method: 'delete',
            data
        })
    },

    // 获取自定义菜单列表
    getMenuList(data) {
        return service({
            url: '/custommenu/getCustommenu',
            method: 'post',
            data
        })
    },

    // 添加自定义菜单
    addCustomMenu(data) {
        return service({
            url: '/custommenu/addCustommenu',
            method: 'post',
            data
        })
    },

    // 更新自定义菜单
    updateCustomMenu(data) {
        return service({
            url: '/custommenu/updateCustommenu',
            method: 'post',
            data
        })
    },

    // 删除自定义菜单
    deleteCustomMenu(data) {
        return service({
            url: '/custommenu/delCustommenu',
            method: 'post',
            data
        })
    },

    // 获取自定义模板列表
    getCustomTemplateList(data) {
        return service({
            url: '/customTemplate/getCustomTemplates',
            method: 'post',
            data
        })
    },

    // 添加自定义模板
    addCustomTemplate(data) {
        return service({
            url: '/customTemplate/addCustomTemplate',
            method: 'post',
            data
        })
    },

    // 删除自定义模板
    delCustomTemplate(data) {
        return service({
            url: '/customTemplate/delCustomTemplate',
            method: 'post',
            data
        })
    },

    // 修改自定义模板
    updateCustomTemplate(data) {
        return service({
            url: '/customTemplate/updateCustomTemplates',
            method: 'post',
            data
        })
    },

    //  收益广场 查询现金交易流水
    getCashFlow(data) {
        return service({
            url: '/moneylog/search',
            method: 'post',
            data
        })
    },
    //  收益广场 查询token交易流水
    getTokenFlow(data) {
        return service({
            url: '/currencylog/search',
            method: 'post',
            data
        })
    },
    //  收益广场 现金收益查询
    getCashIncome(id) {
        return service({
            url: `/moneylog/cashEarnings/${id}`,
            method: 'get',
        })
    },

    //  账户余额查询
    getBalance(id) {
        return service({
            url: `/user/findbalance/${id}`,
            method: 'get',
        })
    },
    //  token余额查询
    getTokenBalance(id) {
        return service({
            url: `/officialcurrency/findCurrencyBalance/${id}`,
            method: 'get',
        })
    },
    //查询token提币申请记录
    getTokenCoinRecord(data) {
        return service({
            url: `/officialwithdraw/findCurrency`,
            method: 'post',
            data
        })
    },
    // 收益提现 查询现金提现申请记录
    getChangeWithdraw(data) {
        return service({
            url: `/officialwithdraw/search`,
            method: 'post',
            data
        })
    },
    // 获取币种类型
    getCurrency() {
        return service({
            url: '/currency/search',
            method: 'get',
        })
    },
    // 收益提现 token提现的提币地址查询
    getWithdrawCurrency(data) {
        return service({
            url: `/withdrawcurrency/findByCurrencyId`,
            method: 'post',
            data
        })
    },
    
    // 获取群发消息列表
    getGroupSendMsgList(data) {
        return service({
            url: '/mass/masstextingList',
            method: 'post',
            data
        })
    },
}