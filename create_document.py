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

user_dict = {
    "external_people": "External People/The Public",
    "external_it": "External IT/Developers",
    "internal_people": "Internal People/Government Employees",
    "internal_it": "Internal IT/Developers",
}

playbook1 = [
    "Early in the project, spend time with current and prospective users of the service",
    "Use a range of qualitative and quantitative research methods to determine people’s goals, needs, and behaviors; be thoughtful about the time spent",
    "Test prototypes of solutions with real people, in the field if possible",
    "Document the findings about user goals, needs, behaviors, and preferences",
    "Share findings with the team and agency leadership",
    "Create a prioritized list of tasks the user is trying to accomplish, also known as 'user stories'",
    "As the digital service is being built, regularly test it with potential users to ensure it meets people’s needs",
]

def make_dict(components):
    component_dict = {}
    for component in components:
        component_dict[component.name] = component.text
    return component_dict

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
    document.add_heading(title, level=1)
    doc_date = str(datetime.date.today())
    document.add_heading(doc_date, level=3)

    # table of contents
    document.add_heading("Table of Contents", level=2)
    sections = ["Definitions", "Services", "Statement of Obectives", "Personnel Requirements", "Inspection and Delivery", "Government Roles", "Special Requirements", "Additional Contract Clauses"]
    for section in sections:
        document.add_paragraph(section, style='ListNumber')


    text = "Note: All sections of this RFQ will be incorporated into the contract except the Statement of Objectives, Instructions, and Evaluation Factors."
    p = document.add_paragraph(text)
    document.add_page_break()

    return document

def definitions(document, rfq):

    document.add_heading("1. Definitions", level=1)
    all_definitions = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=1).first()
    for definition in all_definitions.text.split("\n\n"):
        document.add_paragraph(definition)    

    return document

def services(document, rfq):
    content_components = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=2).all()
    # baseFee baseFeeAmount basePeriodDurationNumber basePeriodDurationUnit clin farCode fee iterationPoPNumber iterationPoPUnit maxBudget naicsText optionFee optionFeeAmount optionPeriodDurationNumber optionPeriodDurationUnit optionPeriods paymentSchedule travelBudget travelLanguage travelRequirement 
    # include vendor number
    cc = make_dict(content_components)
    optionPeriods = cc["optionPeriods"]
    document.add_heading("Description of Services", level=SUB_HEADING)
    document.add_paragraph(cc["descriptionOfServices"])
    document.add_paragraph(cc["naicsText"])

    document.add_heading("Budget", level=SUB_HEADING)
    max_text = "The government is willing to invest a maximum budget of $" + cc["maxBudget"] + " in this endeavor."
    document.add_paragraph(max_text)

    # travel
    if cc["travelRequirement"] == "yes":
        travel_text = "The Government anticipates significant travel under this effort. Contractor travel expenses will reimbursed up to " + cc["travelBudget"]+ " NTE."
        document.add_paragraph(travel_text)
        document.add_paragraph(cc["travelLanguage"])
    else:
        document.add_paragraph("The Government does not anticipate significant travel under this effort.")    

    # @TODO make top column bold, add award fee/incentive information (if applicable)
    # base period
    document.add_heading("Contract Line Item Number (CLIN) Format", level=SUB_HEADING)
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
    table.rows[2].cells[1].text = cc["basePeriodDurationNumber"] + cc["basePeriodDurationUnit"]
    table.rows[3].cells[0].text = "Firm Fixed Price (Completion):"
    table.rows[3].cells[1].text = "$XXXXX (Vendor Completes)"


    # option periods
    for i in (1, int(optionPeriods)+1):
        table = document.add_table(rows=2, cols=1)
        table.style = 'TableGrid'
        table.rows[0].cells[0].text = "Option Period " + str(i) + ":"  + str(cc["optionPeriodDurationNumber"]) + ' ' + cc["optionPeriodDurationUnit"]
        table.rows[1].cells[0].text = "CLIN 000" + str(i) + ", FFP- Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)"

        table = document.add_table(rows=4, cols=2)
        table.style = 'TableGrid'
        table.rows[0].cells[0].text = "Iteration Period of Performance"
        table.rows[0].cells[1].text = cc["iterationPoPNumber"] + ' ' + cc["iterationPoPUnit"]
        table.rows[1].cells[0].text = "Price Per Iteration"
        table.rows[1].cells[1].text = "$XXXXX (Vendor Completes)"
        table.rows[2].cells[0].text = "Period of Performance"
        table.rows[2].cells[1].text = cc["optionPeriodDurationNumber"] + cc["optionPeriodDurationUnit"]
        table.rows[3].cells[0].text = "Firm Fixed Price (Completion):"
        table.rows[3].cells[1].text = "$XXXXX (Vendor Completes)"

    document.add_heading("Payment Schedule", level=SUB_HEADING)
    document.add_paragraph(cc["paymentSchedule"])

    return document

