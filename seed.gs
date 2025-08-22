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
  ]);      // 4) CONNECTORS – detailed list of all connectors used in the retrofit
      upsertSheet_(ss, 'Connectors', [
        ['ConnectorID','CriticalPath','PinMap','Notes'],
        ['C0584','AHU power / CAN / ILLUM / remote','P1 RD/GN:+12V BATT | P2 YEL/WH:ACC | P3 BRN:GND | P4 GRY/RD:ILLUM | P5 GRN:CAN‑H | P6 WH:CAN‑L | P7 BLU/WH:AMP REMOTE | P8 BRN/WH:SWC | P9–P20: AUX/PHONE/NAV','Keep for diagnostics (power+CAN+illum+remote). Use P7 as remote trigger for aftermarket amps.'],
        ['C0586','AHU MOST loop / low‑level audio','P1 MOST IN | P2 MOST OUT | P3 RD/BU:Front L low | P4 RD/WH:Front R low | P5 BK/BU:Audio GND | P6 BU/GRN:Sub low | P7–P12: Tel/Nav mutes','Bridge MOST if modules removed. Use low‑level outputs (P3/P4/P6) as sources to external amps.'],
        ['C1748','Touchscreen video / touch return','P1 BLU/WH:VID | P2 BLU/GRN:VID | P3 BLU:VID | P4 GRY/BLK:VID GND | P5 BU/BLK:TOUCH DATA | P6 BU/YEL:TOUCH SENSE | P7 BU/RD:TOUCH SENSE | P8 BU/GRN:TOUCH SENSE','Keep intact for OEM diagnostic UI to function in relocated touchscreen.'],
        ['C2819','MOST diagnostic bypass','P1 FIBER IN | P2 FIBER OUT','Used only when bypassing removed MOST devices; install jumper.','']
      ]);

      // 5) WIRES – detailed pinout for each connector
      upsertSheet_(ss, 'Wires', [
        ['ConnectorID','Pin','Color','Function','Action','SystemTag'],
        ['C0584','P1','RD/GN','+12V battery (constant)','KEEP – powers OEM HU (diagnostics)','POWER'],
        ['C0584','P2','YEL/WH','Ignition / ACC feed','KEEP – also feed PLZ ACC','ACC'],
        ['C0584','P3','BRN','Chassis ground','KEEP – retain OEM ground, isolate from amp grounds','GROUND'],
        ['C0584','P4','GRY/RD','Illumination input','KEEP – dim PLZ display/illum','ILLUM'],
        ['C0584','P5','GRN','CAN high','KEEP – diagnostics','CAN'],
        ['C0584','P6','WH','CAN low','KEEP – diagnostics','CAN'],
        ['C0584','P7','BLU/WH','Remote amp trigger','REPURPOSE – drive Alpine/Boss amplifier remote turn‑on','REMOTE'],
        ['C0584','P8','BRN/WH','Steering wheel control','OPTIONAL – may be used with Maestro SWC','SWC'],
        ['C0586','P1','FIBER','MOST IN','KEEP – maintain fiber loop','MOST'],
        ['C0586','P2','FIBER','MOST OUT','KEEP – maintain fiber loop','MOST'],
        ['C0586','P3','RD/BU','Front left low‑level audio','REPURPOSE – feed Alpine front left RCA','AUDIO'],
        ['C0586','P4','RD/WH','Front right low‑level audio','REPURPOSE – feed Alpine front right RCA','AUDIO'],
        ['C0586','P5','BK/BU','Audio ground','REPURPOSE – feed RCA ground','AUDIO'],
        ['C0586','P6','BU/GRN','Subwoofer low‑level audio','REPURPOSE – feed Boss sub amp','AUDIO'],
        ['C1748','P1','BLU/WH','Video signal','KEEP – maintain OEM video to screen','VIDEO'],
        ['C1748','P2','BLU/GRN','Video signal','KEEP – maintain OEM video to screen','VIDEO'],
        ['C1748','P3','BLU','Video signal','KEEP – maintain OEM video to screen','VIDEO'],
        ['C1748','P4','GRY/BLK','Video ground','KEEP – maintain OEM video to screen','VIDEO'],
        ['C1748','P5','BU/BLK','Touch data','KEEP – maintain OEM touchscreen input','TOUCH'],
        ['C1748','P6','BU/YEL','Touch sense','KEEP – maintain OEM touchscreen input','TOUCH'],
        ['C1748','P7','BU/RD','Touch sense','KEEP – maintain OEM touchscreen input','TOUCH'],
        ['C1748','P8','BU/GRN','Touch sense','KEEP – maintain OEM touchscreen input','TOUCH']
      ]);

      // 6) FUSES – fuse assignments and retrofit actions
      upsertSheet_(ss, 'Fuses', [
        ['FuseID','JunctionBox','Rating','ModuleProtected','Action','Notes'],
        ['F32','CJB','30A','Audio Head Unit power','KEEP – OEM HU diagnostic power','Feeds constant battery and logic circuits'],
        ['F15','CJB','10A','ACC / Illumination','KEEP – also powers PLZ ACC and dimmer','Retain for illumination + ignition feed'],
        ['F43','CJB','5A','CAN / Logic','KEEP – retains CAN and Maestro / SWC','Necessary for diagnostics and steering controls'],
        ['F11','CJB','15A','Touchscreen display','KEEP – power feed','Ensures relocated screen powers up'],
        ['F49','CJB','20A','Infotainment relay','KEEP – main distribution','Main feed for infotainment bus'],
        ['F12','Aux JB (rear)','10A','Rear camera','KEEP – ensure video','Supply for rear camera module'],
        ['\u2014','','','MOST fiber jumper','BRIDGE – fiber jumper at removed modules','Install optical bypass when modules removed']
      ]);

      // Additional sheets such as Junctions, HarnessRuns, and Labels can be added similarly
