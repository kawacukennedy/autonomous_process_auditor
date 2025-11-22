import Event from '../models/Event';

export class EventService {
  static async createEvent(connectorId: string, payload: object) {
    const event = new Event({
      connectorId,
      rawPayload: payload,
      normalizedPayload: payload
    });
    await event.save();
    return event;
  }

  static async getEventsByConnector(connectorId: string) {
    return await Event.find({ connectorId });
  }
}