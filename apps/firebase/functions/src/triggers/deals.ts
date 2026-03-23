import * as functions from 'firebase-functions';
import { Deal } from '../models/Deal';

export const onDealStageChanged = functions.firestore
  .document('deals/{dealId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data() as Deal;
    const after = change.after.data() as Deal;

    // Detect stage change
    if (before.stage !== after.stage) {
      functions.logger.info(`Deal ${context.params.dealId} changed stage from ${before.stage} to ${after.stage}`);
      // Future logic: Send notification, update lead score, etc.
    }

    return null;
  });
