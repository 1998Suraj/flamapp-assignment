import React, { useState, useRef, useEffect } from "react";
import "./BottomSheet.css";

const BottomSheet = () => {
  const [sheetState, setSheetState] = useState("closed");
  const [sheetY, setSheetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const sheetRef = useRef(null);

  useEffect(() => {
    const handleDocumentMouseMove = (e) => {
      if (isDragging) {
        const deltaY = e.clientY - dragStartY;
        setSheetY((prevY) => prevY + deltaY);
        setDragStartY(e.clientY);
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleDocumentMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartY(e.clientY);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      snapToClosestSnapPoint();
    }
  };

  const snapToClosestSnapPoint = () => {
    let nearestSnapPoint = "closed";
    if (sheetY < -30 && sheetY > -70) {
      nearestSnapPoint = "half-open";
    } else if (sheetY <= -70) {
      nearestSnapPoint = "fully-open";
    }
    setSheetState(nearestSnapPoint);
    springAnimate(getSnapPointPosition(nearestSnapPoint));
  };

  const springAnimate = (targetY) => {
    const springStrength = 0.1;
    const springDamping = 0.8;
    let currentY = sheetY;

    const animate = () => {
      const deltaY = targetY - currentY;
      const acceleration = deltaY * springStrength;
      const velocity = acceleration;

      currentY += velocity;
      setSheetY(currentY);

      if (Math.abs(velocity) > 0.1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const getSnapPointPosition = (snapPoint) => {
    switch (snapPoint) {
      case "closed":
        return 0; 
      case "half-open":
        return -50;
      case "fully-open":
        return -80; 
      default:
        return 0;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleSheet();
    } else if (e.key === "Escape") {
      setSheetState("closed");
    }
  };

  const toggleSheet = () => {
    if (sheetState === "closed") {
      setSheetState("half-open");
      setSheetY(-50);
    } else if (sheetState === "half-open") {
      setSheetState("fully-open");
      setSheetY(-80);
    } else {
      setSheetState("closed");
      setSheetY(0);
    }
  };

  return (
    <div
      className={`bottom-sheet ${sheetState}`}
      ref={sheetRef}
      tabIndex="0"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
    >
      <div className="handle" onClick={toggleSheet} tabIndex="-1">
        Drag to Adjust (Click to toggle)
      </div>

      <div className="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. Donec
          et odio pellentesque diam. Feugiat nisl pretium fusce id velit ut
          tortor pretium. Faucibus turpis in eu mi bibendum neque egestas congue
          quisque. Ut aliquam purus sit amet. Integer quis auctor elit sed.
          Venenatis tellus in metus vulputate eu scelerisque felis imperdiet
          proin. Convallis convallis tellus id interdum velit. Elementum
          facilisis leo vel fringilla. Pellentesque habitant morbi tristique
          senectus et netus et. Faucibus scelerisque eleifend donec pretium
          vulputate. Et netus et malesuada fames ac turpis egestas sed. Egestas
          fringilla phasellus faucibus scelerisque eleifend donec pretium. Est
          lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque.
          Faucibus ornare suspendisse sed nisi lacus sed viverra. Porta non
          pulvinar neque laoreet. Et malesuada fames ac turpis egestas. Habitant
          morbi tristique senectus et netus et malesuada fames. Purus non enim
          praesent elementum facilisis leo vel fringilla est. Fringilla
          phasellus faucibus scelerisque eleifend. Orci dapibus ultrices in
          iaculis nunc sed augue lacus viverra. Enim facilisis gravida neque
          convallis a. Laoreet sit amet cursus sit amet. Odio ut sem nulla
          pharetra diam sit amet nisl. Ultrices in iaculis nunc sed augue. Eget
          nunc lobortis mattis aliquam faucibus purus in massa. Enim diam
          vulputate ut pharetra sit. Massa vitae tortor condimentum lacinia.
          Tempor id eu nisl nunc mi ipsum faucibus vitae. Cursus vitae congue
          mauris rhoncus aenean vel. Ultrices in iaculis nunc sed. Platea
          dictumst quisque sagittis purus sit. Urna condimentum mattis
          pellentesque id nibh tortor id aliquet. In nisl nisi scelerisque eu
          ultrices. Nunc lobortis mattis aliquam faucibus purus. Cum sociis
          natoque penatibus et magnis dis parturient montes. Ut aliquam purus
          sit amet. Velit dignissim sodales ut eu sem integer. Eget nunc
          lobortis mattis aliquam faucibus purus in. Id leo in vitae turpis.
          Turpis egestas maecenas pharetra convallis posuere morbi. Et pharetra
          pharetra massa massa ultricies. Ipsum dolor sit amet consectetur.
          Ultricies mi eget mauris pharetra. Nec tincidunt praesent semper
          feugiat nibh sed pulvinar proin gravida. Amet volutpat consequat
          mauris nunc congue nisi. Hendrerit gravida rutrum quisque non tellus
          orci ac auctor. Enim nunc faucibus a pellentesque sit. Lobortis
          elementum nibh tellus molestie nunc. Tortor id aliquet lectus proin
          nibh nisl condimentum id. Orci ac auctor augue mauris. Sagittis purus
          sit amet volutpat consequat mauris nunc congue nisi. Tortor vitae
          purus faucibus ornare suspendisse sed. Posuere morbi leo urna molestie
          at elementum eu facilisis sed. Ullamcorper a lacus vestibulum sed arcu
          non. Habitasse platea dictumst vestibulum rhoncus est pellentesque
          elit ullamcorper. Sed risus pretium quam vulputate dignissim
          suspendisse. Et sollicitudin ac orci phasellus. Ut enim blandit
          volutpat maecenas volutpat blandit. Ut venenatis tellus in metus.
          Cursus risus at ultrices mi tempus imperdiet nulla. Malesuada bibendum
          arcu vitae elementum curabitur vitae nunc sed velit. Fermentum leo vel
          orci porta non pulvinar neque laoreet suspendisse. Mauris rhoncus
          aenean vel elit scelerisque. Et magnis dis parturient montes nascetur
          ridiculus mus mauris. Neque gravida in fermentum et. Etiam erat velit
          scelerisque in dictum non consectetur a erat. Diam sollicitudin tempor
          id eu nisl nunc mi ipsum faucibus. Odio facilisis mauris sit amet
          massa. Habitasse platea dictumst quisque sagittis. Elementum nibh
          tellus molestie nunc non blandit massa enim. Sit amet mattis vulputate
          enim nulla. Cursus eget nunc scelerisque viverra mauris. Natoque
          penatibus et magnis dis. Nunc congue nisi vitae suscipit tellus mauris
          a. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt.
          Ac odio tempor orci dapibus ultrices in. Nibh sit amet commodo nulla
          facilisi nullam vehicula ipsum a. Mauris ultrices eros in cursus.
          Placerat duis ultricies lacus sed turpis tincidunt id. Id donec
          ultrices tincidunt arcu non sodales neque sodales. Sed adipiscing diam
          donec adipiscing tristique. Neque sodales ut etiam sit amet. Viverra
          nam libero justo laoreet sit amet cursus sit amet. Senectus et netus
          et malesuada fames ac turpis. Egestas maecenas pharetra convallis
          posuere morbi leo urna molestie at. Aenean sed adipiscing diam donec
          adipiscing. Etiam dignissim diam quis enim. Lorem donec massa sapien
          faucibus et molestie. Lacinia quis vel eros donec ac odio. Nec
          ullamcorper sit amet risus nullam eget. Vitae proin sagittis nisl
          rhoncus mattis rhoncus urna neque viverra. Nunc mi ipsum faucibus
          vitae aliquet nec ullamcorper. In ornare quam viverra orci sagittis.
          Suscipit adipiscing bibendum est ultricies integer quis auctor elit.
          Non consectetur a erat nam at lectus urna duis. Nunc lobortis mattis
          aliquam faucibus purus in massa tempor. Diam donec adipiscing
          tristique risus nec feugiat in fermentum posuere. Quam lacus
          suspendisse faucibus interdum posuere lorem. Bibendum ut tristique et
          egestas quis. Lacinia at quis risus sed. Nunc faucibus a pellentesque
          sit.
        </p>
      </div>
    </div>
  );
};

export default BottomSheet;
