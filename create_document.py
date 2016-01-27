# -*- coding: utf-8 -*-
from docx import Document
from models import Agency, RFQ, ContentComponent, AdditionalClin, CustomComponent, Base, Session, engine

import os, shutil
import sys
import config
import datetime

from pprint import pprint

session = Session()

BIG_HEADING = 1
SUB_HEADING = 2
SUB_SUB_HEADING = 3

user_dict = {
    "external_people": "External People/The Public",
    "external_it": "External IT/Developers",
    "internal_people": "Internal People/Government Employees",
    "internal_it": "Internal IT/Developers",
}

DELIVERABLES = {
    "d1": "Training of end users on the systems",
    "d2": "Design Solutions Prototyping",
    "d3": "Process Improvement Recommendations",
    "d4": "Program Management and Stewardship",
    "d5": "UX requirements gathering",
    "d6": "Initial application design and implementation",
    "d7": "System configuration to support business processes",
    "d8": "Integration for input and output methods",
    "d9": "Workflow design and implementation",
    "d10": "Overall collaboration of applications",
    "d11": "Enhancements, patches, and updates to applications, data, or cloud systems",
    "d12": "Data import of records collected from legacy systems",
    "d13": "Automated testing",
    "d14": "Supporting Legacy applications/systems",
    "d15": "Native mobile application(s)",
    "d16": "Mobile responsive web application(s)",
    "d17": "Application capable of supporting high user traffic",
    "d18": "Devops, continuous integration and continuous deployment",
    "d19": "Workstations, data centers, server systems, and connectivity",
}

def make_dict(components):
    component_dict = {}
    for component in components:
        component_dict[component.name] = component.text
    return component_dict

def make_custom_component_list(components):
    custom_component_list = []
    for component in components:
        this_component = {}
        this_component['name'] = component.name
        this_component['text'] = component.text
        this_component['title'] = component.title
        custom_component_list.append(this_component)

    return custom_component_list

def get_users(cc, user_types):
    users = []
    for user in user_types:
        if cc[user] == "true":
            users.append(user)            
    return users

def overview(document, rfq):
    # table of contents & basic info

    agency_full_name = session.query(Agency).filter_by(abbreviation=rfq.agency).first().full_name
    title = "RFQ for the " + agency_full_name
    document.add_heading(title, level=BIG_HEADING)
    doc_date = str(datetime.date.today())
    document.add_heading(doc_date, level=3)

    # table of contents
    document.add_heading("Table of Contents", level=SUB_HEADING)
    sections = ["Definitions", "Services", "Statement of Objectives", "Personnel Requirements", "Inspection and Delivery", "Government Roles", "Special Requirements", "Additional Contract Clauses", "Appendix"]
    for section in sections:
        document.add_paragraph(section, style='ListNumber')


    text = "Note: All sections of this RFQ will be incorporated into the contract except the Statement of Objectives, Instructions, and Evaluation Factors."
    p = document.add_paragraph(text)
    document.add_page_break()

    return document

def definitions(document, rfq):

    document.add_heading("1. Definitions", level=BIG_HEADING)
    all_definitions = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=1).first()
    for definition in all_definitions.text.split("\n\n"):
        document.add_paragraph(definition)    

    return document

