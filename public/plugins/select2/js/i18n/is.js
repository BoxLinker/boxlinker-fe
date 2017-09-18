/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/is', [], () => ({
    inputTooLong(e) {
      let t = e.input.length - e.maximum,
        n = `Vinsamlegast styttið texta um ${t} staf`;
      return t <= 1 ? n : `${n}i`;
    },
    inputTooShort(e) {
      let t = e.minimum - e.input.length,
        n = `Vinsamlegast skrifið ${t} staf`;
      return t > 1 && (n += 'i'), (n += ' í viðbót'), n;
    },
    loadingMore() {
      return 'Sæki fleiri niðurstöður…';
    },
    maximumSelected(e) {
      return `Þú getur aðeins valið ${e.maximum} atriði`;
    },
    noResults() {
      return 'Ekkert fannst';
    },
    searching() {
      return 'Leita…';
    },
  })), { define: e.define, require: e.require };
})();
