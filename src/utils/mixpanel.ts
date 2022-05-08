import * as Mixpanel from "mixpanel";
import config from "../config";

// create an instance of the mixpanel client
const mixpanel = Mixpanel.init(config.mixpanel.projectToken);

export async function trackEvent() {}
export async function setUserProperties() {}
export async function incrementUserProperties() {}
