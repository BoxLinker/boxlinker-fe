/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/ar', [], () => ({
    errorLoading() {
      return 'لا يمكن تحميل النتائج';
    },
    inputTooLong(e) {
      let t = e.input.length - e.maximum,
        n = `الرجاء حذف ${t} عناصر`;
      return n;
    },
    inputTooShort(e) {
      let t = e.minimum - e.input.length,
        n = `الرجاء إضافة ${t} عناصر`;
      return n;
    },
    loadingMore() {
      return 'جاري تحميل نتائج إضافية...';
    },
    maximumSelected(e) {
      const t = `تستطيع إختيار ${e.maximum} بنود فقط`;
      return t;
    },
    noResults() {
      return 'لم يتم العثور على أي نتائج';
    },
    searching() {
      return 'جاري البحث…';
    },
  })), { define: e.define, require: e.require };
})();
