#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

from sqlalchemy import Column, Integer, Text, String, ForeignKey
from sqlalchemy.orm import relationship
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (
    TimedJSONWebSignatureSerializer as Serializer,
    BadSignature, SignatureExpired
)

from asb import seed
from asb.extensions import db

content_components = seed.content_components
deliverables = seed.deliverables
custom_components = seed.custom_components

class Model(db.Model):
    __abstract__ = True

    @classmethod
    def get_by_id(cls, id):
        if any(
            (isinstance(id, str) and id.isdigit(),
             isinstance(id, (int, float))),
        ):
            return cls.query.get(int(id))
        return None

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class User(Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(32), index=True)
    password_hash = Column(String(128))

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def generate_auth_token(self, expiration=600):
        s = Serializer(os.environ.get('SECRET_KEY', "None"), expires_in=expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(os.environ.get('SECRET_KEY', "None"))
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None # valid token, but expired
        except BadSignature:
            return None # invalid token
        return User.get_by_id(data['id'])

class Agency(Model):
    __tablename__ = 'agencies'

    id = Column(Integer, primary_key=True)
    full_name = Column(String, unique=True)
    abbreviation = Column(String, unique=True)

    def __repr__(self):
        return "<Agency(id='%d', full_name='%s', abbreviation='%s')>" % (self.id, self.full_name, self.abbreviation)


class RFQ(Model):
    __tablename__ = 'rfqs'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    agency = Column(String)
    doc_type = Column(String)
    program_name = Column(String)
    setaside = Column(String)
    base_number = Column(String)
    content_components = relationship("ContentComponent")
    deliverables = relationship("Deliverable")
    custom_components = relationship("CustomComponent")

    def __repr__(self):
        return "<RFQ(id='%d', agency='%s', doc_type='%s', program_name='%s')>" % (self.id, self.agency, self.doc_type, self.program_name)

    def __init__(self, user_id, agency, doc_type, program_name, setaside, base_number=None):
        # working-with-related-objects
        base_number_value = None
        if len(base_number) > 0:
            base_number_value = base_number

        # seed each section of the new document with the template content
        self.user_id = user_id
        self.agency = agency
        self.doc_type = doc_type
        self.program_name = program_name
        self.setaside = setaside
        self.base_number = base_number_value

        vehicle = ""

        agency_full_name = db.session.query(Agency).filter_by(abbreviation=agency).first().full_name

        if doc_type != "Purchase Order":
            vehicle = "(vehicle number " + base_number_value + ") "

        for section in content_components:
            text = section['text']
            section['text'] = text.replace("{AGENCY}", agency).replace("{DOC_TYPE}", doc_type).replace("{AGENCY_FULL_NAME}", agency_full_name).replace("{PROGRAM_NAME}", program_name).replace("{VEHICLE}", vehicle)
            self.content_components.append(ContentComponent(**section))

        for deliverable in deliverables:
            deliverable["text"] = str(deliverable['text'])
            deliverable["display"] = str(deliverable['display'])
            self.deliverables.append(Deliverable(**deliverable))

        for component in custom_components:
            text = component['text']
            title = component['title']
            component['text'] = text.replace("{AGENCY}", agency).replace("{DOC_TYPE}", doc_type).replace("{AGENCY_FULL_NAME}", agency_full_name).replace("{PROGRAM_NAME}", program_name).replace("{VEHICLE}", vehicle)
            component['title'] = title.replace("{AGENCY}", agency).replace("{DOC_TYPE}", doc_type).replace("{AGENCY_FULL_NAME}", agency_full_name).replace("{PROGRAM_NAME}", program_name).replace("{VEHICLE}", vehicle)
            self.custom_components.append(CustomComponent(**component))

class ContentComponent(Model):
    __tablename__ = 'content_components'

    document_id = Column(Integer, ForeignKey('rfqs.id'), primary_key=True)
    section = Column(Integer, primary_key=True)
    name = Column(String, primary_key=True)
    text = Column(Text)

    def __repr__(self):
        return "<ContentComponent(name='%s', doc_id='%d', text='%s')>" % (self.name, self.document_id, self.text)

class Deliverable(Model):
    __tablename__ = 'deliverables'

    id = Column(Integer, primary_key=True)
    document_id = Column(Integer, ForeignKey('rfqs.id'), primary_key=True)
    name = Column(String, primary_key=True)
    display = Column(String)
    value = Column(String)
    text = Column(Text)

    def __repr__(self):
        return "<Deliverable(name='%s', doc_id='%d', text='%s', value='%s', display='%s')>" % (self.name, self.document_id, self.text, self.value, self.display)

class AdditionalClin(Model):
    __tablename__ = 'additional_clins'

    id = Column(Integer, primary_key=True)
    document_id = Column(Integer, ForeignKey('rfqs.id'))
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

    def __repr__(self):
        return "<Clin(id='%d', row1='%s', row2='%s', row3a='%s')>" % (self.document_id, self.row1, self.row2, self.row3a)

class CustomComponent(Model):
    __tablename__ = 'custom_components'

    id = Column(Integer, primary_key=True)
    document_id = Column(Integer, ForeignKey('rfqs.id'))
    title = Column(String)
    name = Column(String)
    text = Column(Text)
    section = Column(Integer)

    def __repr__(self):
        return "<AdditionalComponent(id='%d', title='%s', text='%s')>" % (self.document_id, self.title, self.text)
