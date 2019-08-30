/**
 * Our Dev-Engineer @dreygur is too lazy
 * So he created this one to help him generate pdf files automatically
 * and let him do some fun!
 * 
 * ==========================================
 * Modified from Default SaveAsPdf
 * 
 */

try {
	if (app.documents.length > 0 ) {
		// Get the folder to save the files into
		// var destFolder = null;
		// destFolder = Folder.selectDialog( 'Select folder for PDF files.', '~' );
		var destFolder = app.activeDocument.path;

		if (destFolder != null) {
			var options, i, sourceDoc, targetFile;	
			
			// Get the PDF options to be used
			options = this.getOptions();
			// You can tune these by changing the code in the getOptions() function.
			
			// Saves all the open documents
			for ( i = 0; i < app.documents.length; i++ ) {
				sourceDoc = app.documents[i]; // returns the document object
										
				// Get the file to save the document as pdf into
				targetFile = this.getTargetFile(sourceDoc.name, '.pdf', destFolder);
				
				// Save as pdf
				sourceDoc.saveAs( targetFile, options );
			}
			// alert( 'Documents saved as PDF' );
		}
	}
	else{
		throw new Error('There are no document open!');
	}
}
catch(e) {
	alert( e.message, "Script Alert", true);
}

/** Returns the options to be used for the generated files.
	@return PDFSaveOptions object
*/
function getOptions() {
	var options = new PDFSaveOptions();
	// View the pdfs in Acrobat after conversion
	// options.viewAfterSaving = true;

	// Save for Fast Web-View
	// options.optimization = true;
	// options.compatibility = PDFCompatibility.ACROBAT6;
	// options.colorCompression = CompressionQuality.AUTOMATICJPEG2000MINIMUM;
	// options.colorDownsampling = 50;
	// options.compressArt = true;
	// options.generateThumbnails = true;
	// ColorReductionMethod.WEB

	// Get the presets
	var presetList = app.PDFPresetsList;
	// Save Smallest Size PDF - option is on 7th position
	options.pDFPreset = presetList[6];
	
	return options;
}

/** Returns the file to save or export the document into.
	@param docName the name of the document
	@param ext the extension the file extension to be applied
	@param destFolder the output folder
	@return File object
*/
function getTargetFile(docName, ext, destFolder) {
	var newName = "";

	// if name has no dot (and hence no extension),
	// just append the extension
	if (docName.indexOf('.') < 0) {
		newName = docName + ext;
	} else {
		var dot = docName.lastIndexOf('.');
		newName += docName.substring(0, dot);
		newName += ext;
	}
	
	// Create the file object to save to
	var myFile = new File( destFolder + '/' + newName );
	
	// Preflight access rights
	if (myFile.open("w")) {
		myFile.close();
	}
	else {
		throw new Error('Access is denied');
	}
	return myFile;
}
