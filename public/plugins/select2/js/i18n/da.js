/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/da', [], () => ({
    errorLoading() {
      return 'Resultaterne kunne ikke indlæses.';
    },
    inputTooLong(e) {
      let t = e.input.length - e.maximum,
        n = `Angiv venligst ${t} tegn mindre`;
      return n;
    },
    inputTooShort(e) {
      let t = e.minimum - e.input.length,
        n = `Angiv venligst ${t} tegn mere`;
      return n;
    },
    loadingMore() {
      return 'Indlæser flere resultater…';
    },
    maximumSelected(e) {
      let t = `Du kan kun vælge ${e.maximum} emne`;
      return e.maximum != 1 && (t += 'r'), t;
    },
    noResults() {
      return 'Ingen resultater fundet';
    },
    searching() {
      return 'Søger…';
    },
  })), { define: e.define, require: e.require };
})();
