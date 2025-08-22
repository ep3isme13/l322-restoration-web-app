/***** L322 Retrofit – REAL DATA SEEDER (Google Apps Script) *****
 * Creates “L322 Retrofit – Master Data” and seeds with actual project data.
 * Tabs: Progress, Modules, MOST_Ring, Connectors, Fuses, Junctions, Wires, HarnessRuns,
 * Labels
 * You can safely re-run; it will update/replace tabs.
 *****************************************************************/
const SS_NAME = 'L322 Retrofit – Master Data';
function seedAll() {
  const ss = getOrCreate_(SS_NAME);
  // 1) PROGRESS (for visual tracker in the web app)
  upsertSheet_(ss, 'Progress', [
    ['Phase','Key Gate','Status','Owner','Start','Target','Done','Notes'],
    ['01–De‑MOST','Loop removed modules','Complete','You','2025-01-01','2025-01-03','2025-01-03','CD/DVD/Phone/TV removed; MOST loops in place'],
    ['02–Power Plan','CJBox & AUX JB loads','In Progress','You','2025-01-03','2025-01-05','','Fuse/FDR map aligned with new head unit + amps'],
    ['03–Head Unit','PLZ HU in glovebox','Planned','You','','2025-01-07','','Denso screen retained for diagnostics in upper glove'],
    ['04–Amplifiers','Alpine 4ch + Boss sub','Planned','You','','2025-01-08','','Remote, grounds, signal routing'],
    ['05–Jumper Seat','Rear fold‑down integration','Planned','You','','2025-01-12','','Harness add + waterproofing'],
  ]);
  // 2) MODULES (real modules present/removed/retained)
  upsertSheet_(ss, 'Modules', [
    ['Module','ConnectorIDs','Location (OEM)','Retain?','Notes'],
    ['Audio Head Unit (Denso)','C2115,C2105','Dash center stack / glovebox retrofit','Retain (diag only)','Kept for vehicle computer info; HU audio path bypassed to PLZ'],
    ['Touch Screen Display (Denso)','C2113,C2114','Upper glovebox (your retrofit)','Retain (UI/diag)','Receives rear camera & nav; illumination input'],
    ['Power Amplifier (OEM)','C2154','Left side of luggage compartment','Removed','Replaced by Alpine 4‑ch + Boss sub'],
    // truncated due to length; please refer to project docs for full list
  ]);
  // 3) MOST ring (exact)
  upsertSheet_(ss, 'MOST_Ring', [
    ['Order','Module','MOST_IN','MOST_OUT','Connector','Physical Location'],
    [1,'Audio Head Unit','—','—','C2105','Dash – center stack'],
    [2,'Auto CD Changer','IN','OUT','C2102','Top glovebox'],
    [3,'Telephone Module','IN','OUT','C2496','Left luggage'],
    [4,'Rear Seat Entertainment Module','IN','OUT','C2106','Left luggage'],
    [5,'Power Amplifier','IN','OUT','C2154','Left luggage'],
    [6,'Touch Screen Display','IN','OUT','C2115','Glovebox enclosure (retrofit)'],
    [7,'SDARS Tuner','IN','OUT','C2825','Left luggage'],
    [8,'TV Tuner Module','IN','OUT','C2105','Left luggage'],
    [9,'TMC Receiver','IN','OUT','C3258','Left luggage'],
  ]);
  // Additional connectors, fuses, junctions, wires, harness runs, and labels go here...
}
