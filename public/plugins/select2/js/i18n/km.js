/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/km', [], () => ({
    errorLoading() {
      return 'មិនអាចទាញយកទិន្នន័យ';
    },
    inputTooLong(e) {
      let t = e.input.length - e.maximum,
        n = `សូមលុបចេញ  ${t} អក្សរ`;
      return n;
    },
    inputTooShort(e) {
      let t = e.minimum - e.input.length,
        n = `សូមបញ្ចូល${t} អក្សរ រឺ ច្រើនជាងនេះ`;
      return n;
    },
    loadingMore() {
      return 'កំពុងទាញយកទិន្នន័យបន្ថែម...';
    },
    maximumSelected(e) {
      const t = `អ្នកអាចជ្រើសរើសបានតែ ${e.maximum} ជម្រើសប៉ុណ្ណោះ`;
      return t;
    },
    noResults() {
      return 'មិនមានលទ្ធផល';
    },
    searching() {
      return 'កំពុងស្វែងរក...';
    },
  })), { define: e.define, require: e.require };
})();
