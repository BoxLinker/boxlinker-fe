/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/fa', [], () => ({
    errorLoading() {
      return 'امکان بارگذاری نتایج وجود ندارد.';
    },
    inputTooLong(e) {
      let t = e.input.length - e.maximum,
        n = `لطفاً ${t} کاراکتر را حذف نمایید`;
      return n;
    },
    inputTooShort(e) {
      let t = e.minimum - e.input.length,
        n = `لطفاً تعداد ${t} کاراکتر یا بیشتر وارد نمایید`;
      return n;
    },
    loadingMore() {
      return 'در حال بارگذاری نتایج بیشتر...';
    },
    maximumSelected(e) {
      const t = `شما تنها می‌توانید ${e.maximum} آیتم را انتخاب نمایید`;
      return t;
    },
    noResults() {
      return 'هیچ نتیجه‌ای یافت نشد';
    },
    searching() {
      return 'در حال جستجو...';
    },
  })), { define: e.define, require: e.require };
})();
