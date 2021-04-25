// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

// draw some text
doc.fontSize(25).text('Daniel Kasem',{align:'center'});
doc.fontSize(25).text('Daniel Kasem',{align:'justify'});

doc.fontSize(14).text('Lattakia,Datour');
doc.registerFont('Fontawesome', 'fonts/fontawesome-solid-900.ttf')

doc.font('Fontawesome')
  .fontSize(20)
  .text('', 10, 10);

doc.fontSize(14).text('0931869085');

doc.fontSize(14).text('k1999daniel@gmail.com');
doc.moveDown()

//education
doc.fontSize(20).text('Education');
doc.fontSize(12).text('2016-2021 Tishreen Unviersity Software Engineer');
doc.fontSize(12).text('2016-2021 Tishreen Unviersity Software Engineer');
doc.fontSize(12).text('2016-2021 Tishreen Unviersity Software Engineer');
doc.fontSize(12).text('2016-2021 Tishreen Unviersity Software Engineer');
doc.fontSize(12).text('2016-2021 Tishreen Unviersity Software Engineer');

doc.moveDown()


//work experience
doc.fontSize(20).text('Work Experience');
doc.fontSize(12).text('2016-2019 Spectrum |Senior Manager')

//skills
doc.moveDown()
doc.fontSize(20).text('Skills');
doc.fontSize(15)
doc.list(['daniel','Ducjsa','hurrah','loser'])

doc.moveDown()



// end and display the document in the iframe to the right
doc.end();
stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});
