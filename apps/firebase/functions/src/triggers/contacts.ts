import * as functions from 'firebase-functions';
import { Contact } from '../models/Contact';

export const onContactCreated = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snap, context) => {
    const contact = snap.data() as Contact;
    
    // Auto-assign owner and setup logic here.
    const updates: Partial<Contact> = {};

    if (!contact.ownerId) {
      // Logic for round-robin assigning or default owner
      updates.ownerId = 'unassigned';
    }

    if (!contact.leadScore) {
      updates.leadScore = 10; // default initial score
    }

    if (Object.keys(updates).length > 0) {
      return snap.ref.update(updates);
    }

    return null;
  });
