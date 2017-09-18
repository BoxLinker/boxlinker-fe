/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/fr', [], () => ({
    errorLoading() {
      return 'Les résultats ne peuvent pas être chargés.';
    },
    inputTooLong(e) {
      let t = e.input.length - e.maximum,
        n = `Supprimez ${t} caractère`;
      return t !== 1 && (n += 's'), n;
    },
    inputTooShort(e) {
      let t = e.minimum - e.input.length,
        n = `Saisissez ${t} caractère`;
      return t !== 1 && (n += 's'), n;
    },
    loadingMore() {
      return 'Chargement de résultats supplémentaires…';
    },
    maximumSelected(e) {
      let t = `Vous pouvez seulement sélectionner ${e.maximum} élément`;
      return e.maximum !== 1 && (t += 's'), t;
    },
    noResults() {
      return 'Aucun résultat trouvé';
    },
    searching() {
      return 'Recherche en cours…';
    },
  })), { define: e.define, require: e.require };
})();