def services(document, rfq):
    document.add_heading("2. Services", level=BIG_HEADING)
    content_components = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=2).all()
    # baseFee baseFeeAmount basePeriodDurationNumber basePeriodDurationUnit clin farCode fee iterationPoPNumber iterationPoPUnit maxBudget naicsText optionFee optionFeeAmount optionPeriodDurationNumber optionPeriodDurationUnit optionPeriods paymentSchedule travelBudget travelLanguage travelRequirement 
    # include vendor number
    cc = make_dict(content_components)
    optionPeriods = cc["optionPeriods"]
    document.add_heading("Brief Description of Services & Type of Contract", level=SUB_HEADING)
    document.add_paragraph(cc["descriptionOfServices"])
    document.add_paragraph(cc["naicsText"])

    document.add_heading("Budget", level=SUB_HEADING)
    max_text = "The government is willing to invest a maximum budget of $" + cc["maxBudget"] + " in this endeavor."
    document.add_paragraph(max_text)

    # travel
    if cc["travelRequirement"] == "yes":
        travel_text = "The Government anticipates travel will be required under this effort. Contractor travel expenses will not exceed $" + cc["travelBudget"]+ "."
        document.add_paragraph(travel_text)
        document.add_paragraph(cc["travelLanguage"])
    else:
        document.add_paragraph("The Government does not anticipate significant travel under this effort.")    

    # @TODO make top column bold, add award fee/incentive information (if applicable)
    # base period
    document.add_heading("Contract Line Item Number (CLIN) Format", level=SUB_HEADING)
    document.add_paragraph("\n")

    table = document.add_table(rows=2, cols=1)
    table.style = 'TableGrid'
    table.rows[0].cells[0].text = "Base Period: " + str(cc["basePeriodDurationNumber"]) + ' ' + cc["basePeriodDurationUnit"]
    table.rows[1].cells[0].text = "CLIN 0001, FFP- Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)"

    table = document.add_table(rows=4, cols=2)
    table.style = 'TableGrid'
    table.rows[0].cells[0].text = "Iteration Period of Performance"
    table.rows[0].cells[1].text = cc["iterationPoPNumber"] + ' ' + cc["iterationPoPUnit"]
    table.rows[1].cells[0].text = "Price Per Iteration"
    table.rows[1].cells[1].text = "$XXXXX (Vendor Completes)"
    table.rows[2].cells[0].text = "Period of Performance"
    table.rows[2].cells[1].text = cc["basePeriodDurationNumber"] + ' ' + cc["basePeriodDurationUnit"]
    table.rows[3].cells[0].text = "Firm Fixed Price (Completion):"
    table.rows[3].cells[1].text = "$XXXXX (Vendor Completes)"
    # @TODO if base fee, add base fee clin row

    document.add_paragraph("\n")

    # option periods
    for i in range(1, int(optionPeriods)+1):
        table = document.add_table(rows=2, cols=1)
        table.style = 'TableGrid'
        table.rows[0].cells[0].text = "Option Period " + str(i) + ": "  + str(cc["optionPeriodDurationNumber"]) + ' ' + cc["optionPeriodDurationUnit"]
        table.rows[1].cells[0].text = "CLIN " + str(i) + "0001, FFP- Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)"

        table = document.add_table(rows=4, cols=2)
        table.style = 'TableGrid'
        table.rows[0].cells[0].text = "Iteration Period of Performance"
        table.rows[0].cells[1].text = cc["iterationPoPNumber"] + ' ' + cc["iterationPoPUnit"]
        table.rows[1].cells[0].text = "Price Per Iteration"
        table.rows[1].cells[1].text = "$XXXXX (Vendor Completes)"
        table.rows[2].cells[0].text = "Period of Performance"
        table.rows[2].cells[1].text = cc["optionPeriodDurationNumber"] + ' ' + cc["optionPeriodDurationUnit"]
        table.rows[3].cells[0].text = "Firm Fixed Price (Completion):"
        table.rows[3].cells[1].text = "$XXXXX (Vendor Completes)"
        # @TODO if option fee, add option fee clin row
        
        document.add_paragraph("\n")

    # @TODO add custom CLIN

    document.add_heading("Payment Schedule", level=SUB_HEADING)
    document.add_paragraph(cc["paymentSchedule"])

    return document

