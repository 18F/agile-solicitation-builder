# -*- coding: utf-8 -*-
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Text, Boolean, String, ForeignKey

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, relationship

import seed


engine = create_engine('sqlite:///playbook.db', echo=True)
Session = sessionmaker(bind=engine)

Base = declarative_base()


content_components = seed.content_components

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
    setaside = Column(String)
    base_number = Column(String)
    components = relationship("ContentComponent")

    def __repr__(self):
        return "<RFQ(id='%d', agency='%s', doc_type='%s')>" % (self.id, self.agency, self.doc_type)

    def __init__(self, agency, doc_type, setaside, base_number=None):
        # working-with-related-objects

        # seed each section of the new document with the template content
        # check for variables
        self.agency = agency
        self.doc_type = doc_type
        self.setaside = setaside
        self.base_number = base_number
        self.components = [ContentComponent(**section) for section in content_components]


class ContentComponent(Base):
    __tablename__ = 'content_components'

    document_id = Column(Integer, ForeignKey('rfqs.id'), primary_key=True)
    section = Column(Integer, primary_key=True)
    name = Column(String, primary_key=True)
    variables = Column(Boolean, default=False)

    text = Column(Text)
    
    def __repr__(self):
        return "<ContentComponent(name='%s', doc_id='%d', text='%s')>" % (self.name, self.document_id, self.text)


class ValueComponent(Base):
    __tablename__ = 'value_components'

    document_id = Column(Integer, ForeignKey('rfqs.id'), primary_key=True)
    section = Column(Integer, primary_key=True)
    name = Column(String, primary_key=True)

    value = Column(Integer)
    
    def __repr__(self):
        return "<ValueComponent(name='%s', doc_id='%d', value='%d')>" % (self.name, self.document_id, self.value)

            


