import React from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import thekomp from "./../thekomp";
const DocsViewer = ({ link }) => {
  const docs = [{ uri: link }];

  return <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />;
};
export default DocsViewer;
