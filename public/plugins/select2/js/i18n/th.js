/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/th', [], () => ({
    inputTooLong(e) {
      let t = e.input.length - e.maximum,
        n = `โปรดลบออก ${t} ตัวอักษร`;
      return n;
    },
    inputTooShort(e) {
      let t = e.minimum - e.input.length,
        n = `โปรดพิมพ์เพิ่มอีก ${t} ตัวอักษร`;
      return n;
    },
    loadingMore() {
      return 'กำลังค้นข้อมูลเพิ่ม…';
    },
    maximumSelected(e) {
      const t = `คุณสามารถเลือกได้ไม่เกิน ${e.maximum} รายการ`;
      return t;
    },
    noResults() {
      return 'ไม่พบข้อมูล';
    },
    searching() {
      return 'กำลังค้นข้อมูล…';
    },
  })), { define: e.define, require: e.require };
})();
