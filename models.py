# -*- coding: utf-8 -*-
from flask import Flask
from app import db
from sqlalchemy.dialects.postgresql import JSON

# @TODO sections will import template text to seed new documents
termsText = "AGILE DEVELOPMENT/AGILE SOFTWARE DEVELOPMENT: A proven commercial methodology for software development that is characterized by incremental and iterative processes where releases are produced in close collaboration with the customer. This process improves investment manageability, lowers risk of project failure, shortens the time to realize value, and allows agencies to better adapt to changing needs.\n\nCONTRACTING OFFICER (CO): The Government official responsible for the execution and administration of contracts on behalf of the Government.\n\nCONTRACTING OFFICER’S REPRESENTATIVE (COR): An individual designated by the Contracting Officer to act as his/her representative to assist in managing the contract. The authorities and limitations of a COR appointment are contained in the written letter of appointment.\n\nDAY: A calendar day unless stated otherwise. If a deliverable is due on a weekend or holiday, the deliverable shall be considered due the next business day.\n\nQUARTER: A quarter will be defined as the first of January through the end of March, first of April through the end of June, first of July through the end of September, and first of October through the end of December.\n\nBUSINESS DAY: Any day other than a Saturday, a Sunday, a Federal holiday or other day on which the Federal Government by law or executive order is closed. Note: This includes any weather-related office closures if the place of performance is in a Federal Building.\n\nMINIMUM FUNCTIONALITY: The minimum capabilities a product should have to meet the Government’s objectives.\n\nAGILE ENVIRONMENT: A team-based setting for IT product development where the Agile development methodology is used.\n\nITERATION/SPRINT/RELEASE CYCLE: Divisions of time within the Agile development framework.  Each iteration is small in scale (i.e., encompasses a single or a few function(s) within a multistep process). Multiple iterations form releases. For more information, see the TechFAR at https://github.com/WhiteHouse/playbook/blob/gh-pages/_includes/techfar-online.md\n\nMILESTONES/EPICS: A necessary step in a process. In this document, used to refer to components of a given project.\n\nSTORY POINT: A measurement of work and effort. Story points are used in an Agile development environment to demonstrate how much work was achieved in a given sprint or iteration. For more information, see the <a href='https://github.com/WhiteHouse/playbook/blob/gh-pages/_includes/techfar-online.md' target='_blank'>TechFAR</a>\n\nTHROUGHPUT: The amount of material or items passing through a system or process; in this document, refers to the work activity of a product development team.";
coText = "The Contracting Officer is the only individual who can legally commit or obligate the Government for the expenditure of public funds. The technical administration of this Task Order shall not be construed to authorize the revision of the terms and conditions of this Task Order. Only the Contracting Officer can authorize any such revision in writing. The Contracting Officer shall promptly countermand any action that exceeds the authority of the COR.";
corText = "The Contracting Officer may designate additional technical personnel to serve in monitoring the work under this Task Order. The COR will coordinate and manage the activities under the Task Order.";
payment_schedule_text = "The contractor shall be paid upon the completion of each iteration upon its acceptance and verification by the Contracting Officer’s Representative (COR). Invoices shall be submitted at the end of each iteration in accordance with the delivery schedule as established in the Performance Work Statement."
# "locationRequirement", false "locationText", null

content_sections = [
	{
		"name": "agency",
		"template": "none",
		"text": "none",
		"section": 0,
		"order": 1,
		"updated": False,
		"variables": False,
	},
	{
		"name": "docType",
		"template": "",
		"text": "",
		"section": 0,
		"order": 2,
		"updated": False,
		"variables": False,
	},
	{
		"name": "setasides",
		"template": "none",
		"text": "none",
		"section": 0,
		"order": 2,
		"updated": False,
		"variables": False,
	},
	{
		"name": "performancePeriods",
		"template": 3,
		"text": 3,
		"section": 0,
		"order": 4,
		"updated": False,
		"variables": False,
	},
	{
		"name": "periodDuration",
		"template": "6 months",
		"text": "6 months",
		"section": 0,
		"order": 4,
		"updated": False,
		"variables": False,
	},
	{
		"name": "definitions",
		"template": termsText,
		"text": termsText,
		"section": 1,
		"order": 1,
		"updated": False,
		"variables": False,
	},
	{
		"name": "paymentSchedule",
		"template": payment_schedule_text,
		"text": payment_schedule_text,
		"section": 2,
		"order": 3,
		"updated": False,
		"variables": False,
	},	
	{
		"name": "travelBudget",
		"template": 0,
		"text": 0,
		"section": 7,
		"order": 1,
		"updated": False,
		"variables": False,
	},
	{
		"name": "coText",
		"template": coText,
		"text": coText,
		"section": 8,
		"order": 1,
		"updated": False,
		"variables": False,
	},
	{
		"name": "corText",
		"template": corText,
		"text": corText,
		"section": 8,
		"order": 2,
		"updated": False,
		"variables": False,
	},
]

class Content(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	section = db.Column(db.Integer)
	order = db.Column(db.Integer)
	name = db.Column(db.String)
	updated = db.Column(db.Boolean, default=False)
	variables = db.Column(db.Boolean, default=False)
	template = db.Column(db.Text)
	text = db.Column(db.Text)
	document_id = db.Column(db.Integer, db.ForeignKey('document.id'))

class Document(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	agency = db.Column(db.String)
	agency_full_name = db.Column(db.String)
	doc_type = db.Column(db.String)

	def __init__(self, agency, doc_type):

		# seed each section of the new document with the template content			
		for section in content_sections:
			content = Content.create(document_id=id)
			content.update(section)
				

class Agency(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	full_name = db.Column(db.String)
	abbreviation = db.Column(db.String)