def objectives(document, rfq):
    document.add_heading("3. Objectives", level=BIG_HEADING)
    content_components = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=3).all()
    cc = make_dict(content_components)
    #  u'kickOffMeetingInPerson', u'userResearchStrategy', u'userAccess',
    document.add_heading("General Background", level=SUB_HEADING)
    if len(cc["generalBackground"]) > 0:
        document.add_paragraph(cc["generalBackground"])
    else:
        document.add_paragraph("Please provide several paragraphs about your project's history, mission, and current state.")

    document.add_heading("Program History", level=SUB_HEADING)
    if len(cc["programHistory"]) > 0:
        document.add_paragraph(cc["programHistory"])
    else:
        document.add_paragraph("If you have any information about the current vendors and specific technology being used please provide it here.")

    document.add_heading("Specific Tasks and Deliverables", level=SUB_HEADING)
    text = "This " + rfq.doc_type + " will require the following services:"
    document.add_paragraph(text)
    deliverables = ["d10", "d9", "d12", "d11", "d14", "d13", "d16", "d15", "d18", "d17", "d19", "d2", "d1", "d4", "d3", "d6", "d5", "d8", "d7"]
    deliverables_added = 1
    for d in deliverables:
        if cc[d] == "true":
            document.add_paragraph("    " + str(deliverables_added) + ".  " + DELIVERABLES[d])
            deliverables_added += 1

    document.add_heading("Users", level=SUB_HEADING)
    user_types = ["external_people", "external_it", "internal_people", "internal_it"]
    users = get_users(cc, user_types)
    if len(users) == 0:
        document.add_paragraph("The primary users may include any of the following:")
        for i, user in enumerate(user_dict):
            document.add_paragraph(str(i+1) + ".  " + user_dict[user])

    else:
        document.add_paragraph("The primary users will include the following:")
        for i, user in enumerate(users):
            document.add_paragraph(str(i+1) + ".  " + user_dict[user])

    document.add_paragraph("The requirements described below will be customized to the types of users specified.")

    document.add_heading("User Research", level=SUB_HEADING)
    user_research_options = {
        "done": "Research has already been conducted, either internally or by another vendor.",
        "internal": "We intend to conduct user research internally prior to the start date of this engagement.",
        "vendor": "The vendor will be responsible for the user research.",
    }    

    if cc["userResearchStrategy"] == "vendor":
        document.add_paragraph(user_research_options["vendor"])
        document.add_heading("Understand What People Need", level=SUB_HEADING)
        document.add_paragraph(cc["whatPeopleNeed"])

        document.add_heading("Address the whole experience, from start to finish", level=SUB_HEADING)
        document.add_paragraph(cc["startToFinish"])

    if cc["userResearchStrategy"] == "done":
        document.add_paragraph(user_research_options["done"])


    if cc["userResearchStrategy"] == "internal":
        document.add_paragraph(user_research_options["internal"])

    if cc["userResearchStrategy"] == "none":
        pass

    document.add_paragraph(cc['userAccess'])

    document.add_heading("Make it simple and intuitive", level=SUB_HEADING)
    document.add_paragraph(cc["simpleAndIntuitive"])

    document.add_heading("Use data to drive decisions", level=SUB_HEADING)
    document.add_paragraph(cc["dataDrivenDecisions"])

    document.add_heading("Deliverables", level=SUB_HEADING)
    document.add_paragraph(cc["definitionOfDone"])

    
    document.add_heading("Place of Performance", level=SUB_HEADING)
    if cc['locationRequirement'] == "no":
        document.add_paragraph("The contractor is not required to have a full-time working staff presence on-site.")

    else:
        if len(cc['locationText']) > 0:
            location = cc["locationText"]
        else:
            location = "[LOCATION HERE]"

        location_text = "The contractor shall have a full-time working staff presence at " + location + ". Contractor shall have additional facilities to perform contract functions as necessary."
        document.add_paragraph(location_text)
        document.add_paragraph(cc["offSiteDevelopmentCompliance"])

    document.add_heading("Kick Off Meeting", level=SUB_HEADING)
    kickoff_text = ""
    if cc["kickOffMeeting"] == "none":
        kickoff_text = "A formal kick-off meeting will not be required."
    if cc["kickOffMeeting"] == "in-person":
        kickoff_text = cc["kickOffMeetingInPerson"]
    if cc["kickOffMeeting"] == "remote":
        kickoff_text = cc["kickOffMeetingRemote"]

    document.add_paragraph(kickoff_text)

    document.add_heading("Documentation and Training", level=SUB_HEADING)
    document.add_paragraph(cc["documentationAndTraining"])

    return document

