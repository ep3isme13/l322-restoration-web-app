# L322 Restoration & Retrofit Web App

This project is a Google Workspace–native web application for managing the complete restoration and retrofit of a 2008 Range Rover HSE 4.4L V8. It serves as a digital master workshop, organizing wiring diagrams, module maps, connector pinouts, and guiding step‑by‑step retrofit tasks.

## Repository Structure

- `seed.gs` – Seeds the **L322 Retrofit – Master Data** spreadsheet with progress gates, modules, MOST ring topology, connectors, fuses, junctions, wires, harness runs and labels. Run `seedAll()` once in Apps Script to populate the sheet.
- `Code.gs` – Backend skeleton for the web app. Provides the `doGet()` entry point, helper functions to create/get the spreadsheet, a `seedAll()` stub, and RPC functions to return state. Includes placeholders for Labelife printer and OBD‑II scanner integration.
- `ui.html` – Minimal front‑end that loads the state from the backend and displays a loading message. Replace with a full UI later.

## Getting Started

1. Clone this repository.
2. In Google Apps Script:
   - Create a new project.
   - Copy `Code.gs`, `seed.gs`, and `ui.html` into the project.
   - Run `seedAll()` from `seed.gs` to create and populate the **L322 Retrofit – Master Data** sheet.
3. Deploy the script as a web app.
4. Embed the resulting web app URL in Google Sites if desired.

## Future Enhancements

- Complete the seed data arrays in `seed.gs` to cover every connector, wire, fuse, module, and harness in your project.
- Expand the UI with progress tracking dashboards, connector cards, and map overlays.
- Integrate the Labelife label printer for automated label generation.
- Integrate the OBD‑II bi‑directional scanner to capture diagnostics and update tasks in real time.
