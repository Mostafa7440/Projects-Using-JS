// let val = document.getElementById('fileInput')
// let audio = document.getElementById('audio')
// val.addEventListener('change',(e)=>{
//     const file = e.target.files[0]
//     console.log(file)
//     console.log(URL.createObjectURL(file))
//     audio.src = URL.createObjectURL(file)
// })

let inputVal = document.getElementById('fileInput')
let labal = document.getElementById('labalcontent')
let playBtn = document.getElementById('play')
let circle = document.getElementById('circle')
let audio = document.getElementById('audio')
let firstFace = document.querySelector('.firstface')
let backControlBtn = document.querySelector('.back')
let forwordControlBtn = document.querySelector('.forward')
let playControlBtn = document.getElementById('stopBtn')
let playerFace = document.querySelector('.playerface')
let songTitle = document.getElementById('songTitle')
let lineload = document.querySelector('.lineloading .after')
let countTime = document.querySelector('.count')
let item = document.querySelector('.item')
let musicTime = document.getElementById('musicTime')
let volumeBtn = document.getElementById('volumeIcon')
let listSongs = document.getElementById('listOfItems')
let inputAddSong = document.getElementById('songAddBtn')
let FirstSong = document.getElementById('FirstSong')
let list = []
let listStop = 0
let retuenFileSrc;
let percentDivision;
// first face functionallity 
function getName(val){
    return val.target.files[0].name;
}
function getSrc(val){
    return val.target.files[0]
}
function addSrcInTag(src,tag){
    let fileSrc = URL.createObjectURL(src)
    tag.src = fileSrc
}
inputVal.addEventListener('change',(e)=>{
    labal.textContent = getName(e)
    songTitle.textContent = getName(e)
    retuenFileSrc = getSrc(e)
    FirstSong.textContent = getName(e)

})
playBtn.addEventListener('click',()=>{
    if(retuenFileSrc){
        list.push(retuenFileSrc)
        addSrcInTag(retuenFileSrc,audio)
        firstFace.classList.add('active')
        playerFace.classList.add('active')
        audio.autoplay = true;
    }
})
// to appear all data of music
audio.addEventListener("loadedmetadata",data)
// pause and play buttton 
circle.addEventListener('click',(e)=>{
    if(e.target.classList.contains('fa-play')){
        audio.play();
        playControlBtn.className = "fas fa-pause";
        playControlBtn.style.padding = 0;
    }
    else if(e.target.classList.contains('fa-pause')){
        audio.pause()
        playControlBtn.className = "fas fa-play play"
        playControlBtn.style.padding = `0 5px 0 12px`;
    }
})
// function to create time that display 
function displayInTwoNumber(num){
    if(num<10){
        return '0'+Math.floor(num)
    }else{
        return Math.floor(num)
    }
}
function addTime(val){
    let munites = val/60
    if(Math.floor(munites) == 0){
        return displayInTwoNumber(0)+':'+displayInTwoNumber(val);
    }
    else if(Math.floor(munites)> 0 ){
        return displayInTwoNumber(Math.floor(munites))+':'+ displayInTwoNumber(val-((Math.floor(munites))*60))
    }
}
function count(){
    if(audio.paused == false){
        countTime.textContent = addTime(audio.currentTime)
        let valWidth = Number(audio.currentTime) / Number(percentDivision)
        lineload.style.width = `${valWidth}%`
    }
    else if(audio.ended == true){
       playNext()
    }
}
function data(){
    songTitle.textContent = listSongs.children[listStop].textContent
    let allTimeMusic = audio.duration
    percentDivision = Number(audio.duration) / 100
    musicTime.textContent = addTime(allTimeMusic)
    for(let i = 0 ;i < listSongs.children.length ; i++){
        listSongs.children[i].classList.remove('active')
    }
    listSongs.children[listStop].classList.add('active')
}

setInterval(count,1000)
// volume function 
volumeBtn.addEventListener('click',()=>{
    if(volumeBtn.classList.contains('fa-volume-up')){
        volumeBtn.className = "fas fa-volume-mute"
        audio.muted = true;
    }
    else if(volumeBtn.classList.contains('fa-volume-mute')){
        volumeBtn.className = "fas fa-volume-up"
        audio.muted = false;
    }
})
// function create item
function createItem(val){
    
}
// function add songs 
inputAddSong.addEventListener('change',(e)=>{
    let createdItem = document.createElement('div')
    createdItem.textContent = getName(e)
    createdItem.className = 'item';
    list.push(getSrc(e))
    listSongs.appendChild(createdItem)
})
function playNext(){
    if(listStop < list.length - 1 ){
        listStop++;
        addSrcInTag(list[listStop],audio)
        audio.autoplay = true;
    }
}
function playPrevious(){
    if(listStop > 0){
        listStop--;
        addSrcInTag(list[listStop],audio)
    }
}
// back and forward song btns 
backControlBtn.addEventListener('click',playPrevious)
forwordControlBtn.addEventListener('click',playNext)
// item function 
listSongs.addEventListener('click',(e)=>{
    for(let i = 0 ;i < listSongs.children.length ; i++){
        if(list[i].name == e.target.textContent){
            listStop = i;
            addSrcInTag(list[listStop],audio)
        }
    }
})