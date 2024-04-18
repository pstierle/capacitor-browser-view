import type { PluginListenerHandle } from '@capacitor/core';

export interface CapacitorBrowserViewPlugin {
  open(options: OpenOptions): Promise<void>;
  close(): Promise<void>;
  loadUrl(options: { url: string }): Promise<void>;
  handleNavigationEvent(options: { allow: boolean }): Promise<void>;
  goBack(): Promise<void>;
  goForward(): Promise<void>;
  reload(): Promise<void>;
  updateDimensions(options: Dimensions): Promise<void>;
  addListener(
    eventName:
      | 'pageLoaded'
      | 'updateSnapshot'
      | 'progress'
      | 'navigationHandler',
    listenerFunc: (...args: any[]) => void,
  ): Promise<PluginListenerHandle>;
}

export interface OpenOptions extends Dimensions {
  url: string;
  script?: {
    javascript: string;
    injectionTime?: ScriptInjectionTime;
  };
  element: HTMLElement;
  userAgent?: string;
}

export interface Dimensions {
  width: number;
  height: number;
  x: number;
  y: number;
}

export enum ScriptInjectionTime {
  atDocumentStart,
  atDocumentEnd,
}

