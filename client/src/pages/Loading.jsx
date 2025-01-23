import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LoadingAnimation = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    // GSAP animation
    const tl = gsap.timeline({ repeat: -1,delay:0.1 }); // Infinite loop
    tl.to(boxRef.current, { x: -30, y: 0, duration: 0.5, ease:"bounce.out" }) // Point A
      .to(boxRef.current, { x: 0, y: 30, duration: 0.5, ease:"bounce.out"  })  // Point B
      .to(boxRef.current, { x: 30, y: 0, duration: 0.5, ease:"bounce.out"  })  // Point C
      .to(boxRef.current, { x: 0, y: 30, duration: 0.5, ease:"bounce.out"  })  // Back to B
      .to(boxRef.current, { x: -30, y: 0, duration: 0.5, ease:"bounce.out"  }); // Back to A
  }, []);

  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: "white",
        borderRadius: "50%",
        position: "absolute",
      }}
      ref={boxRef}
    ></div>
  );
};

export default LoadingAnimation;
