import React, { PureComponent } from 'react';


import { Document, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class PdfPreview extends PureComponent {

    render () {
        const { prfUrl } = this.props
        return (
                   <Document
                        file={prfUrl}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                        loading={'Loading...'}
                    >
                    </Document>
         
        );
    }
}

