import * as Mixpanel from "mixpanel";
import config from "../config";
import { EventTypes } from "../types/events";
import logger = require("./logger");

const mixpanel = Mixpanel.init(config.mixpanel.projectToken);

export async function trackEvent(
  eventName: string,
  userId: number,
  properties?: { [keys: string]: any }
): Promise<void> {
  logger.debug(`Logging ${eventName} to MixPanel.`);
  if (!Object.values(EventTypes).includes(eventName as EventTypes)) {
    logger.error(`${eventName} is not an allowed event Type.`);
    return;
  }

  try {
    mixpanel.track(eventName, {
      distinct_id: `${userId}`,
      ...properties,
    });
  } catch (err) {
    logger.error(`Unable to trigger event ${eventName}`);
    logger.error(err);
    return;
  }
}

export async function setUserProperties(
  userId: number,
  properties?: { [keys: string]: any }
): Promise<void> {
  logger.debug(`Updating User ${userId} on MixPanel.`);

  const { name, createdAt, ...cleanProperties } = properties;
  const firstname = name?.split(" ")[0];
  const last_name = name?.split(" ")[1];

  try {
    mixpanel.people.set(`${userId}`, {
      ...(firstname && { $first_name: firstname }),
      ...(last_name && { $last_name: last_name }),
      ...(createdAt && { $created: new Date(createdAt).toISOString() }),
      ...cleanProperties,
    });
  } catch (err) {
    logger.error(`Unable to update user ${userId}`);
    logger.error(err);
    return;
  }
}
export async function incrementUserProperties() {}

export async function setGroupProperties() {}
export async function incrementGroupProperties() {}
