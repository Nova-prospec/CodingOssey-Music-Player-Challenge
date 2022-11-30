
const homeIcon = document.querySelector(".home-icon")
const musicIcon = document.querySelector(".music-icon");
const hamburger = document.querySelector(".hamburger");
const body = document.querySelector("body")
const homePage = document.querySelector(".main-1")
const collectionsPage = document.querySelector(".main-2")
const nav = document.querySelector(".nav-1")
const collectionContent = document.querySelector(".collection-div")
const collectionDetails = document.querySelectorAll(".collection-parent")
const likesContent = document.querySelector(".likes-content")
const chartContainer = document.querySelector(".songs-container")
const songSection  = document.querySelector(".song-section");
const closeBtn = document.querySelector(".close-btn")
const loader = document.querySelector("#loader")

const popularDiv = document.querySelector(".popular-div")
const tommorowBtn = document.querySelectorAll(".tommorow-btn")
const tommorowPage = document.querySelector(".main-3")
const releaseDiv = document.querySelector(".releases-div");
const searchDiv = document.querySelector(".search-div")
const searchBtn = document.querySelector(".search-btn")
const searchHeader = document.querySelector(".section-4 > h2")
const hiddenHomeIcon = document.querySelector(".hidden-home-icon")
const hiddenMusicIcon = document.querySelector(".hidden-music-icon");
const hiddenNavbar = document.querySelector(".hidden-navbar")
const collectionBtn = document.querySelector(".collection-btn")
const likeBtn = document.querySelector(".likes-btn")



// MUSIC PLAYER

const mainAudio = document.querySelector("#main-audio");
const artisteName = document.querySelector(".artiste-name")
const songName = document.querySelector(".song-name");
const musicImg = document.querySelector(".music-img");
const playBtn = document.querySelector(".play-btn");
const playDiv = document.querySelector(".play-div")
const nextBtn = document.querySelector(".next-btn")
const prevBtn = document.querySelector(".prev-btn");
const progressBar = document.querySelector(".progress-bar")
const progressArea = document.querySelector(".progress-area")
const volumeArea = document.querySelector(".volume-area");
const volumeBar = document.querySelector(".volume-bar");
const shuffleBtn = document.querySelector(".shuffle-btn")
const repeatBtn = document.querySelector(".repeat-btn")
const volume = mainAudio.volume
const musicPlayer = document.querySelector(".music-player")
let songsArray = musicList

window.addEventListener("load", () => {
    loader.style.display = "none"
    loadMusic(index)
    fetchTopCharts()
    fetchNewReleases()
    fetchPopular()
})
collectionDetails.forEach(detail => {
    detail.addEventListener("mouseenter", (e) => {
        // console.log(e.target)
        let collectionPlayBtn = e.target.querySelector(".alt-play-btn")
        let collections = e.target.querySelector(".animate-details")
        let zoomImage = e.target.querySelector(".collection-parent .collection-bg")
        collectionPlayBtn.classList.add("icon-show");
        collections.classList.add("show-collections")
        zoomImage.classList.add("zoom")
        
    })
})
collectionDetails.forEach(detail => {
    detail.addEventListener("mouseleave", (e) => {
        let collectionPlayBtn = e.target.querySelector(".alt-play-btn")
        let collections = e.target.querySelector(".animate-details")
        let zoomImage = e.target.querySelector(".collection-parent .collection-bg")
        collectionPlayBtn.classList.remove("icon-show");
        collections.classList.remove("show-collections")
        zoomImage.classList.remove("zoom")
    })
})

collectionBtn.addEventListener("click", () => {
    collectionBtn.classList.add("btn-active")
    likeBtn.classList.remove("btn-active")
    collectionContent.style.display = "flex"
    likesContent.style.display = "none"
})
likeBtn.addEventListener("click", () => {
    collectionBtn.classList.remove("btn-active")
    likeBtn.classList.add("btn-active")
    collectionContent.style.display = "none"
    likesContent.style.display = "flex"
})
var index = 0;


