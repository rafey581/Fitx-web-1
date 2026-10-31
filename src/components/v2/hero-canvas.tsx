"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

/** Without WebGL the hero simply stays a clean typographic layout. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroCanvas() {
  return (
    <div className="home-hero-canvas" aria-hidden="true">
      <SceneBoundary>
        <HeroScene />
      </SceneBoundary>
    </div>
  );
}
