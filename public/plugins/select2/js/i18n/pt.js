/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function() {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
    var e = jQuery.fn.select2.amd;
  return e.define('select2/i18n/pt', [], () => ({
    errorLoading() {
      return 'Os resultados não puderam ser carregados.';
    },
    inputTooLong(e) {
      let t = e.input.length - e.maximum,
        n = `Por favor apague ${t} `;
      return (n += t != 1 ? 'caracteres' : 'carácter'), n;
    },
    inputTooShort(e) {
      let t = e.minimum - e.input.length,
        n = `Introduza ${t} ou mais caracteres`;
      return n;
    },
    loadingMore() {
      return 'A carregar mais resultados…';
    },
    maximumSelected(e) {
      let t = `Apenas pode seleccionar ${e.maximum} `;
      return (t += e.maximum != 1 ? 'itens' : 'item'), t;
    },
    noResults() {
      return 'Sem resultados';
    },
    searching() {
      return 'A procurar…';
    },
  })), { define: e.define, require: e.require };
})();
