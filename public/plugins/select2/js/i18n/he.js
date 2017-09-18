/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/he', [], () => ({
    errorLoading() {
      return 'שגיאה בטעינת התוצאות';
    },
    inputTooLong(e) {
      let t = e.input.length - e.maximum,
        n = 'נא למחוק ';
      return t === 1 ? (n += 'תו אחד') : (n += `${t} תווים`), n;
    },
    inputTooShort(e) {
      let t = e.minimum - e.input.length,
        n = 'נא להכניס ';
      return t === 1 ? (n += 'תו אחד') : (n += `${t} תווים`), (n +=
        ' או יותר'), n;
    },
    loadingMore() {
      return 'טוען תוצאות נוספות…';
    },
    maximumSelected(e) {
      let t = 'באפשרותך לבחור עד ';
      return e.maximum === 1
        ? (t += 'פריט אחד')
        : (t += `${e.maximum} פריטים`), t;
    },
    noResults() {
      return 'לא נמצאו תוצאות';
    },
    searching() {
      return 'מחפש…';
    },
  })), { define: e.define, require: e.require };
})();
