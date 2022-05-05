import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist   白名单
// 路由前置首位
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()
  const hasGetUserInfo = store.getters.user
  if(to.meta.auth) {
    // 页面需要鉴权
    if(hasGetUserInfo) {
      // 存在用户信息
      next()
    } else {
      // 没有用户信息，看是否有token
      const hasToken = localStorage.getItem('adminToken')
      if(hasToken) {
        // 有token,验证有效性
        try {
          await store.dispatch('user/getInfo')
          next() 
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error('登录过期，请重新登录！')
          next(`/login?redirect=${to.path}`)
          NProgress.done() 
        }


      } else {
        next(`/login?redirect=${to.path}`)
        NProgress.done() 
      }
    }
  } else {
    if(to.path === '/login' && hasGetUserInfo) {
      // 说明现在是登陆状态，要去登陆页面
      next({path : '/'})
    } else {
      next()
    }
    NProgress.done()   // 进度条走完
  }

  // 官方鉴权流程
  // if (hasToken) {
  //   // 存在token
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       // 是否有用户信息
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly  是否存在于白名单
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
