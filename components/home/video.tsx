import React from "react";
import Video from "next-video";

interface HomeVideoProps {
  // on ne précise pas explicitement le type Asset, juste string (TS s’en débrouille)
  src: any; 
}

export default function HomeVideo({ src }: HomeVideoProps) {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden">
      <Video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
