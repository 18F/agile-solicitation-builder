# -*- coding: utf-8 -*-
# name, text, section
value_components = [
    {
        "name": "option_periods",
        "value": 3,
        "section": 2,
    },
    {
        "name": "period_duration_number",
        "value": 6,
        "section": 2,
    },
    {
        "name": "iteration_pop_number",
        "value": 2,
        "section": 2,
    },
    {
        "name": "travel_budget",
        "value": 0,
        "section": 2,
    },
    {
        "name": "max_budget",
        "value": 0,
        "section": 3,
    },
]

content_components = [
    {
        "name": "setasides",
        "text": "none",
        "variables": False,
        "section": 0,
    },
    {
        "name": "base_number",
        "text": "0",
        "variables": False,
        "section": 0,
    },
    {
        "name": "definitions",
        "text": "AGILE DEVELOPMENT/AGILE SOFTWARE DEVELOPMENT: A proven commercial methodology for software development that is characterized by incremental and iterative processes where releases are produced in close collaboration with the customer. This process improves investment manageability, lowers risk of project failure, shortens the time to realize value, and allows agencies to better adapt to changing needs.\n\nCONTRACTING OFFICER (CO): The Government official responsible for the execution and administration of contracts on behalf of the Government.\n\nCONTRACTING OFFICER'S REPRESENTATIVE (COR): An individual designated by the Contracting Officer to act as his/her representative to assist in managing the contract. The authorities and limitations of a COR appointment are contained in the written letter of appointment.\n\nDAY: A calendar day unless stated otherwise. If a deliverable is due on a weekend or holiday, the deliverable shall be considered due the next business day.\n\nQUARTER: A quarter will be defined as the first of January through the end of March, first of April through the end of June, first of July through the end of September, and first of October through the end of December.\n\nBUSINESS DAY: Any day other than a Saturday, a Sunday, a Federal holiday or other day on which the Federal Government by law or executive order is closed. Note: This includes any weather-related office closures if the place of performance is in a Federal Building.\n\nMINIMUM FUNCTIONALITY: The minimum capabilities a product should have to meet the Government's objectives.\n\nAGILE ENVIRONMENT: A team-based setting for IT product development where the Agile development methodology is used.\n\nITERATION/SPRINT/RELEASE CYCLE:Divisions of time within the Agile development framework.  Each iteration is small in scale (i.e., encompasses a single or a few function(s) within a multistep process). Multiple iterations form releases. For more information, see the TechFAR at https://github.com/WhiteHouse/playbook/blob/gh-pages/_includes/techfar-online.md\n\nMILESTONES/EPICS:A necessary step in a process. In this document, used to refer to components of a given project.\n\nSTORY POINT:A measurement of work and effort. Story points are used in an Agile development environment to demonstrate how much work was achieved in a given sprint or iteration. For more information, see the TechFAR: href='https://github.com/WhiteHouse/playbook/blob/gh-pages/_includes/techfar-online.md\n\nTHROUGHPUT: The amount of material or items passing through a system or process; in this document, refers to the work activity of a product development team.\n\nPRODUCT VISION: @TODO \n\nUSER STORY: A very high-level definition of a requirement, containing just enough information so that the developers can produce a reasonable estimate of the effort to implement it.",
        "variables": False,
        "section": 1,
    },
     {
        "name": "description_of_services",
        "text": "",
        "variables": False,
        "section": 2,
    },
    {
        "name": "period_duration_unit",
        "text": "months",
        "variables": False,
        "section": 2,
    },
    {
        "name": "iteration_pop_unit",
        "text": "weeks",
        "variables": False,
        "section": 2,
    },
    {
        "name": "naics_codes",
        "text": "This is a Firm Fixed Price [doctype] against [GSA Alliant Small Business (SB) GWAC] – Firm Fixed Price<This requirement will be solicited under the following North American Industrial Classification System (NAICS) Code: 541512, Computer Systems Design Services, $27.5 million. This [doctype] will be made in accordance with FAR 16.505 which governs orders placed under Indefinite Delivery contracts as detailed in the GSA GWAC Ordering guide.",
        "variables": True,
        "section": 2,
    },
    {
        "name": "payment_schedule", 
        "text": "The contractor shall be paid upon the completion of each iteration upon its acceptance and verification by the Contracting Officer's Representative (COR). Invoices shall be submitted at the end of each iteration in accordance with the delivery schedule as established in the Performance Work Statement.",
        "variables": False,
        "section": 2,
    },
    {
        "name": "stakeholders",
        "text": "Stakeholders for this project include, but are not limited to, ___, ___, the Contracting Officer's Representative (COR) and the Contracting Officer.",
        "variables": False,
        "section": 3,
    },
    {
        "name": "contracting_officer",
        "text": "The Contracting Officer is the only individual who can legally commit or obligate the Government for the expenditure of public funds. The technical administration of this Task Order shall not be construed to authorize the revision of the terms and conditions of this Task Order. Only the Contracting Officer can authorize any such revision in writing. The Contracting Officer shall promptly countermand any action that exceeds the authority of the COR.",
        "variables": True,
        "section": 8,
    },
    {
        "name": "contracting_officer_representative",
        "text": "The Contracting Officer may designate additional technical personnel to serve in monitoring the work under this Task Order. The COR will coordinate and manage the activities under the Task Order.",
        "variables": True,
        "section": 8,
    },
    {
        "name": "contract_clauses",
        "text": "",
        "variables": False,
        "section": 8,
    },
]

agencies = {
    "ED": "Department of Education",
    "DOE": "Department of Energy",
    "EPA": "Environmental Protection Agency",
    "GSA": "General Services Administration",
    "DOL": "Department of Labor",
    "NARA": "National Archives and Records Administration",
    "NASA": "National Aeronautics and Space Administration",
    "OMB": "Office of Management and Budget",
    "VA": "Department of Veteran Affairs"
}