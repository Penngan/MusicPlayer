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

getMusicList(function(list){
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
    console.log(this.currentTime)
    $('.bar .bar-now').style.width = (this.currentTime/this.duration)*100 + '%'
}
