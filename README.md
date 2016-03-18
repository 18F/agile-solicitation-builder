[![Stories in Ready](https://badge.waffle.io/18F/playbook-in-action.png?label=ready&title=Ready)](https://waffle.io/18F/playbook-in-action)
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

To install them, `cd` to the `app` directory and run `npm install`.

This project uses the following bower components:

  - jQuery
  - Bootstrap

The backend is a Flask app built with Python 2. It requires Postgres, which must be installed before the Python package dependencies.  To install the Python package dependencies, run `pip install -r requirements.txt`.

The server expects a `DATABASE_URL` environment variable of the form expected by [SQLAlchemy engine configuration](http://docs.sqlalchemy.org/en/latest/core/engines.html).  This project uses the `postgresql+psycopg2` dialect and driver, so an example URL might be `postgresql+psycopg2://localhost/myDBname`.

To launch the app run `python server.py`. The site will be available at `http://localhost:5000`. To seed the database and delete any old tables run create_tables() (from server.py).

To ensure bundle.js is updated with the changes to any React code, you will need to use something like the node package Gulp. Once you have it [installed](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md), leave it running in a separate Terminal tab: just change to the `app` directory (`cd app`) and run `gulp`.

### The Code

#####Adding a new page

To add a new "questions" page (all pages are listed in the right sidebar), create a new file in the [questions](https://github.com/18F/playbook-in-action/tree/master/app/src/questions) folder. See [`XX_sample.js`](https://github.com/18F/playbook-in-action/blob/master/app/src/questions/XX_sample.js) to get an idea of what needs to be included in a page.

To make the page visible in and accessible from the side bar you must add it to [`question_list.js`](https://github.com/18F/playbook-in-action/blob/master/app/src/question_list.js).

#####Removing an existing page

Delete the corresponding page file from the [questions](https://github.com/18F/playbook-in-action/tree/master/app/src/questions) folder and remove the reference to the question from [`question_list.js`](https://github.com/18F/playbook-in-action/blob/master/app/src/question_list.js).

#####Modifying the content

Content that can be modified is created in seed.py. There are 3 types of content, ContentComponents, CustomComponents, and Deliverables. Content types are declared in [`models.py`](https://github.com/18F/playbook-in-action/blob/master/models.py).

To remove content you need to both remove the content object from seed.py and if it is referenced by name on a page you need to remove that reference. CustomComponents are not referenced individually so this second step is not necessary.

Please note that any documents created prior to the removal or addition of new content will be incompatabile and will break the site so they should be deleted as soon as the changes go live.

#####The API

The code for the API can be found in [`server.py`](https://github.com/18F/playbook-in-action/blob/master/server.py). Each "questions" page (found in the "questions" folder) calls a function in [`helpers.js`](https://github.com/18F/playbook-in-action/blob/master/app/helpers.js). which in turn sends an ajax request to `server.py` which sends the request to the database.

#####Creating a Word Document

This is managed in the file [`create_document.py`](https://github.com/18F/playbook-in-action/blob/master/create_document.py). Currently everything is added to the document manually.

### Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
