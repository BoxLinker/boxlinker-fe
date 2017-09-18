/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/tr', [], () => ({
    inputTooLong(e) {
      let t = e.input.length - e.maximum,
        n = `${t} karakter daha girmelisiniz`;
      return n;
    },
    inputTooShort(e) {
      let t = e.minimum - e.input.length,
        n = `En az ${t} karakter daha girmelisiniz`;
      return n;
    },
    loadingMore() {
      return 'Daha fazla…';
    },
    maximumSelected(e) {
      const t = `Sadece ${e.maximum} seçim yapabilirsiniz`;
      return t;
    },
    noResults() {
      return 'Sonuç bulunamadı';
    },
    searching() {
      return 'Aranıyor…';
    },
  })), { define: e.define, require: e.require };
})();
