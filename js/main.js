function _(query) {
    return document.querySelector(query);
}

function _all(query) {
    return document.querySelectorAll(query);
}
let songList = [{
        thumbnail: "adjib-dastan.jpeg",
        audio: "Ajeeb_Daastan_Hai_Yeh.mp3",
        songname: "Ajeeb Daastan Hai Yeh",
        artistname: "Lata Mangeshkar"
    },
    {
        thumbnail: "bahon-mein-chalo-aao.jpg",
        audio: "BAHON_MEIN_CHALE_AAO.mp3",
        songname: "Bahon Mein Chale Aao",
        artistname: "Lata Mangeshkar"
    }, {
        thumbnail: "tere-chehare-se-najar.jpg",
        audio: "tere-chehare-se-najar.mp3",
        songname: "Tere Chehre Se Nazar",
        artistname: "Lata Mangeshkar , Kishor Kumar"
    }, {
        thumbnail: "hum-bhul-gaye-re-har-baat.jpeg",
        audio: "tere-chehare-se-najar.mp3",
        songname: "Hum Bhool Gaye Re Har Baat",
        artistname: "Lata Mangeshkar"
    }
];

let currentSongIndex = 0;

let player = _(".player"),
    toggleSongList = _(".player .toggle-list");

let main = {
    audio: _(".player .main audio"),
    thumbnail: _(".player .main img"),
    seekbar: _(".player .main input"),
    songname: _(".player .main .details h2"),
    artistname: _(".player .main .details p"),
    prevControl: _(".player .main .controls .prev-control"),
    playPauseControl: _(".player .main .controls .play-pause-control"),
    nextControl: _(".player .main .controls .next-control")
}

toggleSongList.addEventListener("click", function () {
    toggleSongList.classList.toggle("active");
    player.classList.toggle("activeSongList");
});

_(".player .player-list .list").innerHTML = (songList.map(function (song, songIndex) {
    return `
		<div class="item" songIndex="${songIndex}">
			<div class="thumbnail">
				<img src="../img/${song.thumbnail}">
			</div>
			<div class="details">
				<h2>${song.songname}</h2>
				<p>${song.artistname}</p>
			</div>
		</div>
	`;
}).join(""));

let songListItems = _all(".player .player-list .list .item");
for (let i = 0; i < songListItems.length; i++) {
    songListItems[i].addEventListener("click", function () {
        currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
        loadSong(currentSongIndex);
        player.classList.remove("activeSongList");
    });
}

function loadSong(songIndex) {
    let song = songList[songIndex];
    main.thumbnail.setAttribute("src", "../img/" + song.thumbnail);
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("../img/${song.thumbnail}") center no-repeat`;
    document.body.style.backgroundSize = "cover";
    main.songname.innerText = song.songname;
    main.artistname.innerText = song.artistname;
    main.audio.setAttribute("src", "../music/" + song.audio);
    main.seekbar.setAttribute("value", 0);
    main.seekbar.setAttribute("min", 0);
    main.seekbar.setAttribute("max", 0);
    main.audio.addEventListener("canplay", function () {
        main.audio.play();
        if (!main.audio.paused) {
            main.playPauseControl.classList.remove("paused");
        }
        main.seekbar.setAttribute("max", parseInt(main.audio.duration));
        main.audio.onended = function () {
            main.nextControl.click();
        }
    })
}
setInterval(function () {
    main.seekbar.value = parseInt(main.audio.currentTime);
}, 1000);

main.prevControl.addEventListener("click", function () {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songList.length + currentSongIndex;
    }
    loadSong(currentSongIndex);
});
main.nextControl.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    loadSong(currentSongIndex);
});
main.playPauseControl.addEventListener("click", function () {
    if (main.audio.paused) {
        main.playPauseControl.classList.remove("paused");
        main.audio.play();
    } else {
        main.playPauseControl.classList.add("paused");
        main.audio.pause();
    }
});
main.seekbar.addEventListener("change", function () {
    main.audio.currentTime = main.seekbar.value;
});

loadSong(currentSongIndex);

function change_vol() {
    player.volume = document.getElementById("change_vol").value;
}

$(window).keypress(function (e) {
    if (e.keyCode == 0 || e.keyCode == 32) {
        if (main.audio.paused) {
            main.playPauseControl.classList.remove("paused");
            main.audio.play();
        } else {
            main.playPauseControl.classList.add("paused");
            main.audio.pause();
        }
    }
});