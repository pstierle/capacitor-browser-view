#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(CapacitorBrowserViewPlugin, "CapacitorBrowserView",
            CAP_PLUGIN_METHOD(open, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(close, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(loadUrl, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(show, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(hide, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(updateDimensions, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(getSnapshot, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(evaluateJavaScript, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(goBack, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(goForward, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(reload, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(handleNavigationEvent, CAPPluginReturnPromise);
)
