const app=() =>{
  const song=document.querySelector(".song");
  const play=document.querySelector(".play");
  const outline=document.querySelector(".moving-outline circle")
  const video=document.querySelector(".vid-container video");


  //sounds
  const sounds=document.querySelectorAll('.sound-picker button');

  //Time Display
  const timeDisplay=document.querySelector('.time-display');
  const timeSelect=document.querySelectorAll('.time-select button');
  // Getting the length of Outline
  const outlineLength=outline.getTotalLength();
  //Duration
  let fakeDuration =600;

  outline.style.strokeDasharray=outlineLength;
  outline.style.strokeDashoffset=outlineLength;

//Pick diffrent Sounds
  sounds.forEach(sound => {
    sound.addEventListener('click' ,function(){
       song.src=this.getAttribute('data-sound');
       video.src=this.getAttribute('data-video');
       checkPlaying(song);
    });
  });
  
  //Playing Sounds
  play.addEventListener("click",()=>{
    checkPlaying(song);
  });

  //Select sound
  timeSelect.forEach(option => {
    option.addEventListener('click',function(){
          fakeDuration=this.getAttribute("data-time");
          timeDisplay.textContent=`${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration&60)}`;
    });

  });

  //Stop and play songs
  const checkPlaying=song =>{
    if(song.paused)
  {
    song.play();
    video.play();
    play.src='./svg/pause.svg';
  }
  else{
    song.pause();
    video.pause();
    play.src='./svg/play.svg';
  }
  };

  //Animating the circle
  song.ontimeupdate= () =>{
    let currentTime=song.currentTime;
    let elapsedTime=fakeDuration-currentTime;
    let seconds=Math.floor(elapsedTime%60);
    let minutes=Math.floor(elapsedTime/60);

    //Animating the song bar circle
    let progress=outlineLength-(currentTime/fakeDuration)*outlineLength;
    outline.style.strokeDashoffset=progress;

    //Animating the text
    timeDisplay.textContent=`${minutes}:${seconds}`;

    if(currentTime>=fakeDuration)
    {
      song.pause();
      song.currentTime=0;
      play.src='./svg/play.svg';
      video.pause();
    }
  }
};

app();