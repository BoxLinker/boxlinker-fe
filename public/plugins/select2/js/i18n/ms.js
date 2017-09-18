/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/ms', [], () => ({
    errorLoading() {
      return 'Keputusan tidak berjaya dimuatkan.';
    },
    inputTooLong(e) {
      const t = e.input.length - e.maximum;
      return `Sila hapuskan ${t} aksara`;
    },
    inputTooShort(e) {
      const t = e.minimum - e.input.length;
      return `Sila masukkan ${t} atau lebih aksara`;
    },
    loadingMore() {
      return 'Sedang memuatkan keputusan…';
    },
    maximumSelected(e) {
      return `Anda hanya boleh memilih ${e.maximum} pilihan`;
    },
    noResults() {
      return 'Tiada padanan yang ditemui';
    },
    searching() {
      return 'Mencari…';
    },
  })), { define: e.define, require: e.require };
})();
