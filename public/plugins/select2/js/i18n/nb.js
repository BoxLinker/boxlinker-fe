/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/nb', [], () => ({
    errorLoading() {
      return 'Kunne ikke hente resultater.';
    },
    inputTooLong(e) {
      const t = e.input.length - e.maximum;
      return `Vennligst fjern ${t} tegn`;
    },
    inputTooShort(e) {
      let t = e.minimum - e.input.length,
        n = 'Vennligst skriv inn ';
      return t > 1 ? (n += ' flere tegn') : (n += ' tegn til'), n;
    },
    loadingMore() {
      return 'Laster flere resultater…';
    },
    maximumSelected(e) {
      return `Du kan velge maks ${e.maximum} elementer`;
    },
    noResults() {
      return 'Ingen treff';
    },
    searching() {
      return 'Søker…';
    },
  })), { define: e.define, require: e.require };
})();
