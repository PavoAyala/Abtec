"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityType =
	exports.TicketStatus =
	exports.TicketPriority =
	exports.DealStage =
		void 0;
var DealStage;
(function (DealStage) {
	DealStage["Lead"] = "Lead";
	DealStage["Proposal"] = "Proposal";
	DealStage["Negotiation"] = "Negotiation";
	DealStage["Won"] = "Won";
	DealStage["Lost"] = "Lost";
})((DealStage = exports.DealStage || (exports.DealStage = {})));
var TicketPriority;
(function (TicketPriority) {
	TicketPriority["Low"] = "Low";
	TicketPriority["Medium"] = "Medium";
	TicketPriority["High"] = "High";
	TicketPriority["Critical"] = "Critical";
})((TicketPriority = exports.TicketPriority || (exports.TicketPriority = {})));
var TicketStatus;
(function (TicketStatus) {
	TicketStatus["Open"] = "Open";
	TicketStatus["InProgress"] = "InProgress";
	TicketStatus["Resolved"] = "Resolved";
	TicketStatus["Closed"] = "Closed";
})((TicketStatus = exports.TicketStatus || (exports.TicketStatus = {})));
var ActivityType;
(function (ActivityType) {
	ActivityType["Call"] = "Call";
	ActivityType["Email"] = "Email";
	ActivityType["Meeting"] = "Meeting";
	ActivityType["Note"] = "Note";
	ActivityType["Task"] = "Task";
})((ActivityType = exports.ActivityType || (exports.ActivityType = {})));
//# sourceMappingURL=types.js.map
