/**
 * Code.gs - L322 Restoration & Retrofit App
 * Backend for Google Workspace-based web app.
 * Seeds the master spreadsheet and exposes RPC functions for the UI.
 */

const APP_NAME = 'L322 Restoration & Retrofit';
const SS_NAME = 'L322 Retrofit – Master Data';

/**
 * Serves the HTML user interface defined in ui.html.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('ui');
}

/**
 * Returns the project spreadsheet, creating it if necessary.
 */
function getProjectSpreadsheet() {
  const files = DriveApp.getFilesByName(SS_NAME);
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  return SpreadsheetApp.create(SS_NAME);
}

/**
 * Seeds all of the sheets in the project spreadsheet.
 * See seed.gs for the actual data arrays; this function just creates the tabs.
 */
function seedAll() {
  const ss = getProjectSpreadsheet();
  const names = [
    'Progress','Modules','MOST_Ring','Connectors','Fuses',
    'Junctions','Wires','HarnessRuns','Labels'
  ];
  names.forEach(name => {
    let sh = ss.getSheetByName(name);
    if (sh) ss.deleteSheet(sh);
    ss.insertSheet(name);
  });
}

/**
 * Returns a basic project state object for the front-end.
 * In a full implementation this would read data from Sheets and
 * return arrays of modules, connectors, wires, tasks, etc.
 */
function rpcGetState() {
  return {
    meta: { project: APP_NAME },
    modules: [],
    connectors: [],
    wires: [],
    tasks: [],
    retrofits: [],
    scanners: [],
    labelPrinter: {}
  };
}

/**
 * Placeholder: returns specifications for the label printer (Labelife).
 * You can expand this later to integrate with a real printing service.
 */
function getLabelPrinterSpecs() {
  return {
    name: 'Labelife LP-50',
    maxWidthMm: 50,
    maxHeightMm: 30,
    dpi: 203
  };
}

/**
 * Placeholder: returns the last known data from the OBD-II scanner.
 * Replace with actual integration when your scanner hardware arrives.
 */
function getScannerData() {
  return {
    device: 'OBD-II Bi-Directional Scanner',
    connected: false,
    lastScan: null,
    dtcs: []
  };
}
