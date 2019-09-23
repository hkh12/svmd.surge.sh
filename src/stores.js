// eslint-disable-next-line import/no-extraneous-dependencies
import { writable, derived } from 'svelte/store';

export const windowWidth = writable(window.innerWidth);
export const isMobile = derived(windowWidth, width => width < 720);
