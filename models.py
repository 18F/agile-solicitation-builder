# -*- coding: utf-8 -*-
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Text, Boolean, String, ForeignKey
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, relationship

import os

import seed

engine = create_engine(os.environ["DATABASE_URL"])
# 'postgres:///playbook.db', echo=True)
Session = sessionmaker(bind=engine)

Base = declarative_base()

content_components = seed.content_components
deliverables = seed.deliverables


class Agency(Base):
    __tablename__ = 'agencies'

    id = Column(Integer, primary_key=True)
    full_name = Column(String, unique=True)
    abbreviation = Column(String, unique=True)

    def __repr__(self):
        return "<Agency(id='%d', full_name='%s', abbreviation='%s')>" % (self.id, self.full_name, self.abbreviation)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
        

class RFQ(Base):
    __tablename__ = 'rfqs'

    id = Column(Integer, primary_key=True)
    agency = Column(String)
    doc_type = Column(String)
    program_name = Column(String)
    setaside = Column(String)
    base_number = Column(String)
    content_components = relationship("ContentComponent")
    deliverables = relationship("Deliverable")

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
       

    def __repr__(self):
        return "<RFQ(id='%d', agency='%s', doc_type='%s', program_name='%s')>" % (self.id, self.agency, self.doc_type, self.program_name)

    def __init__(self, agency, doc_type, program_name, setaside, base_number=None):
        # working-with-related-objects
        base_number_value = None
        if len(base_number) > 0:
            base_number_value = base_number

        # seed each section of the new document with the template content
        self.agency = agency
        self.doc_type = doc_type
        self.program_name = program_name
        self.setaside = setaside
        self.base_number = base_number_value

        vehicle = ""

        session = Session()
        agency_full_name = session.query(Agency).filter_by(abbreviation=agency).first().full_name
        if doc_type != "Purchase Order":
            vehicle = "(vehicle number " + base_number_value + ") "
        for section in content_components:
            text = str(section['text']).decode("utf8")
            section['text'] = text.replace("{AGENCY}", agency).replace("{DOC_TYPE}", doc_type).replace("{AGENCY_FULL_NAME}", agency_full_name).replace("{PROGRAM_NAME}", program_name).replace("{VEHICLE}", vehicle)
            self.content_components.append(ContentComponent(**section))

        for deliverable in deliverables:
            # text = str(deliverable['text']).decode("utf8")
            deliverable['value'] = True if (deliverable['value'] == "yes") else False
            # name = str(deliverable['name']).decode("utf8")
            self.deliverables.append(Deliverable(**deliverable))


class ContentComponent(Base):
    __tablename__ = 'content_components'

    document_id = Column(Integer, ForeignKey('rfqs.id'), primary_key=True)
    section = Column(Integer, primary_key=True)
    name = Column(String, primary_key=True)
    text = Column(Text)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return "<ContentComponent(name='%s', doc_id='%d', text='%s')>" % (self.name, self.document_id, self.text)


class Deliverable(Base):
    __tablename__ = 'deliverables'

    document_id = Column(Integer, ForeignKey('rfqs.id'), primary_key=True)
    name = Column(String, primary_key=True)
    text = Column(String)
    value = Column(String)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return "<Deliverable(name='%s', doc_id='%d', text='%s', value='%s')>" % (self.name, self.document_id, self.text, self.value)


class AdditionalClin(Base):
    __tablename__ = 'additional_clins'

    id = Column(Integer, primary_key=True)
    document_id = Column(Integer)
    row1 = Column(Text)
    row2 = Column(Text)
    row3a = Column(Text)
    row3b = Column(Text)
    row4a = Column(Text)
    row4b = Column(Text)
    row5a = Column(Text)
    row5b = Column(Text)
    row6a = Column(Text)
    row6b = Column(Text)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}        

    def __repr__(self):
        return "<Clin(id='%d', row1='%s', row2='%s', row3a='%s')>" % (self.document_id, self.row1, self.row2, self.row3a)

class SpecialRequirement(Base):
    __tablename__ = "special_requirements"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    text = Column(Text)


class CustomComponent(Base):
    __tablename__ = 'custom_components'

    id = Column(Integer, ForeignKey('rfqs.id'), primary_key=True)
    document_id = Column(Integer)
    title = Column(String)
    description = Column(Text)
    section = Column(Integer)
    
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}    

    def __repr__(self):
        return "<AdditionalComponent(id='%d', title='%s', text='%s')>" % (self.document_id, self.title, self.category, self.text)

