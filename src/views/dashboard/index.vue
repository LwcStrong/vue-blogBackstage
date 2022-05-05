<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎使用个人博客后台</div>
    <div class="dashboard-myEcharts">
      <!-- {{echarts}} -->
      <div class="left" ref="boxed"></div>
      <div class="right" ref="box2"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'
import {getComment } from '@/api/comment.js'   // 评论
import {getProject } from '@/api/project.js'   // 项目
import {getBlogType } from '@/api/blogType.js' // 文章分类
import {getMessage } from '@/api/message.js'   // 留言
import {findBlog} from '@/api/blog.js'         // 文章
export default {
  // name: 'Dashboard',
  data() {
    return {
      xBarData : [],      // 柱状图x轴数据
      barData: [],        // 图表数据
      cakeData : []      // 饼图相关数据
    }
  },
  async created() {
    // 获取文章分类
    await getBlogType().then(res => {
      console.log('res', res.data);
      res.data.forEach(item => {
        this.xBarData.push(item.name)
        this.barData.push(item.articleCount)
      });
    })
    // console.log(this.xBarData);
    // 文章
    await findBlog().then(res => {
      this.cakeData.push({
        name: '文章',
        value: res.data.total
      })
    })
    // 项目
    await getProject().then(res => {
      // console.log('res', res);
      this.cakeData.push({
        name: '项目',
        value: res.data.length
      })
    })
    // 留言
    await getMessage().then(res => {
      this.cakeData.push({
        name: '留言',
        value: res.data.total
      })
    })
    // 评论
    await getComment().then(res => {
      this.cakeData.push({
        name: '评论',
        value: res.data.total
      })
    })
    setTimeout(() => {
      this.setLineEcharts()
      this.setCakeEcharts()
    }, 2000);
  },
  methods: {
    setLineEcharts() {
      let myChart = echarts.init(this.$refs.boxed)
      myChart.resize({
        width: '500',
        height: '400'
      })
      myChart.setOption({
        title: {
            text: '博客分类信息'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.xBarData,
          axisLabel: {   
            interval: 0,         // 默认值是1,如果字段值太长就不会显示
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            data: this.barData,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          },
        ]
      });
    },
    setCakeEcharts() {
      let myChart = echarts.init(this.$refs.box2)
      myChart.resize({
        width: '500',
        height: '400'
      })
      myChart.setOption({
        title: {
          text: '博客信息'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
        },
        series: [
          {
            type: 'pie',
            data: this.cakeData
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    margin-bottom: 20px;
  }
  &-myEcharts {
    display: flex;
    justify-content: space-around;
    height: 100%;
    // border: 1px solid;
  }
}
</style>
