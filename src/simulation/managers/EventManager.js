import { eventBus } from '../../core/EventBus.js';
import { GameEvents } from '../../events/EventNames.js';

export class EventManager {
    constructor({ events = [], cooldownMinutes = 30 } = {}) {
        this.events = events;
        this.cooldownMinutes = cooldownMinutes;
        this.cooldowns = new Map();
    }

    getAvailableEvents() {
        return this.events;
    }

    canTrigger(eventId, nowMinute = 0) {
        const cooldown = this.cooldowns.get(eventId) ?? 0;
        return nowMinute >= cooldown;
    }

    registerCooldown(eventId, nowMinute) {
        this.cooldowns.set(eventId, nowMinute + this.cooldownMinutes);
        return this.cooldowns.get(eventId);
    }

    emitSimulationEvent(eventName, payload = {}) {
        eventBus.emit(eventName, payload);
        return payload;
    }

    triggerEvent(eventId, nowMinute = 0) {
        const event = this.events.find((entry) => entry.id === eventId);
        if (!event) {
            return null;
        }

        if (!this.canTrigger(event.id, nowMinute)) {
            return { ok: false, reason: 'cooldown' };
        }

        this.registerCooldown(event.id, nowMinute);
        eventBus.emit(GameEvents.EventManagerTriggered, {
            eventId: event.id,
            severity: event.severity,
            payload: event.payload ?? {}
        });

        return { ok: true, event };
    }
}

export function createEventManager(options) {
    return new EventManager(options);
}
