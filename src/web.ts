import type { PluginListenerHandle } from '@capacitor/core';
import { WebPlugin, registerPlugin } from '@capacitor/core';
import ResizeObserver from 'resize-observer-polyfill';

import type { Dimensions, OpenOptions } from './definitions';
import { CapacitorBrowserViewPlugin, ScriptInjectionTime } from './definitions';

const CapacitorBrowserViewPlugin = registerPlugin<CapacitorBrowserViewPlugin>(
  'CapacitorBrowserViewPlugin',
);

class CapacitorBrowserViewWeb
  extends WebPlugin
  implements CapacitorBrowserViewPlugin
{
  public element?: HTMLElement;
  public pageLoadedEvent?: PluginListenerHandle;
  public progressEvent?: PluginListenerHandle;
  public navigationHandlerEvent?: PluginListenerHandle;
  public resizeObserver?: ResizeObserver;

  public async open(options: OpenOptions): Promise<void>{
    this.element = options.element;

    if (this.element?.style) {
      this.element.style.backgroundSize = 'cover';
      this.element.style.backgroundRepeat = 'no-repeat';
      this.element.style.backgroundPosition = 'center';
    }
    const boundingBox = this.element.getBoundingClientRect() as DOMRect;

    this.resizeObserver = new ResizeObserver(entries => {
      for (const _entry of entries) {
        const boundingBox = options.element.getBoundingClientRect() as DOMRect;
        CapacitorBrowserViewPlugin.updateDimensions({
          width: Math.round(boundingBox.width),
          height: Math.round(boundingBox.height),
          x: Math.round(boundingBox.x),
          y: Math.round(boundingBox.y),
        });
      }
    });
    this.resizeObserver.observe(this.element);

    return CapacitorBrowserViewPlugin.open({
      url: options.url,
      script: {
        javascript: options.script?.javascript ? options.script.javascript : '',
        injectionTime: options.script?.injectionTime ?  options.script?.injectionTime : ScriptInjectionTime.atDocumentEnd
      },
      userAgent: options.userAgent ? options.userAgent : '',
      element: options.element,
      width: Math.round(boundingBox.width),
      height: Math.round(boundingBox.height),
      x: Math.round(boundingBox.x),
      y: Math.round(boundingBox.y),
    });
  }
  public async close(): Promise<void>{
    this.element = undefined;
    if(this.resizeObserver){
      this.resizeObserver.disconnect();
    }
    if (this.pageLoadedEvent) {
      this.pageLoadedEvent.remove();
    }
    if (this.progressEvent) {
      this.progressEvent.remove();
    }
    if (this.navigationHandlerEvent) {
      this.navigationHandlerEvent.remove();
    }
    return CapacitorBrowserViewPlugin.close();
  }
  public async loadUrl(options: { url: string }): Promise<void>{
    return CapacitorBrowserViewPlugin.loadUrl({ url: options.url });
  }
  public async handleNavigation(
    listenerFunc: (event: {
      url: string;
      newWindow: boolean;
      sameHost: boolean;
      complete: (allow: boolean) => void;
    }) => void,
  ) {
    this.navigationHandlerEvent = await CapacitorBrowserViewPlugin.addListener(
      'navigationHandler',
      (event: any) => {
        const complete = (allow: boolean) => {
          CapacitorBrowserViewPlugin.handleNavigationEvent({ allow });
        };
        listenerFunc({ ...event, complete });
      },
    );
  }
  public async handleNavigationEvent(options: { allow: boolean }): Promise<void>{
    return CapacitorBrowserViewPlugin.handleNavigationEvent(options);
  }
  public async goBack(): Promise<void>{
    CapacitorBrowserViewPlugin.goBack();
  }
  public async goForward(): Promise<void>{
    CapacitorBrowserViewPlugin.goBack();
  }
  public async reload(): Promise<void>{
    CapacitorBrowserViewPlugin.goBack();
  }
  public async updateDimensions(options: Dimensions): Promise<void>{
    CapacitorBrowserViewPlugin.updateDimensions(options);
  }

  public async onPageLoaded(listenerFunc: () => void): Promise<void> {
    this.pageLoadedEvent = await CapacitorBrowserViewPlugin.addListener(
      'pageLoaded',
      listenerFunc,
    );
  }
}

export const CapacitorBrowserView = new CapacitorBrowserViewWeb();