def objectives(document, rfq):
    content_components = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=3).all()
    cc = make_dict(content_components)
    # u'generalBackground',u'locationText', u'offSiteDevelopmentCompliance', u'internal_people', u'kickOffMeeting', u'external_it', u'deliverables', u'kickOffMeetingInPerson', u'internal_it', u'userResearchStrategy', u'userAccess', u'programHistory', u'definitionOfDone', u'kickOffMeetingRemote', u'locationRequirement'
    document.add_heading("General Background")
    if len(cc["generalBackground"]) > 0:
        document.add_paragraph(cc["generalBackground"])
    else:
        document.add_paragraph("Please provide several paragraphs about your project's history, mission, and current state.")

    document.add_heading("Program History")
    if len(cc["programHistory"]) > 0:
        document.add_paragraph(cc["programHistory"])
    else:
        document.add_paragraph("If you have any information about the current vendors and specific technology being used please provide it here.")

    # document.add_heading("Specific Tasks and Deliverables")
    # text = "This " + rfq.doc_type + " will require the following services:"
    # document.add_paragraph(text)
    # document.add_paragraph("@TODO")

    document.add_heading("Users")
    user_types = ["external_people", "external_it", "internal_people", "internal_it"]
    users = get_users(cc, user_types)
    print users
    if len(users) == 0:
        document.add_paragraph("The primary users MAY include the following:")
        for user in user_dict:
            print user, users
            document.add_paragraph(user_dict[user], style='ListNumber')

    else:
        document.add_paragraph("The primary users will include the following:")
        for user in users:
            document.add_paragraph(user_dict[user], style='ListNumber')

    document.add_paragraph("The requirements described below will be customized to the types of users specified.")

    document.add_heading("User Research")
    user_research_options = {
        "done": "Research has already been conducted, either internally or by another vendor.",
        "internal": "We intend to conduct user research internally prior to the start date of this engagement.",
        "vendor": "The vendor will be responsible for the user research.",
    }

    document.add_paragraph(cc['userAccess'])

    if cc["userResearchStrategy"] == "vendor":
        document.add_paragraph(user_research_options["vendor"])
        document.add_heading("Understand What People Need")
        document.add_paragraph(cc["whatPeopleNeed"])

        document.add_heading("Address the whole experience, from start to finish")
        document.add_paragraph(cc["startToFinish"])

    if cc["userResearchStrategy"] == "done":
        document.add_paragraph(user_research_options["done"])


    if cc["userResearchStrategy"] == "internal":
        document.add_paragraph(user_research_options["internal"])

    if cc["userResearchStrategy"] == "none":
        pass

    document.add_heading("Make it simple and intuitive", level=SUB_HEADING)
    document.add_paragraph(cc["simpleAndIntuitive"])

    document.add_heading("Use data to drive decisions", level=SUB_HEADING)
    document.add_paragraph(cc["dataDrivenDecisions"])

    # document.add_heading("Deliverables", level=SUB_HEADING)
    # document.add_paragraph(cc["deliverables"])

    
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

    return document

def personnel(document, rfq):
    document.add_heading("Key Personnel", level=SUB_HEADING)
    intro_text = "The vendor shall provide talented people who have experience creating modern digital services. This includes bringing in seasoned product managers, engineers, UX researchers and designers."
    document.add_paragraph(intro_text)

    return document

def invoicing(document, rfq):
    content_component = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=5).first()
    document.add_heading("Invoicing & Funding", level=SUB_HEADING)
    document.add_paragraph(content_component.text)

    return document

def inspection_and_delivery(document, rfq):
    content_components = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=6).all()
    cc = make_dict(content_components)
    return document

def government_roles(document, rfq):
    content_components = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=8).all()
    cc = make_dict(content_components)
    
    document.add_heading("Contracting Officer", level=SUB_HEADING)
    document.add_paragraph(cc["contractingOfficer"])

    document.add_heading("Contracting Officer's Representative", level=SUB_HEADING)
    document.add_paragraph(cc["contractingOfficerRepresentative"])

    document.add_heading("Product Owner", level=SUB_HEADING)
    document.add_paragraph(cc["productOwner"])

    return document

def special_requirements(document, rfq):
    content_components = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=9).all()
    cc = make_dict(content_components)
    document.add_heading("Special Requirements", level=BIG_HEADING)

    document.add_heading("Controlled Facilities and Information Systems Security", level=SUB_HEADING)
    document.add_paragraph(cc["security"])

    document.add_heading("Federal Holidays", level=SUB_HEADING)
    document.add_paragraph(cc["federalHolidays"])

    document.add_heading("Section 508 Accessibility Standards Notice (September 2009)", level=SUB_HEADING)
    document.add_paragraph(cc["accessibility"])

    document.add_heading("Non-Disclosure Policies", level=SUB_HEADING)
    document.add_paragraph(cc["nonDisclosure"])

    document.add_heading("Potential Organizational Conflicts of Interest", level=SUB_HEADING)
    document.add_paragraph(cc["conflictOfInterest"])

    document.add_heading("Contractor Use of Commercial Computer Software, Including Open Source Software", level=SUB_HEADING)
    document.add_paragraph(cc["commercialSoftware"])

    document.add_heading("Title to Materials Shall Vest in the Government", level=SUB_HEADING)
    document.add_paragraph(cc["titleToMaterials"])

    document.add_heading("Limited Use of Data", level=SUB_HEADING)
    document.add_paragraph(cc["useOfData"])

    document.add_heading("Notice of Size Re-representation at the Task Order Level (will be conditional)")
    document.add_paragraph(cc["smallBusinessStatus"])

    document.add_heading("Order of Precedence", level=SUB_HEADING)
    document.add_paragraph(cc["orderOfPrecedence"])

    return document

def contract_clauses(document, rfq):
    contract_clauses = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=10).first()

    document.add_heading("Additional Contract Clauses", level=SUB_HEADING)
    # print contract_clauses
    # document.add_paragraph(contract_clauses["text"])

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

    doc_name = "RFQ_" + str(rfq_id) + ".docx"
    file_path = os.path.join("downloads", doc_name)
    document.save(file_path)

    # @TODO find a way to check if document was successfully saved
    return doc_name