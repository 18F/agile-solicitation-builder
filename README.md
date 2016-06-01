[![Stories in Ready](https://badge.waffle.io/18F/playbook-in-action.png?label=ready&title=Ready)](https://waffle.io/18F/playbook-in-action)

[![Build Status](https://travis-ci.org/18F/playbook-in-action.svg?branch=master)](https://travis-ci.org/18F/playbook-in-action)

## About Playbook in Action
The intent of this tool is to assist in the creation of requirements documents for agile software development using best practices from the USDS Playbook and TechFAR. In the alpha release the tool can help Contracting Officer working with Program Managers develop an RFQ for a firm-fixed price procurement.


### Local Installation
Clone the repository
```
git clone https://github.com/18F/playbook-in-action.git
```
### Flask app

Create a [virtual environment](https://github.com/yyuu/pyenv-virtualenvwrapper) with `Python 3.5.1`
To create a virtualenv setup on mac check out [this gist](https://gist.github.com/lauraGgit/06204a1bdf297ce5e08788364b0b47e0).

```
# pyenv install 3.5.1
pyenv local 3.5.1
mkvirtualenv playbook
pip install -r requirements.txt
```

### Create the database.
If you do not have postgresql installed run:
```
brew install postgres
initdb /usr/local/var/postgres
```

To create a playbook database run:
```
createdb your_database_name
export DATABASE_URL=postgresql://localhost/your_database_name
```

Replacing `your_database_name` with the db you'd like.

You can then seed the database by running:
```
flask -a server.py seed_db
```
If this is not working, run `pip freeze` and make sure you are running `Flask==0.10.1`

### Install the Front end.
If you plan on developing the front-end. Make sure you have npm installed (`brew install npm`). Then run:

```
cd app
npm install
npm install -g gulp
cd ..
```

### Start the app
From the root directory of the project run
```
python server.py
```


## Further Development

##### Watching changes
When performing any front-end changes please run `gulp developing`.

##### Adding a new page

To add a new "questions" page (all pages are listed in the right sidebar):
* Create a new file in the [questions](https://github.com/18F/playbook-in-action/tree/master/app/src/questions) folder.

* See [`XX_sample.js`](https://github.com/18F/playbook-in-action/blob/master/app/src/questions/XX_sample.js) to get an idea of what needs to be included in a page.
1. Update the states to reflect the data fields you would like to collect on the page.
2. Update the page number to order in the questions list on line 12. (This will need to match the custom components in the backend)
3. Update the name of the `React class` to `ComponentName` (reflecting your component) and change that to the same on line 74.
4. Update the render function to reflect your states that need to be changed, and add additional components as needed.

* To make the page visible in and accessible from the side bar you must add it to [`question_list.js`](https://github.com/18F/playbook-in-action/blob/master/app/src/question_list.js).

* Make sure you have run `gulp` or are running `gulp developing` to update the resulting javascript file.

* Update the `create_document.py` file.
1. Add a function to add the custom text:
```
def component_name(document, rfq):
    document.add_heading("XX. Name of Section", level=BIG_HEADING)
    component_name = session.query(ContentComponent).filter_by(document_id=rfq.id).filter_by(section=XX).first()
    document.add_paragraph(component_name.text)

    return document
```
2. and add a line in the `create_document` function

```
document = component_name(document, rfq)
```
3. Add the section to the `section` array in the `overview` function

##### Removing an existing page

* Delete the corresponding page file from the [questions](https://github.com/18F/playbook-in-action/tree/master/app/src/questions) folder

* Remove the reference to the question from [`question_list.js`](https://github.com/18F/playbook-in-action/blob/master/app/src/question_list.js).

* Remove the reference from seed.py.

* Remove the function from the `create_document.py` file and the `create_document` function of the same file, and from the `section` variable in the `overview` function.

##### Modifying the content

Content that can be modified is created in seed.py. There are 3 types of content, ContentComponents, CustomComponents, and Deliverables. Content types are declared in [`models.py`](https://github.com/18F/playbook-in-action/blob/master/models.py).

To remove content you need to both remove the content object from seed.py and if it is referenced by name on a page you need to remove that reference. CustomComponents are not referenced individually so this second step is not necessary.

Please note that any documents created prior to the removal or addition of new content will be incompatible and will break the site so they should be deleted as soon as the changes go live.

##### The API

The code for the API can be found in [`server.py`](https://github.com/18F/playbook-in-action/blob/master/server.py). Each "questions" page (found in the "questions" folder) calls a function in [`helpers.js`](https://github.com/18F/playbook-in-action/blob/master/app/helpers.js). which in turn sends an ajax request to `server.py` which sends the request to the database.

##### Creating a Word Document

This is managed in the file [`create_document.py`](https://github.com/18F/playbook-in-action/blob/master/create_document.py). Currently everything is added to the document manually.

##### Node Dependencies
This project uses the following node modules:

  - babel-preset-react
  - babelify
  - browserify
  - gulp
  - gulp-notify
  - gulp-rename
  - history
  - react
  - react-bootstrap
  - react-dom
  - react-flexbox
  - react-router
  - reactify
  - vinyl-source-stream
  - watchify


### Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
