import React from "react";
import LinksGrid from "../link/LinksGrid";
import LinkPreview from "../link/LinkPreview";

export default function Home() {
  
  return (
    <div className="container">
      <div className="py-4">
        <LinksGrid/>
        <LinkPreview/>
      </div>
    </div>
  )
}