module.exports = function (eleventyConfig) {
  // Dossiers et fichiers déjà présents dans le dépôt (logos des clubs, photos,
  // PDF de résultats, logos du comité) : on les recopie tels quels dans le site
  // construit, sans y toucher.
  eleventyConfig.addPassthroughCopy("photos");
  eleventyConfig.addPassthroughCopy("logos");
  eleventyConfig.addPassthroughCopy("resultats");
  eleventyConfig.addPassthroughCopy("logo_cdtir66_transparent.png");
  eleventyConfig.addPassthroughCopy("logo_comite_66.jpeg");
  // Images éventuellement ajoutées depuis le panneau d'administration
  eleventyConfig.addPassthroughCopy("src/images");
  // Le panneau d'administration lui-même (sinon /admin/ renvoie une page 404)
  eleventyConfig.addPassthroughCopy("admin");

  // Date lisible en français : "19 août 2026"
  eleventyConfig.addFilter("readableDate", (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  });

  const MOIS_ABBR = ["Jan", "Fév", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];

  // Jour sur 2 chiffres pour la pastille du calendrier : "05"
  eleventyConfig.addFilter("dayNum", (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    if (isNaN(d)) return "";
    return String(d.getUTCDate()).padStart(2, "0");
  });

  // Mois abrégé en français pour la pastille du calendrier : "Avr"
  eleventyConfig.addFilter("monthAbbr", (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    if (isNaN(d)) return "";
    return MOIS_ABBR[d.getUTCMonth()];
  });

  // Classe CSS du badge selon la discipline choisie dans l'admin
  eleventyConfig.addFilter("disciplineBadgeClass", (discipline) => {
    if (!discipline) return "badge-issf";
    if (discipline.startsWith("EDT")) return "badge-edt";
    if (discipline.startsWith("TAR")) return "badge-tar";
    if (discipline.startsWith("MLAIC")) return "badge-mlaic";
    return "badge-issf";
  });

  // Convertit un objet JS en JSON prêt à être injecté dans une balise <script>
  eleventyConfig.addFilter("toJson", (obj) => JSON.stringify(obj));

  // Date de construction du site, pour griser les épreuves déjà passées
  eleventyConfig.addGlobalData("buildDate", () => new Date());

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
