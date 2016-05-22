from models import User, Agency, RFQ, ContentComponent, AdditionalClin, CustomComponent, session, Deliverable
from flask import jsonify, request, g
from flask_restful import Resource, reqparse, abort
from flask.ext.httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

class Users(Resource):
    def get(self):
        users = session.query(User).order_by(User.username).all()
        return jsonify(data=[{'id': u.id, 'username': u.username} for u in users])

    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        if username is None or password is None:
            abort(400) # missing arguments
        if session.query(User).filter_by(username = username).first() is not None:
            abort(400) # existing user
        user = User(username = username)
        user.hash_password(password)
        session.add(user)
        session.commit()
        if session.query(User).filter_by(username = username).first() is not None:
            return jsonify({ 'username': user.username, 'id': user.id })
        else:
            return jsonify({'error': "The user request was not completed."})

class Agencies(Resource):
    def get(self):
        agencies = session.query(Agency).order_by(Agency.full_name).all()
        return jsonify(data=[a.to_dict() for a in agencies])


class Data(Resource):
    decorators = [auth.login_required]
    def get(self, rfq_id, section_id):
        content = session.query(ContentComponent).filter_by(document_id=rfq_id).filter_by(section=int(section_id))
        return jsonify(data=dicts_to_dict([c.to_dict() for c in content], "name"))

    def put(self, rfq_id, section_id):
        parser = reqparse.RequestParser()
        parser.add_argument('data')
        data = request.get_json()['data']
        for key in data:
            component = session.query(ContentComponent).filter_by(document_id=rfq_id).filter_by(name=key).first()
            component.text = data[key]
            session.merge(component)
            session.commit()

        # this needs to be done client side to allow for jumping between sections
        if section_id < 10:
            url = '#/rfp/' + str(rfq_id) + '/question/' + str(int(section_id) + 1)
        else:
            url = "#/rfp/" + str(rfq_id) + "/results"
        return jsonify({"url": url})


class Deliverables(Resource):
    decorators = [auth.login_required]
    def get(self, rfq_id):
        deliverables = session.query(Deliverable).filter_by(document_id=rfq_id).order_by(Deliverable.id).all()
        return jsonify(data=[d.to_dict() for d in deliverables])

    def put(self, rfq_id):
        data = request.get_json()['data']
        for item in data:
            deliverable = session.query(Deliverable).filter_by(document_id=rfq_id).filter_by(name=item["name"]).first()
            deliverable.value = item["value"]
            deliverable.text = item["text"]
            session.merge(deliverable)
            session.commit()


class Clin(Resource):
    decorators = [auth.login_required]
    def get(self, rfq_id):
        clins = session.query(AdditionalClin).filter_by(document_id=rfq_id).all()
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
        session.add(additional_clin)
        session.commit()

        clins = session.query(AdditionalClin).filter_by(document_id=rfq_id).all()
        return jsonify(data=[c.to_dict() for c in clins])


class CustomComponents(Resource):
    decorators = [auth.login_required]
    def get(self, rfq_id, section_id):
        components = session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(section=section_id).order_by(CustomComponent.id).all()
        return jsonify(data=[c.to_dict() for c in components])

    def put(self, rfq_id, section_id):
        data = request.get_json()['data']
        for key in data:
            component = session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(name=key).first()
            component.text = data[key]
            session.merge(component)
            session.commit()

    def post(self, rfq_id, section_id):
        data = request.get_json()["data"]
        title = data['title']
        text = data['text']

        # give component a name
        current_components = session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(section=section_id).all()
        name = "component" + str(len(current_components) + 1)

        custom_component = CustomComponent(document_id=int(rfq_id), section=int(section_id), name=name, title=title, text=text)

        session.add(custom_component)
        session.commit()

        components = session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(section=int(section_id)).all()
        return jsonify(data=[c.to_dict() for c in components])


class Create(Resource):
    decorators = [auth.login_required]
    def get(self):
        rfqs = session.query(RFQ).filter_by(user_id=g.user.id).all()
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
        session.add(rfq)
        session.commit()

        return jsonify({'id': rfq.id})


class DeleteRFQ(Resource):
    decorators = [auth.login_required]
    def delete(self, rfq_id):

        deliverables = session.query(Deliverable).filter_by(document_id=rfq_id).all()
        for d in deliverables:
            session.delete(d)

        content_components = session.query(ContentComponent).filter_by(document_id=rfq_id).all()
        for c in content_components:
            session.delete(c)

        custom_components = session.query(CustomComponent).filter_by(document_id=rfq_id).all()
        for c in custom_components:
            session.delete(c)

        additional_clins = session.query(AdditionalClin).filter_by(document_id=rfq_id).all()
        for a in additional_clins:
            session.delete(a)

        rfq = session.query(RFQ).filter_by(id=int(rfq_id)).first()

        session.delete(rfq)
        session.commit()
        message = "RFQ #" + str(rfq_id) + " deleted."

        return jsonify({'message': message})

def dicts_to_dict(dicts, key):
    new_dict = {}
    for i, d in enumerate(dicts):
        new_key = d[key]
        new_dict[new_key] = dicts[i]['text']
    return new_dict
