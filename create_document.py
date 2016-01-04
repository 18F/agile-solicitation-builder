# -*- coding: utf-8 -*-
from docx import Document
from models import Agency, RFQ, ContentComponent, AdditionalClin, AdditionalComponent, Base, Session, engine

import os, shutil
import sys
import config
import datetime

def overview():
    # table of contents & basic info
    pass

def definitions():
    pass

def services():
    pass

def objectives():
    pass

def requirements():
    pass

def special_requirements():
    pass

def contract_clauses():
    pass

def create_document(rfq_id):

    session = Session()
    rfq = session.query(RFQ).filter_by(id=rfq_id).first()

    document = Document()

    # cover page - change agency to agency_full_name
    document.add_heading(rfq.agency, 0)
    doc_date = str(datetime.date.today())
    document.add_heading(doc_date, level=1)
    document.add_page_break()


    # definitions
    text = "Note: All sections of this RFQ will be incorporated into the contract except the Statement of Objectives, Instructions, and Evaluation Factors."
    print dir(rfq)
    title = "RFQ for " + rfq.agency

    document.add_heading(title)

    document.add_page_break()

    p = document.add_paragraph(text)
    p.add_run('bold').bold = True
    p.add_run(' and some ')
    p.add_run('italic.').italic = True

    document.add_heading('Heading, level 1', level=1)
    document.add_paragraph('Intense quote', style='IntenseQuote')

    document.add_paragraph(
        'first item in unordered list', style='ListBullet'
    )
    document.add_paragraph(
        'first item in ordered list', style='ListNumber'
    )

    doc_name = "RFQ_" + str(rfq_id) + ".docx"
    file_path = os.path.join("downloads", doc_name)
    document.save(file_path)

    # find a way to check if document was successfully saved
    return doc_name