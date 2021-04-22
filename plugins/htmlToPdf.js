import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';

export default {
  install(Vue, options) {
    Vue.prototype.getPdf = function (title, isShowPreviewFullTime) {
      const doc = new JsPDF();
      doc.text(23, 81, 'name');
      doc.text(23, 122, 'company');
      doc.text(23, 162, 'department');
      doc.text(23, 202, 'title');
      doc.save('ss.pdf')


      /** WITH CSS */
      // var canvasElement = document.createElement('canvas');
      // html2Canvas(this.$refs.content, { canvas: canvasElement }).then(function (canvas) {
      //   const img = canvas.toDataURL("image/jpeg", 1);
      //   doc.addImage(img,'JPEG',20,20);
      //   doc.save("sample.pdf");
      // });

      // html2Canvas(document.querySelector('#pdfDom'), {
      //   allowTaint: false,
      //   useCORS: true,
      //   x: 450,
      //   y: 30
      // }).then(function (canvas) {
      //     let pageWidth = 595.28
      //     let pageHeight = canvas.height / (canvas.width / 592.28)
      //     let pageData = canvas.toDataURL('image/jpeg', 1.0)
      //     let PDF = new JsPDF('', 'pt', [pageWidth, pageHeight])
      //     PDF.addImage(pageData, 'JPEG', 0, 0, pageWidth, pageHeight)
      //     PDF.save(title + '.pdf')
      //   }
      // )
    }
  }
}