def personnel(document, rfq):
    document.add_heading("4. Key Personnel", level=BIG_HEADING)
    intro_text = "The vendor shall provide talented people who have experience creating modern digital services. This includes bringing in seasoned product managers, engineers, UX researchers and designers."
    document.add_paragraph(intro_text)

    return document

def invoicing(document, rfq):
    document.add_heading("5. Invoicing & Funding", level=BIG_HEADING)

    content_components = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=5).all()
    cc = make_dict(content_components)
    
    document.add_paragraph(cc["invoicing"])

    document.add_paragraph("The Contractor shall submit an original invoice for payment to the following office:")
    document.add_paragraph(cc["billingAddress"])
    document.add_paragraph(cc["duplicateInvoice"])

    return document

def inspection_and_delivery(document, rfq):
    document.add_heading("6. Inspection and Delivery", level=BIG_HEADING)

    content_components = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=6).all()
    cc = make_dict(content_components)

    document.add_heading("Overview", level=SUB_HEADING)
    document.add_paragraph(cc["guidingPrinciples"])

    document.add_heading("Delivery and Timing", level=SUB_HEADING)
    document.add_paragraph(cc["inspectionOverview"])

    document.add_heading("Late Delivery", level=SUB_HEADING)
    document.add_paragraph(cc["lateDelivery"])

    document.add_heading("Collaboration Environment", level=SUB_HEADING)

    # if cc["workspaceExists"] == "yes":
    #     if len(cc["workspaceName"]) > 0:
    #         print type(rfq.agency)
    #         document.add_paragraph(rfq.agency + " is currently using " + cc["workspaceName"]) + " as their primary collaborative workspace tool. The contractor is required to establish a collaborative workspace using either this tool or another that both the contractor and the CO can agree upon."

    document.add_paragraph(cc["deliveringDeliverables"])

    document.add_heading("Transition Activities", level=SUB_HEADING)
    document.add_paragraph(cc["transitionActivities"])

    return document

def government_roles(document, rfq):
    document.add_heading("7. Government Roles", level=BIG_HEADING)
    
    content_components = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=7).all()
    cc = make_dict(content_components)

    custom_components = session.query(CustomComponent).filter_by(document_id=rfq.id).filter_by(section=7).order_by(CustomComponent.id).all()

    document.add_paragraph(cc["stakeholderIntro"])

    component_list = make_custom_component_list(custom_components)

    for component in component_list:
        document.add_heading(component['title'], level=SUB_HEADING)
        document.add_paragraph(component['text'])

    return document

def special_requirements(document, rfq):
    document.add_heading("8. Special Requirements", level=BIG_HEADING)

    custom_components = session.query(CustomComponent).filter_by(document_id=rfq.id).filter_by(section=8).order_by(CustomComponent.id).all()

    component_list = make_custom_component_list(custom_components)

    for component in component_list:
        document.add_heading(component['title'], level=SUB_HEADING)
        document.add_paragraph(component['text'])

    return document

def contract_clauses(document, rfq):
    document.add_heading("9. Additional Contract Clauses", level=BIG_HEADING)
    contract_clauses = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=10).first()
    
    document.add_paragraph(contract_clauses.text)

    return document

def appendix(document, rfq):

    document.add_heading("10. Appendix", level=BIG_HEADING)
    
    return document

def create_document(rfq_id):

    session = Session()
    rfq = session.query(RFQ).filter_by(id=rfq_id).first()

    document = Document()

    document = overview(document, rfq)
    document = definitions(document, rfq)
    document = services(document, rfq)
    document = objectives(document, rfq)
    document = personnel(document, rfq)
    document = invoicing(document, rfq)
    document = inspection_and_delivery(document, rfq)
    document = government_roles(document, rfq)
    document = special_requirements(document, rfq)
    document = contract_clauses(document, rfq)
    document = appendix(document, rfq)

    return document