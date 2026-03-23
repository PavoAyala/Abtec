"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDealStageChanged = void 0;
const functions = require("firebase-functions");
exports.onDealStageChanged = functions.firestore
    .document('deals/{dealId}')
    .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    // Detect stage change
    if (before.stage !== after.stage) {
        functions.logger.info(`Deal ${context.params.dealId} changed stage from ${before.stage} to ${after.stage}`);
        // Future logic: Send notification, update lead score, etc.
    }
    return null;
});
//# sourceMappingURL=deals.js.map