const loadMusic = (musicIndex) => {
    mainAudio.setAttribute(`src`, `${musicList[musicIndex].src}`)
    artisteName.innerText = musicList[musicIndex].artiste
    songName.innerText = musicList[musicIndex].name
    musicImg.src = musicList[musicIndex].img
}
playDiv.addEventListener("click", () => {
    if (playDiv.classList.contains("play")) {
        pauseMusic()
    } else {
        playMusic()
    }
})
hamburger.addEventListener("click", ()=>{
openNav()
})
closeBtn.addEventListener("click", ()=>{
    closeNav()
})
const openNav = () => {
    body.style.overflowY = "hidden"
    hiddenNavbar.style.display = "block"
}
const closeNav = () => {
    hiddenNavbar.style.display = "none"
    body.style.overflowY = "scroll"
}
hiddenHomeIcon.addEventListener("click", () => {
    hiddenHomeIcon.querySelector("svg path").classList.add("color")
    homePage.style.display = "block"
    collectionsPage.style.display = "none"
    tommorowPage.style.display = "none"
    hiddenMusicIcon.classList.add("color-svg")
    hiddenMusicIcon.querySelectorAll("path").forEach(path => path.classList.remove("color"))
    body.classList.remove("body-bg")
    // body.style.backgroundColor = "var(--main-bg)"
    body.style.background = "var(--main-bg)"
    closeNav()
})
hiddenMusicIcon.addEventListener("click", () => {
    hiddenHomeIcon.querySelector("svg path").classList.remove("color")
    collectionsPage.style.display = "block"
    homePage.style.display = "none"
    tommorowPage.style.display = "none"
    hiddenNavbar.querySelector("svg path").classList.remove("color")
    hiddenHomeIcon.classList.add("color-svg")
    hiddenMusicIcon.querySelectorAll("path").forEach(path => path.classList.add("color"))
    body.classList.remove("body-bg")
    closeNav()
})
nextBtn.addEventListener("click", () => {
    nextMusic()
})
prevBtn.addEventListener("click", () => {
    prevMusic()
})
shuffleBtn.addEventListener("click", () => {
    shuffleMusic()
})
repeatBtn.addEventListener("click", () => {
    if (repeatBtn.classList.contains("repeat-active")) {
        repeatBtn.classList.remove("repeat-active")
    } else {
        repeatBtn.classList.add("repeat-active")
    }
})
const playMusic = () => {
    playDiv.classList.add("play")
    mainAudio.play()
    volumeBar.style.width = `${mainAudio.volume * 100}%`
    playDiv.innerHTML = `<ion-icon class="pause-btn" name="pause"></ion-icon>`
}
const pauseMusic = () => {
    playDiv.classList.remove("play");
    mainAudio.pause()
    playDiv.innerHTML = `<ion-icon class="play-btn" name="play"></ion-icon>`
}
const shuffleMusic = () => {
    function generateNumber() {
        let randIndex = Math.floor(Math.random() * musicList.length)
        return randIndex
    }
    while (index == generateNumber()) {
        generateNumber()
    }
    loadMusic(generateNumber())
    playMusic()
}
const nextMusic = () => {
    if (index >= musicList.length - 1) {
        index = 0
        loadMusic(index)
        playMusic()
    } else {
        index++
        loadMusic(index)
        playMusic()
    }
}
const prevMusic = () => {
    if (index <= 0) {
        index = musicList.length - 1
        loadMusic(index)
        playMusic()
    } else {
        index--
        loadMusic(index)
        playMusic()
    }
}
const repeatMusic = () => {
    mainAudio.currentTime = 0
    playMusic()
}

