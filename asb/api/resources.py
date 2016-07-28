# -*- coding: utf-8 -*-

from asb.extensions import auth

from asb.api.models import (
    User, Agency, RFQ, ContentComponent, AdditionalClin,
    CustomComponent, Deliverable
)
from asb.extensions import db
from flask import jsonify, request, g
from flask_restful import Api, Resource, reqparse, abort

class Users(Resource):
    def get(self):
        users = db.session.query(User).order_by(User.username).all()
        return jsonify(data=[{'id': u.id, 'username': u.username} for u in users])

    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        if username is None or password is None:
            abort(400) # missing arguments
        if db.session.query(User).filter_by(username = username).first() is not None:
            abort(400) # existing user
        user = User(username = username)
        user.hash_password(password)
        db.session.add(user)
        db.session.commit()
        if db.session.query(User).filter_by(username = username).first() is not None:
            return jsonify({ 'username': user.username, 'id': user.id })
        else:
            return jsonify({'error': "The user request was not completed."})

class Agencies(Resource):
    def get(self):
        agencies = db.session.query(Agency).order_by(Agency.full_name).all()
        return jsonify(data=[a.to_dict() for a in agencies])


class Data(Resource):
    decorators = [auth.login_required]
    def get(self, rfq_id, section_id):
        content = db.session.query(ContentComponent).filter_by(document_id=rfq_id).filter_by(section=int(section_id))
        return jsonify(data=dicts_to_dict([c.to_dict() for c in content], "name"))

    def put(self, rfq_id, section_id):
        parser = reqparse.RequestParser()
        parser.add_argument('data')
        data = request.get_json()['data']
        for key in data:
            component = db.session.query(ContentComponent).filter_by(document_id=rfq_id).filter_by(name=key).first()
            component.text = data[key]
            db.session.merge(component)
            db.session.commit()

        # this needs to be done client side to allow for jumping between sections
        if section_id < 10:
            url = '#/rfp/' + str(rfq_id) + '/question/' + str(int(section_id) + 1)
        else:
            url = "#/rfp/" + str(rfq_id) + "/results"
        return jsonify({"url": url})


class Deliverables(Resource):
    decorators = [auth.login_required]
    def get(self, rfq_id):
        deliverables = db.session.query(Deliverable).filter_by(document_id=rfq_id).order_by(Deliverable.id).all()
        return jsonify(data=[d.to_dict() for d in deliverables])

    def put(self, rfq_id):
        data = request.get_json()['data']
        for item in data:
            deliverable = db.session.query(Deliverable).filter_by(document_id=rfq_id).filter_by(name=item["name"]).first()
            deliverable.value = item["value"]
            deliverable.text = item["text"]
            db.session.merge(deliverable)
            db.session.commit()


class Clin(Resource):
    decorators = [auth.login_required]
    def get(self, rfq_id):
        clins = db.session.query(AdditionalClin).filter_by(document_id=rfq_id).all()
        return jsonify(data=[c.to_dict() for c in clins])

    def post(self, rfq_id):
        data = request.get_json()["data"]

        row1 = data['row1']
        row2 = data['row2']
        row3a = data['row3a']
        row3b = data['row3b']
        row4a = data['row4a']
        row4b = data['row4b']
        row5a = data['row5a']
        row5b = data['row5b']
        row6a = data['row6a']
        row6b = data['row6b']

        additional_clin = AdditionalClin(document_id=int(rfq_id), row1=row1, row2=row2, row3a=row3a, row3b=row3b, row4a=row4a, row4b=row4b, row5a=row5a, row5b=row5b, row6a=row6a, row6b=row6b)
        db.session.add(additional_clin)
        db.session.commit()

        clins = db.session.query(AdditionalClin).filter_by(document_id=rfq_id).all()
        return jsonify(data=[c.to_dict() for c in clins])


class CustomComponents(Resource):
    decorators = [auth.login_required]
    def get(self, rfq_id, section_id):
        components = db.session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(section=section_id).order_by(CustomComponent.id).all()
        return jsonify(data=[c.to_dict() for c in components])

    def put(self, rfq_id, section_id):
        data = request.get_json()['data']
        for key in data:
            component = db.session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(name=key).first()
            component.text = data[key]
            db.session.merge(component)
            db.session.commit()

    def post(self, rfq_id, section_id):
        data = request.get_json()["data"]
        title = data['title']
        text = data['text']

        # give component a name
        current_components = db.session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(section=section_id).all()
        name = "component" + str(len(current_components) + 1)

        custom_component = CustomComponent(document_id=int(rfq_id), section=int(section_id), name=name, title=title, text=text)

        db.session.add(custom_component)
        db.session.commit()

        components = db.session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(section=int(section_id)).all()
        return jsonify(data=[c.to_dict() for c in components])


class Create(Resource):
    decorators = [auth.login_required]
    def get(self):
        rfqs = db.session.query(RFQ).filter_by(user_id=g.user.id).all()
        return jsonify(data=[r.to_dict() for r in rfqs])

    def post(self, **kwargs):
        parser = reqparse.RequestParser()
        parser.add_argument('agency')
        parser.add_argument('doc_type')
        parser.add_argument('setaside')
        parser.add_argument('base_number')
        parser.add_argument('program_name')

        args = parser.parse_args()

        agency = args['agency']
        doc_type = args['doc_type']
        program_name = args['program_name']
        setaside = args['setaside']
        base_number = args['base_number']

        rfq = RFQ(user_id=g.user.id, agency=agency, doc_type=doc_type, program_name=program_name, setaside=setaside, base_number=base_number)
        db.session.add(rfq)
        db.session.commit()

        return jsonify({'id': rfq.id})


class DeleteRFQ(Resource):
    decorators = [auth.login_required]
    def delete(self, rfq_id):

        deliverables = db.session.query(Deliverable).filter_by(document_id=rfq_id).all()
        for d in deliverables:
            db.session.delete(d)

        content_components = db.session.query(ContentComponent).filter_by(document_id=rfq_id).all()
        for c in content_components:
            db.session.delete(c)

        custom_components = db.session.query(CustomComponent).filter_by(document_id=rfq_id).all()
        for c in custom_components:
            db.session.delete(c)

        additional_clins = db.session.query(AdditionalClin).filter_by(document_id=rfq_id).all()
        for a in additional_clins:
            db.session.delete(a)

        rfq = db.session.query(RFQ).filter_by(id=int(rfq_id)).first()

        db.session.delete(rfq)
        db.session.commit()
        message = "RFQ #" + str(rfq_id) + " deleted."

        return jsonify({'message': message})

def dicts_to_dict(dicts, key):
    new_dict = {}
    for i, d in enumerate(dicts):
        new_key = d[key]
        new_dict[new_key] = dicts[i]['text']
    return new_dict

api = Api(prefix='/api')
api.add_resource(Users, '/users')
api.add_resource(Agencies, '/agencies')
api.add_resource(
    Data, '/get_content/<int:rfq_id>/section/<int:section_id>'
)
api.add_resource(Deliverables, '/deliverables/<int:rfq_id>')
api.add_resource(Create, '/rfqs')
api.add_resource(Clin, '/clins/<int:rfq_id>')
api.add_resource(
    CustomComponents,
    '/custom_component/<int:rfq_id>/section/<int:section_id>'
)
api.add_resource(DeleteRFQ, '/delete/rfqs/<int:rfq_id>')
