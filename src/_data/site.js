// Version du site du Comité (à incrémenter à chaque modification du code)
// + date/heure de la dernière publication, calculée automatiquement par Netlify à chaque mise en ligne
const now = new Date();
const opt = { timeZone: "Europe/Paris" };
module.exports = {
  version: "v2.0",
  majDate: now.toLocaleDateString("fr-FR", { ...opt, day: "2-digit", month: "2-digit", year: "numeric" }),
  majHeure: now.toLocaleTimeString("fr-FR", { ...opt, hour: "2-digit", minute: "2-digit" }).replace(":", "h"),
};