mainAudio.addEventListener("timeupdate", (e) => {
    let currentTime = e.target.currentTime;
    let duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`
})
mainAudio.addEventListener("ended", () => {
    if (repeatBtn.classList.contains("repeat-active")) {
        repeatMusic()
    }else{
        nextMusic()
    }
})
progressArea.addEventListener("click", (e) => {
    let widthValue = progressArea.clientWidth;
    let clickPosition = e.offsetX
    let songDuration = mainAudio.duration
    mainAudio.currentTime = (clickPosition / widthValue) * songDuration;
})

searchBtn.addEventListener("click", () => {
    let searchBox = document.querySelector(".search-box").value;
    let searchError = document.querySelector(".search-error")
    if (searchBox == "" || searchBox.match(/^\s*$/)) {
        searchError.classList.add("search-animate")
        searchError.innerHTML = "Please ensure the search box isn't empty"
        setTimeout(() => {
            searchError.innerHTML = ""
            searchError.classList.remove("search-animate")
        }, 3000);
    }
    else {
        fetchSearchedSong(searchBox)
    }
    
})
volumeArea.addEventListener("click", (e) => {
    try {
        let widthValue = volumeArea.clientWidth
        let clickPosition = e.offsetX
        let calculatedVolume = (clickPosition / widthValue) * volume
        let newWidth = calculatedVolume * 100
        volumeBar.style.width = `${newWidth}%`
        mainAudio.volume = calculatedVolume
    } catch (error) {
        delete error
    }
})
homeIcon.addEventListener("click", () => {
    nav.querySelector("svg path").classList.add("color")
    homePage.style.display = "block"
    collectionsPage.style.display = "none"
    tommorowPage.style.display = "none"
    musicIcon.classList.add("color-svg")
    musicIcon.querySelectorAll("path").forEach(path => path.classList.remove("color"))
    body.classList.remove("body-bg")
    body.style.background = "none"
    body.style.backgroundColor = "var(--main-bg)"
})
musicIcon.addEventListener("click", () => {
    collectionsPage.style.display = "block"
    homePage.style.display = "none"
    tommorowPage.style.display = "none"
    nav.querySelector("svg path").classList.remove("color")
    homeIcon.classList.add("color-svg")
    musicIcon.querySelectorAll("path").forEach(path => path.classList.add("color"))
    body.classList.remove("body-bg")
    body.style.background = "none"
    body.style.backgroundColor = "var(--main-bg)"
})




const showTommorowSection = (chartName, chartImage, chartInfo, array) => {
    homePage.style.display = "none"
    collectionsPage.style.display = "none"
    tommorowPage.style.display = "block"
    let tommorowMainImage = document.querySelector(".main-3-bg")
    let tommorowPageText = document.querySelector(".tommorow-page-text")
    let chartDesc = document.querySelector(".chart-info")
    tommorowPageText.innerHTML = chartName;
    tommorowMainImage.setAttribute(`src`, `${chartImage}`)
    chartDesc.innerHTML = chartInfo
    body.className = "body-bg"
    body.style.background = `linear-gradient(180deg, rgba(29, 33, 35, 0.8) 0%, #1D2123 61.48%), url("${chartImage}")`
    let newArray = JSON.parse(array)
    displayChartSongs(newArray)
}


const displayChartSongs = (array) => {
    let songs =  array.map(
        (item) =>{
            return `
            <div class="chart-song">
            <div class="chart-song-image">
            <img class="cover" src="${item.cover}" alt="">
            <svg class="like-btn" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"  clip-rule="evenodd" d="M1.43496 8.37182C0.540791 5.58016 1.58662 2.10933 4.51746 1.16599C6.05912 0.668493 7.96162 1.08349 9.04246 2.57433C10.0616 1.02849 12.0191 0.671826 13.5591 1.16599C16.4891 2.10933 17.5408 5.58016 16.6475 8.37182C15.2558 12.7968 10.4 15.1018 9.04246 15.1018C7.68579 15.1018 2.87329 12.8485 1.43496 8.37182Z" stroke="#EFEEE0" stroke-width="0.625"   stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
            <div class="chart-song-name">
            <p>${item.title}</p>
            <p class="artist-name" style="display: none;">${item.artist}</p>
            <p class="song-name" style="display: none;">${item.title}</p>
            </div>
            <div class="chart-song-duration">
            <p>${item.duration}</p>
            </div>
            <div class="chart-dots">
            <img src="images/dots.svg" alt="">
            </div>
            <audio class="audio" style="display: none;" src="${item.audio}"></audio>
            </div>
            
            `
        }
        ).join("")
        songSection.innerHTML = songs
        
        
        const chartSongs  = document.querySelectorAll(".chart-song")
        chartSongs.forEach(
            (song) => {
                song.addEventListener("click",  (e)=>{
                    
                    try {
                        let songName  = e.target.querySelector(".song-name").innerHTML
                        let artistName  = e.target.querySelector(".artist-name").innerHTML
                        let audio  = e.target.querySelector(".audio").src
                        let img  = e.target.querySelector(".cover").src
                        loadFetchedMusic(songName, artistName, audio, img)
                    } catch (error) {
                        delete error
                    }
                    
                })
            }
            )
            
            const likeButtons   = document.querySelectorAll(".like-btn")
            likeButtons.forEach(button =>{
                button.addEventListener("click", (e)=>{
                    e.stopPropagation()
                    let coverImg  = e.target.parentElement.parentElement.querySelector(".cover").src
                    let songName  = e.target.parentElement.parentElement.querySelector(".chart-song-name .song-name").innerHTML
                    let artisteName  = e.target.parentElement.parentElement.querySelector(".artist-name").innerHTML
                    let audio = e.target.parentElement.parentElement.querySelector(".audio").src
                    let path  = e.target.querySelector("path")
                    const playlist  = [coverImg, songName, artisteName, audio ]
                    // const playList = [...playList , {cover : coverImg ,  }]  
                    // let data  = localStorage.setItem("likedSongs" , JSON.stringify(playlist))
                    // localStorage.getItem("likedSongs")
                    // const likesArray = [   ]
                    // const playlist  = { 
                    //     img: coverImg,
                    //     song: songName, 
                    //     artiste: artisteName,
                    //     audioSrc: audio
                    //   }
                    // likesArray.push(playlist)
                    // const playList = [...playList , {cover : coverImg ,  }]  
                    // let data  = JSON.stringify(playlist)
                    let data  = JSON.stringify(playlist)
                    
                    if (localStorage.getItem(songName) ){
                        localStorage.removeItem(songName)
                        path.setAttribute("fill", " ")
                    }else{
                        localStorage.setItem(songName, data)
                        path.setAttribute("fill", "#ff0000")
                    }
                    getLikes()
        })
    })
}

const getLikes = () =>{
    let songNames = document.querySelectorAll(".chart-song-name .song-name")
    songNames.forEach(
        (song) =>{
            let data  = localStorage.getItem(song.innerHTML)
            if (data == null) {
                return 
            }
            const array  = JSON.parse(data)
            displayLikes(array)
        }
    )
}
const displayLikes = (array) => {
    
    
    let template = `
        <div class="likes-parent">
            <img src="${array[0]}" class="likes-bg" alt="">
            <div class="alt-play-parent"><ion-icon class="pause-btn alt-play-btn-s" name="play"></ion-icon></div>
             <div class="animate-likes">
                 <h3 class="liked-song-name">${array[1]}</h3>
                <p class="liked-song-artiste">${array[2]}</p>
                <span class="liked-song-likes">1.8m likes</span>
                <audio class="liked-audio" style="display: none;" src="${array[3]}" ></audio>
        </div>
        </div>
    `
    if (likesContent.innerHTML.includes(array[1])){
        return
    }
    likesContent.innerHTML += template

    let likeParents = likesContent.querySelectorAll(".likes-parent")
    likeParents.forEach(like => {
        like.addEventListener("mouseenter", (e) => {
            let likePlayBtn = e.target.querySelector(".alt-play-btn-s")
            let likes = e.target.querySelector(".animate-likes")
            let zoomImage = e.target.querySelector(".likes-parent .likes-bg")
            likePlayBtn.classList.add("icon-show")
            likes.style.bottom = "5px"
            zoomImage.classList.add("zoom")
        })
    })
    likeParents.forEach(like => {
        like.addEventListener("mouseleave", (e) => {
            let likePlayBtn = e.target.querySelector(".alt-play-btn-s")
            let likes = e.target.querySelector(".animate-likes")
            let zoomImage = e.target.querySelector(".likes-parent .likes-bg")
            likePlayBtn.classList.remove("icon-show")
            likes.style.bottom = "-30px"
            zoomImage.classList.remove("zoom")
        })
    })


    const playPauseBtns  = likesContent.querySelectorAll(".alt-play-parent")
    playPauseBtns.forEach((btn)=>{
        btn.addEventListener("click", (e)=>{
            let songName  = e.target.parentElement.parentElement.querySelector(".liked-song-name").innerHTML;
            let artiste = e.target.parentElement.parentElement.querySelector(".liked-song-artiste").innerHTML;
            let cover  = e.target.parentElement.parentElement.querySelector(".likes-bg").src;
            let audio  = e.target.parentElement.parentElement.querySelector(".liked-audio").src;

            loadFetchedMusic(songName, artiste, audio, cover)
            if (btn.classList.contains("playing")) {
                pauseMusic()
                btn.classList.remove("playing")
                btn.innerHTML = ` <ion-icon class="pause-btn alt-play-btn-s" name="play"></ion-icon>`
            }else{
                playMusic()
                btn.classList.add("playing")
                btn.innerHTML = `<ion-icon class="pause-btn alt-play-btn-s" name="pause"></ion-icon> `
            }
        })
    })
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f93a11bd8emsh0dd795c889f63f8p145670jsn13619f0ab6a2',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
};
const fetchNewReleases = async () => {
    try {
        const response = await fetch('https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US', options)
        const data = await response.json()
        const array = data.tracks
        displayNewReleases(array)
    } catch (error) {
        console.error(error)
    }
}
const displayNewReleases = (array) => {
    const releases = array.map(
        (i, k) => {
            return `
        <div class="release">
        <img src="${i.images.coverart}" alt="">
        <p>${i.title}</p>
        <span>${i.subtitle}</span>
        <audio src="${i.hub.actions[1].uri}"></audio>
    </div>
        `
        }
    ).join("")
    releaseDiv.innerHTML = releases

    const fetchedSongs = document.querySelectorAll(".release")
    fetchedSongs.forEach(
        (song) => {
            song.addEventListener("click", (e) => {
                let img = e.target.closest(".release img").getAttribute("src")
                let mp3 = e.target.parentElement.querySelector("audio").getAttribute("src")
                let name = e.target.parentElement.querySelector("p").innerHTML
                let artiste = e.target.parentElement.querySelector("span").innerHTML
                loadFetchedMusic(name, artiste, mp3, img)
            })
        }
    )
}
const fetchSearchedSong = async (value) => {
    try {
        const response = await fetch(`https://shazam.p.rapidapi.com/search?term=${value}&locale=en-US&offset=0&limit=10`, options)
        const data = await response.json()
        let array = data.tracks.hits
        displaySearchedMusic(array)
    } catch (error) {
        console.error(error)
        
    }
}
// fetchSearchedSong()
const displaySearchedMusic = (array) => {
    const searchedSongs = array.map(
        (i, k) => {
            return `
            <div class="search-song">
                <img src="${i.track.images.coverart}" alt="">
                <p>${i.track.title}</p>
                <span>${i.track.subtitle}</span>
                <audio src="${i.track.hub.actions[1].uri}"></audio>
            </div>
            `
        }
    ).join("")
    searchHeader.innerHTML = "Your Search"
    searchDiv.innerHTML = searchedSongs


    const songs = document.querySelectorAll(".search-song")
    songs.forEach(
        (song) => {
            song.addEventListener("click", (e) => {
                let img = e.target.parentElement.querySelector(".search-song img").src
                let src = e.target.parentElement.querySelector("audio").src
                let name = e.target.parentElement.querySelector("p").innerHTML
                let artiste = e.target.parentElement.querySelector("span").innerHTML
                loadSearchedSongs(name, artiste, src, img)
            })
        }
    )
}

const fetchPopular = async () => {
    try {
        let response = await fetch("https://musica-api.onrender.com/popular")
        const data = await response.json()
        displayPopularSong(data)
    } catch (error) {
        console.error(error)
       
    }
}
const displayPopularSong = (array) => {
    const songs = array.map(
        (item, i) => {
            return `
                 <div class="popular-song">
                        <img src="${item.cover}" alt="">
                        <p>${item.title}</p>
                        <span>${item.artist}</span>
                        <audio src="${item.audio}"></audio>
                    </div>
                     `
        }
    ).join("")
    popularDiv.innerHTML = songs


    const music = document.querySelectorAll(".popular-song")
    music.forEach(song => {
        song.addEventListener("click", (e) => {
            let img = e.target.src
            let name = e.target.parentElement.querySelector("p").innerHTML
            let artiste = e.target.parentElement.querySelector("span").innerHTML
            let src = e.target.parentElement.querySelector("audio").getAttribute("src")
            loadFetchedMusic(name, artiste, src, img)
        })
    })
}

const fetchTopCharts = async () => {
   try {
    let response = await fetch("https://musica-api.onrender.com/playlist")
    let data = await response.json()
    let array = []
    for (let i = 0; i < 3; i++) {
        array.push(data[i])
    }
    displayCharts(array)
   } catch (error) {
    console.error(error)
    
   }
}
// <span class="chart-info" style="opacity: 0;">${item.info}</>
const displayCharts = (array) => {
    const charts = array.map(
        (item) => {
            return   `
                <div class="song-card">
                <div class="card-flex">
                        <div>
                            <img class="chart-image" src="${item.cover}" alt="golden-age">
                            </div>
                        <div>
                            <h3 class="tommorow-btn">${item.title}</h3>
                            <p>${item.title.split(" ")[0]}</p>
                        <span class="list-info" style="display: none;" >${item.info}</span>
                        <span class="array" style = "display: none;">${JSON.stringify(item.files)}</span>
                            </div>
                            </div>
                            <div class="heart-icon-div">
                            <span><img src="images/heart-icon.svg" alt=""></span>
                            </div>
                            </div>
                            `
                            
        }

    ).join("")

    chartContainer.innerHTML = charts

    //  console.log(array);
    let tommorowBtn = document.querySelectorAll(".tommorow-btn")
    tommorowBtn.forEach(btn => btn.addEventListener("click", (e) => {
        let chartName = e.target.parentElement.parentElement.querySelector("h3").innerHTML
        let chartImage = e.target.parentElement.parentElement.querySelector(".chart-image").src
        let chartInfo = e.target.parentElement.parentElement.querySelector(".list-info").innerHTML
        let array = e.target.parentElement.querySelector(".array").innerHTML
        // console.log(array)
        showTommorowSection(chartName, chartImage, chartInfo, array)
    }))
}


const loadSearchedSongs = (name, artiste, src, img) => {
    mainAudio.setAttribute(`src`, `${src}`)
    mainAudio.currentTime = 0
    progressBar.style.width = `${0}%`
    pauseMusic()
    artisteName.innerHTML = artiste
    songName.innerHTML = name
    musicImg.src = img
}
const loadFetchedMusic = (name, artistes, src, img) => {
    mainAudio.setAttribute(`src`, `${src}`)
    mainAudio.currentTime = 0
    progressBar.style.width = `${0}%`
    pauseMusic()
    artisteName.innerHTML = artistes
    songName.innerHTML = name
    musicImg.src = img
}
