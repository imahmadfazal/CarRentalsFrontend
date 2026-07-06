/**
 * generateBookingId.js
 * ---------------------
 * Produces a short, human-shareable booking reference (e.g.
 * "RH-M9X2K1-7F3A"). No backend yet, so this is purely client-side —
 * unique enough for a single session's confirmation screen, not meant
 * to be a database key.
 */
export default function generateBookingId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `RH-${timestamp}-${random}`;
}
