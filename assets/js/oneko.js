// oneko.js: https://github.com/adryd325/oneko.js
// Enhanced with pawprints, scare, idle toys, greeting & edge-hanging.

(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) return;

  const nekoEl = document.createElement("div");
  let persistPosition = true;

  let nekoPosX = 32;
  let nekoPosY = 32;

  let mousePosX = 0;
  let mousePosY = 0;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;

  // --- New state ---
  let greetingFrame = 0;
  let isGreeting = true;

  let isScared = false;
  let scareTimer = null;
  let scarePosX = 0;
  let scarePosY = 0;

  let pawprintCounter = 0;

  let toyElement = null;
  let butterflyAnimId = null;

  let isHanging = false;

  const nekoSpeed = 10;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  // ==================== PAWPRINT TRAIL ====================
  let pawLeft = true; // alternates left/right paw

  function spawnPawprint(x, y, angleDeg) {
    const paw = document.createElement("div");
    paw.style.cssText = `
      position:fixed;
      left:${x - 10}px;
      top:${y - 10}px;
      width:20px;
      height:20px;
      pointer-events:none;
      z-index:2147483646;
      opacity:0.8;
      transition:opacity 2.5s ease-out;
      background:url("/assets/images/pawprint.svg") center/contain no-repeat;
      transform:rotate(${angleDeg}deg);
    `;
    document.body.appendChild(paw);
    // Trigger fade after a brief moment
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        paw.style.opacity = "0";
      });
    });
    paw.addEventListener("transitionend", () => paw.remove());
    // Safety cleanup
    setTimeout(() => { if (paw.parentNode) paw.remove(); }, 3500);
  }

  // ==================== RIGHT-CLICK SCARE ====================
  function scareCat(event) {
    if (isScared) return;
    isScared = true;
    // Clear any active idle / toy state
    resetIdleAnimation();
    cleanupToy();

    // Run away from cursor: compute direction away, flee ~250px
    const dx = nekoPosX - event.clientX;
    const dy = nekoPosY - event.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    scarePosX = nekoPosX + (dx / dist) * 250;
    scarePosY = nekoPosY + (dy / dist) * 250;
    // Clamp to viewport
    scarePosX = Math.max(32, Math.min(window.innerWidth - 32, scarePosX));
    scarePosY = Math.max(32, Math.min(window.innerHeight - 32, scarePosY));

    // Recover after 2 seconds
    if (scareTimer) clearTimeout(scareTimer);
    scareTimer = setTimeout(() => {
      isScared = false;
      scareTimer = null;
    }, 2000);
  }

  // ==================== IDLE TOYS ====================
  function spawnYarnBall() {
    cleanupToy();
    const ball = document.createElement("div");
    const hue = Math.floor(Math.random() * 360);
    ball.style.cssText = `
      position:fixed;
      left:${nekoPosX + (Math.random() > 0.5 ? 25 : -35)}px;
      top:${nekoPosY - 5}px;
      width:14px;
      height:14px;
      border-radius:50%;
      background:radial-gradient(circle at 35% 35%, hsl(${hue},70%,65%), hsl(${hue},60%,40%));
      box-shadow:0 1px 3px rgba(0,0,0,0.2);
      pointer-events:none;
      z-index:2147483646;
      transition:transform 0.4s cubic-bezier(.17,.67,.3,1.33), opacity 0.4s ease-out;
    `;
    // Yarn texture lines
    ball.innerHTML = `<svg viewBox="0 0 14 14" style="width:100%;height:100%;">
      <path d="M3 4 Q7 2 11 5" stroke="rgba(255,255,255,0.35)" fill="none" stroke-width="0.8"/>
      <path d="M2 8 Q7 6 12 9" stroke="rgba(255,255,255,0.25)" fill="none" stroke-width="0.8"/>
    </svg>`;
    document.body.appendChild(ball);
    toyElement = ball;
  }

  function batYarnBall() {
    if (!toyElement) return;
    // Make the ball bounce away
    const dx = (Math.random() - 0.5) * 120;
    const dy = -30 - Math.random() * 40;
    toyElement.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg)`;
    toyElement.style.opacity = "0";
    const el = toyElement;
    setTimeout(() => { if (el.parentNode) el.remove(); }, 500);
    toyElement = null;
  }

  function spawnButterfly() {
    cleanupToy();
    const bf = document.createElement("div");
    bf.style.cssText = `
      position:fixed;
      pointer-events:none;
      z-index:2147483646;
    `;
    const wingHue = Math.random() > 0.5 ? 280 : 200;
    bf.innerHTML = `
      <div style="position:relative;width:20px;height:16px;">
        <div style="position:absolute;left:0;top:0;width:8px;height:12px;
          background:hsl(${wingHue},65%,60%);border-radius:50% 50% 50% 20%;
          transform-origin:right center;animation:bfWingL 0.3s ease-in-out infinite alternate;
          box-shadow:inset -1px 0 2px rgba(255,255,255,0.4);"></div>
        <div style="position:absolute;right:0;top:0;width:8px;height:12px;
          background:hsl(${wingHue},65%,60%);border-radius:50% 50% 20% 50%;
          transform-origin:left center;animation:bfWingR 0.3s ease-in-out infinite alternate;
          box-shadow:inset 1px 0 2px rgba(255,255,255,0.4);"></div>
        <div style="position:absolute;left:9px;top:1px;width:2px;height:14px;
          background:#555;border-radius:1px;"></div>
        <div style="position:absolute;left:7px;top:-3px;width:1px;height:5px;
          background:#777;transform:rotate(-20deg);border-radius:0.5px;"></div>
        <div style="position:absolute;left:12px;top:-3px;width:1px;height:5px;
          background:#777;transform:rotate(20deg);border-radius:0.5px;"></div>
      </div>
    `;
    document.body.appendChild(bf);
    toyElement = bf;

    // Inject butterfly wing animation if not already present
    if (!document.getElementById("oneko-bf-style")) {
      const style = document.createElement("style");
      style.id = "oneko-bf-style";
      style.textContent = `
        @keyframes bfWingL { from{transform:rotateY(0deg)} to{transform:rotateY(70deg)} }
        @keyframes bfWingR { from{transform:rotateY(0deg)} to{transform:rotateY(-70deg)} }
      `;
      document.head.appendChild(style);
    }

    // Float the butterfly around the cat
    let bfAngle = Math.random() * Math.PI * 2;
    let bfRadius = 40 + Math.random() * 20;
    function animateButterfly() {
      if (!toyElement || toyElement !== bf) return;
      bfAngle += 0.03 + Math.random() * 0.02;
      bfRadius += (Math.random() - 0.5) * 2;
      bfRadius = Math.max(30, Math.min(70, bfRadius));
      const bx = nekoPosX + Math.cos(bfAngle) * bfRadius - 10;
      const by = nekoPosY + Math.sin(bfAngle) * bfRadius * 0.6 - 20 + Math.sin(bfAngle * 3) * 5;
      bf.style.left = `${bx}px`;
      bf.style.top = `${by}px`;
      butterflyAnimId = requestAnimationFrame(animateButterfly);
    }
    butterflyAnimId = requestAnimationFrame(animateButterfly);
  }

  function cleanupToy() {
    if (toyElement) {
      if (toyElement.parentNode) toyElement.remove();
      toyElement = null;
    }
    if (butterflyAnimId) {
      cancelAnimationFrame(butterflyAnimId);
      butterflyAnimId = null;
    }
  }

  // ==================== EDGE HANGING ====================
  // Inject the hanging swing animation
  function injectHangingStyle() {
    if (document.getElementById("oneko-hang-style")) return;
    const style = document.createElement("style");
    style.id = "oneko-hang-style";
    style.textContent = `
      @keyframes onekoSwing {
        0%,100% { transform: scale(2) rotate(-3deg); }
        50% { transform: scale(2) rotate(3deg); }
      }
    `;
    document.head.appendChild(style);
  }

  function startHanging() {
    if (isHanging) return;
    isHanging = true;
    injectHangingStyle();
    nekoEl.style.animation = "onekoSwing 2s ease-in-out infinite";
    nekoEl.style.transformOrigin = "center top";
  }

  function stopHanging() {
    if (!isHanging) return;
    isHanging = false;
    nekoEl.style.animation = "";
    nekoEl.style.transformOrigin = "";
    nekoEl.style.transform = "scale(2)";
  }

  // ==================== INIT ====================
  function init() {
    let nekoFile = "/assets/images/oneko-tabby.svg"
    const curScript = document.currentScript
    if (curScript && curScript.dataset.cat) {
      nekoFile = curScript.dataset.cat
    }
    if (curScript && curScript.dataset.persistPosition) {
      if (curScript.dataset.persistPosition === "") {
        persistPosition = true;
      } else {
        persistPosition = JSON.parse(curScript.dataset.persistPosition.toLowerCase());
      }
    }

    if (persistPosition) {
      let storedNeko = JSON.parse(window.localStorage.getItem("oneko"));
      if (storedNeko !== null) {
        nekoPosX = storedNeko.nekoPosX;
        nekoPosY = storedNeko.nekoPosY;
        mousePosX = storedNeko.mousePosX;
        mousePosY = storedNeko.mousePosY;
        frameCount = storedNeko.frameCount;
        idleTime = storedNeko.idleTime;
        idleAnimation = storedNeko.idleAnimation;
        idleAnimationFrame = storedNeko.idleAnimationFrame;
        nekoEl.style.backgroundPosition = storedNeko.bgPos;
        isGreeting = false; // Skip greeting on persisted restore
      }
    }

    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "none";
    nekoEl.style.imageRendering = /\.svg(?:[?#]|$)/i.test(nekoFile) ? "auto" : "pixelated";
    nekoEl.style.transform = "scale(2)";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;

    nekoEl.style.backgroundImage = `url(${nekoFile})`;

    document.body.appendChild(nekoEl);

    document.addEventListener("mousemove", function (event) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    // Right-click scare
    document.addEventListener("contextmenu", scareCat);

    if (persistPosition) {
      window.addEventListener("beforeunload", function (event) {
        window.localStorage.setItem("oneko", JSON.stringify({
          nekoPosX: nekoPosX,
          nekoPosY: nekoPosY,
          mousePosX: mousePosX,
          mousePosY: mousePosY,
          frameCount: frameCount,
          idleTime: idleTime,
          idleAnimation: idleAnimation,
          idleAnimationFrame: idleAnimationFrame,
          bgPos: nekoEl.style.backgroundPosition
        }));
      });
    }

    window.requestAnimationFrame(onAnimationFrame);
  }

  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    // Stops execution if the neko element is removed from DOM
    if (!nekoEl.isConnected) {
      return;
    }
    if (!lastFrameTimestamp) {
      lastFrameTimestamp = timestamp;
    }
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    // --- Edge hanging check ---
    if (nekoPosY <= 32 && idleTime > 3) {
      startHanging();
      setSprite("idle", 0);
      return;
    } else {
      stopHanging();
    }

    // every ~ 20 seconds
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf", "yarnBall", "butterfly"];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      idleAnimation =
        avalibleIdleAnimations[
        Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];

      // Spawn toy on first frame
      if (idleAnimation === "yarnBall") spawnYarnBall();
      if (idleAnimation === "butterfly") spawnButterfly();
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      case "yarnBall":
        // Cat bats at the yarn ball using scratchSelf animation
        setSprite("scratchSelf", idleAnimationFrame);
        if (idleAnimationFrame === 5) {
          batYarnBall();
        }
        if (idleAnimationFrame > 9) {
          cleanupToy();
          resetIdleAnimation();
        }
        break;
      case "butterfly":
        // Cat watches the butterfly, alternating alert and idle
        if (idleAnimationFrame % 6 < 3) {
          setSprite("alert", 0);
        } else {
          setSprite("idle", 0);
        }
        // Occasionally the cat swipes
        if (idleAnimationFrame === 20 || idleAnimationFrame === 40) {
          setSprite("scratchSelf", idleAnimationFrame);
        }
        if (idleAnimationFrame > 50) {
          cleanupToy();
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;

    // --- Greeting stretch on first load ---
    if (isGreeting) {
      if (greetingFrame < 8) {
        setSprite("tired", 0);      // Stretching/yawning
      } else if (greetingFrame < 14) {
        setSprite("alert", 0);      // Perking up, looking around
      } else {
        isGreeting = false;         // Done — enter normal loop
      }
      greetingFrame += 1;
      return;
    }

    // --- Determine target position (scared or normal) ---
    let targetX = mousePosX;
    let targetY = mousePosY;
    if (isScared) {
      targetX = scarePosX;
      targetY = scarePosY;
    }

    const diffX = nekoPosX - targetX;
    const diffY = nekoPosY - targetY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    // Cat is moving — cleanup toys and hanging
    cleanupToy();
    stopHanging();
    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction;
    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    // Hold each side-view stride for two ticks without slowing cursor tracking.
    const strideFrame = /[EW]/.test(direction) ? Math.floor(frameCount / 2) : frameCount;
    setSprite(direction, strideFrame);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;

    // --- Pawprint trail (two alternating lines) ---
    pawprintCounter += 1;
    if (pawprintCounter % 3 === 0) {
      // Clockwise angle from north (screen coords), matches CSS rotate() directly
      const moveAngle = Math.atan2(-diffX, diffY);
      const angleDeg = moveAngle * 180 / Math.PI;
      // Perpendicular offset for left/right paw (6px apart)
      // Movement direction in screen coords
      const mdx = -diffX / distance;
      const mdy = -diffY / distance;
      // Perpendicular (rotate 90°): (-mdy, mdx)
      const side = pawLeft ? 1 : -1;
      spawnPawprint(nekoPosX + (-mdy) * 12 * side, nekoPosY + mdx * 12 * side, angleDeg);
      pawLeft = !pawLeft;
    }
  }

  init();
})();
