# -*- coding: utf-8 -*-
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Text, Boolean, String, ForeignKey

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, relationship

import seed


engine = create_engine('sqlite:///:memory:', echo=True)
Session = sessionmaker(bind=engine)

Base = declarative_base()


content_components = seed.content_components

class RFQ(Base):
    __tablename__ = 'rfqs'

    id = Column(Integer, primary_key=True)
    agency = Column(String)
    doc_type = Column(String)
    components = relationship("ContentComponent")

    def __repr__(self):
        return "<RFQ(id='%d', agency='%s', doc_type='%s')>" % (self.id, self.agency, self.doc_type)

    def __init__(self, agency, doc_type):
        # working-with-related-objects

        # seed each section of the new document with the template content
        # check for variables
        self.agency = agency
        self.doc_type = doc_type
        self.components = [ContentComponent(**section) for section in content_components]


class ContentComponent(Base):
    __tablename__ = 'content_components'

    document_id = Column(Integer, ForeignKey('rfqs.id'), primary_key=True)
    section = Column(Integer, primary_key=True)
    name = Column(String, primary_key=True)

    updated = Column(Boolean, default=False)
    text = Column(Text)
    
    def __repr__(self):
        return "<ContentComponent(name='%s', doc_id='%d', text='%s')>" % (self.name, self.document_id, self.text)

            

class Agency(Base):
    __tablename__ = 'agencies'

    id = Column(Integer, primary_key=True)
    full_name = Column(String)
    abbreviation = Column(String)

    def __repr__(self):
        return "<Agency(id='%d', full_name='%s', abbreviation='%s')>" % (self.id, self.full_name, self.abbreviation)

