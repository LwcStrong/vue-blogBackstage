// 工具函数库

export function formatDate(time) {
    var date = new Date(parseInt(time))
    var year = date.getFullYear()
    var mounth = date.getMonth() + 1
    var day = date.getDate()
    var hours = date.getHours()
    var minuters = date.getMinutes()
    var seconds = date.getSeconds()
    var weekArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
    var week = weekArr[date.getDay()]

    if(mounth >= 1 && mounth <= 9) {
        mounth = '0' + mounth
    }

    if(day >= 1 && day <= 9) {
        day = '0' + day
    }

    if(hours >= 1 && hours <= 9) {
        hours = '0' + hours
    }
    if(minuters >= 1 && minuters <= 9) {
        minuters = '0' + minuters
    }
    if(seconds >= 1 && seconds <= 9) {
        seconds = '0' + seconds
    }

    return year + '-' +  mounth + '-' + day + ' ' + hours + ':' + minuters + ':' + seconds + ' ' + week;
}