import React,{ useRef,useLayoutEffect } from 'react';

import './App.css';

function App() {
  const alicRef = useRef(null)
  const foregroundRef = useRef(null)
  const backgroundRef = useRef(null)
  useLayoutEffect(()=>{
    
  
    /* Background animations */
  var sceneryFrames =   [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }   
  ];
  
  var sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
  };
  
  var sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity
  };
  var foregroundMovement = foregroundRef.current.animate(sceneryFrames, sceneryTimingForeground);
  var backgroundMovement = backgroundRef.current.animate(sceneryFrames, sceneryTimingBackground);
  
  var sceneries = [foregroundMovement, backgroundMovement];
  var spriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }   
  ];
  
  // var redQueen_alice_sprite = document.getElementById('red-queen_and_alice_sprite');
  
 ;

  var redQueen_alice = alicRef.current.animate(
    spriteFrames, {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 500,
      playbackRate: 1,
      iterations: Infinity
    });

  setInterval( function() {
    if (alicRef.playbackRate > .4) {
      alicRef.playbackRate -= .1;
      adjustBackgroundPlayback();
    } 
  }, 3000);
  
  /* Alice tires so easily! 
    Every so many seconds, reduce their playback rate so they slow a little. 
  */
  
  
  var adjustBackgroundPlayback = function() {
    if (redQueen_alice.playbackRate < .8) {
      sceneries.forEach(function(anim) {
        anim.playbackRate = redQueen_alice.playbackRate/2 * -1;
      });
    } else if (redQueen_alice.playbackRate > 1.2) {
      sceneries.forEach(function(anim) {
        anim.playbackRate = redQueen_alice.playbackRate/2;
      });
    } else {
      sceneries.forEach(function(anim) {
        anim.playbackRate = 0;    
      });
    }   
  }
  adjustBackgroundPlayback();
  
  /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
  /* But if they fall under 1, the background slides backwards */
  setInterval( function() {
    /* Set decay */
    if (redQueen_alice.playbackRate > .4) {
      redQueen_alice.playbackRate *= .9;    
    } 
    adjustBackgroundPlayback();
  }, 3000);
  
  var goFaster = function() {
    /* But you can speed them up by giving the screen a click or a tap. */
    redQueen_alice.playbackRate *= 1.1;
    adjustBackgroundPlayback();
  }
  
  window.addEventListener("click", goFaster);
  window.addEventListener("touchstart", goFaster);
  
  })
  
  return (
    <div className="container">
    <div className="sky"></div>
    
    <div className="earth">
      <div className="alice" ref={alicRef}>
          <img className="alicesprite" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"  alt="Alice and the Red Queen running to stay in place."/>
      </div>
    </div>
    
    <div className="scenery" id="foreground" ref={foregroundRef} >
      <img id="treefore" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" alt=" "/>
    </div>

    <div className="scenery background1" ref={backgroundRef} >
      <img className="pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" alt=" " />
      <img className="pawn2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" alt=" " />
      <img className="treeback" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" alt=" " />
    </div>
  </div>
  );
}

export default App;
