import type { Component, Snippet } from "svelte";

export type LayoutDefinition = {
  theme: Component<{children: Snippet<[]>}>;
};
