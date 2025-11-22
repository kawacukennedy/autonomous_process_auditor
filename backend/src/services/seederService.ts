import fs from 'fs';
import path from 'path';
import Event from '../models/Event';
import Job from '../models/Job';
import Finding from '../models/Finding';

export const seedDemoData = async () => {
  const eventsPath = path.join(__dirname, '../../demo-data/sample-events.json');
  const events = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));

  for (const event of events) {
    const existing = await Event.findOne({ id: event.id });
    if (!existing) {
      await Event.create(event);
    }
  }

  console.log('Demo data seeded');
};