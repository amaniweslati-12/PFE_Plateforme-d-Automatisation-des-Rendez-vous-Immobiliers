/**
 * script: calculateVacancies.js
 * Rôle : Calcule les créneaux libres de 30 minutes entre les événements Google Calendar.
 * Utilisé dans un Node "Code" n8n.
 */

// Exemple de données d'entrée (événements récupérés de Google Calendar)
// const events = items[0].json.events; 

function calculateFreeSlots(events, workStart = "09:00", workEnd = "18:00", slotDurationMin = 30) {
    const slots = [];
    const today = new Date().toISOString().split('T')[0];

    let currentTime = new Date(`${today}T${workStart}:00`);
    const endTime = new Date(`${today}T${workEnd}:00`);

    // Trier les événements par heure de début
    const sortedEvents = events
        .map(e => ({
            start: new Date(e.start.dateTime || e.start.date),
            end: new Date(e.end.dateTime || e.end.date)
        }))
        .sort((a, b) => a.start - b.start);

    while (currentTime.getTime() + slotDurationMin * 60000 <= endTime.getTime()) {
        const slotEnd = new Date(currentTime.getTime() + slotDurationMin * 60000);

        // Vérifier si le créneau chevauche un événement existant
        const isConflict = sortedEvents.some(event => {
            return (currentTime < event.end && slotEnd > event.start);
        });

        if (!isConflict) {
            slots.push({
                start: currentTime.toISOString(),
                end: slotEnd.toISOString(),
                label: currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            });
        }

        // Avancer au prochain créneau
        currentTime = slotEnd;
    }

    return slots;
}

// Pour n8n, on retournerait :
// return [{ json: { freeSlots: calculateFreeSlots(events) } }];

// Export simple pour tests locaux si besoin
if (typeof module !== 'undefined') {
    module.exports = calculateFreeSlots;
}
