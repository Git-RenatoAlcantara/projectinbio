// Grab the Mixpanel factory
import Mixpanel from "mixpanel";

// Create an instance of the mixpanel client
var mixpanelEvent = Mixpanel.init("5dced8f7c37afddc196d8e4e4042d522");

export function trackServerEvent(eventName: string, properties: any) {
    mixpanelEvent.track(eventName, properties)
}