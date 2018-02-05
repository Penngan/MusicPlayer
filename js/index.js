function $(selector){
    return document.querySelector(selector)
}
$('.volume').addEventListener('mouseenter',function(){
    $('.volume .voice-control').style.display = 'block'
})
$('.volume').addEventListener('mouseleave',function(){
    $('.volume .voice-control').style.display = 'none'
})

var currentIndex = 0
var audio = new Audio()
audio.autoplay = true
var musicList

getMusicList(function(list){
    musicList = list
    loadMusic(list[currentIndex])
})

function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET','/music.json',true)
    xhr.onload = function(){
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
            callback(JSON.parse(xhr.responseText))
        }else{
            console.log('获取数据失败')
        }
    }
    xhr.onerror = function(){
        console.log('网络异常')
    }
    xhr.send()
}
function loadMusic(musicObj){
    $('.content .title').innerText = musicObj.title
    $('.content .author').innerText = musicObj.auther
    $('.bg img').src = musicObj.img
    audio.src = musicObj.src
}
audio.ontimeupdate = function(){
    $('.bar .bar-now').style.width = (this.currentTime/this.duration)*100 + '%'
}
audio.onplay = function(){
    clock = setInterval(function(){
        var min_total = Math.floor(audio.duration/60)
        var sec_total = Math.floor(audio.duration%60) + ''
        sec_total = sec_total.length === 2?sec_total:'0' + sec_total
        $('.musictime .alltime').innerText = min_total + ':' + sec_total
        var min_now = Math.floor(audio.currentTime/60)
        var sec_now = Math.floor(audio.currentTime%60) + ''
        sec_now = sec_now.length === 2?sec_now:'0' + sec_now
        $('.musictime .currenttime').innerText = min_now + ':' + sec_now
    },1000)
}
audio.onpause = function(){
    clearInterval(clock)
}
$('.control .play').onclick = function(){
    if(audio.paused){
        audio.play()
        $('.play .iconfont').classList.remove('icon-play')
        $('.play .iconfont').classList.add('icon-pause')
    }else{
        audio.pause()
        $('.play .iconfont').classList.remove('icon-pause')
        $('.play .iconfont').classList.add('icon-play')
    }
}
$('.control .next').onclick = function(){
    currentIndex++
    currentIndex = currentIndex%musicList.length
    loadMusic(musicList[currentIndex])
}
$('.control .back').onclick = function(){
    currentIndex--
    currentIndex = (currentIndex + musicList.length)%musicList.length
    loadMusic(musicList[currentIndex])
}
$('.bar').onclick = function(e){
    var totalwidth = getComputedStyle(this).width
    var percent = e.offsetX/parseInt(totalwidth)
    audio.currentTime = percent*audio.duration
}
// $('.voice-control ,voice-now').addEventListener('click',function(e){
//     e.stopPropagation()
// },false)

$('.voice-control').onclick = function(e){
    var totalheight = getComputedStyle(this).height
    var percentvoi =  (60-e.offsetY)/parseInt(totalheight)
    audio.volume = percentvoi
    $('.volume .voice-now').style.height = percentvoi * 100 + '%'
}
    
    
    

    
