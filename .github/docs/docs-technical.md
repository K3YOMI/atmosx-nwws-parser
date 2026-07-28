<div align="center">
	<a href="https://atmosphericx.scriptkitty.cafe">
		<img src="https://scriptkitty.cafe/ftp/@atmosphericx/assets/logo-event-product-parser.png" alt="@atmosx/event-product-parser" width="800"/>
	</a>
	<br>
	<p>A TypeScript/JavaScript library for parsing and ingesting NOAA and NWS Weather Text Products</p>
	<small>A project built and maintained with ❤️ by the AtmosphericX team</small>
	<p align="center">
		<a href="https://atmosphericx.scriptkitty.cafe"><b>Documentation</b></a> |
		<a href="https://github.com/AtmosphericX"><b>Repositories</b></a> |
		<a href="https://www.npmjs.com/search?q=%40atmosx"><b>NPM Packages</b></a> |
		<a href="https://atmosphericx-discord.scriptkitty.cafe"><b>Community Discord</b></a>
	</p>
</div>
<br><br>

# 8.0 - Technical Parser Documentation
# 8.1 - Workflow & Pipeline
# 8.2 - Core Parsing Logic
## 8.2.1 - VTEC
### 8.2.1.1 - Product Dictionary
### 8.2.1.2 - Tracking
### 8.2.1.3 - Event Dictionary
### 8.2.1.4 - Status Dictionary
### 8.2.1.5 - Organization Sender
### 8.2.1.6 - Expiry Parsing
### 8.2.1.7 - Watch Parsing
### 8.2.1.8 - KWNS / SPC
## 8.2.2 - UGC
### 8.2.2.1 - Extracting Headers
### 8.2.2.2 - Getting Zones
### 8.2.2.3 - Extracting Expiry
### 8.2.2.4 - UGC to Zones
## 8.2.3 - HVTEC
### 8.2.3.1 - Flood Severity
### 8.2.3.2 - Flood Causes
### 8.2.3.3 - Flood Records
## 8.2.4 - Raw Text
### 8.2.4.1 - Extracting Descriptions
### 8.2.4.2 - Extracting Coordinates
### 8.2.4.3 - Extracting String Specifics
### 8.2.4.4 - Extracting XML
## 8.2.5 - Building Properties
## 8.2.6 - Building Geometry
# 8.3 - Event Validation & Filtering
## 8.3.1 - Enhanced Event Naming
## 8.3.2 - Appending Attachments
## 8.3.3 - Generation Hashes
# 8.4 - Event & History Management
# 8.5 - Action Workflow