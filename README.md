[![Stories in Ready](https://badge.waffle.io/18F/playbook-in-action.png?label=ready&title=Ready)](https://waffle.io/18F/playbook-in-action)
### Local Installation
Clone the repository
```
git clone https://github.com/18F/playbook-in-action.git
```
### Flask app

Create a [virtual environment](https://github.com/yyuu/pyenv-virtualenvwrapper) with `Python 3.5.1`

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

### Install the Front end.
Load the javaScript modules via npm:

```
cd app
npm install
gulp build
cd ..
```

### Start the app
From the root directory of the project run
```
python server.py
```


## The Code

##### Adding a new page

To add a new "questions" page (all pages are listed in the right sidebar), create a new file in the [questions](https://github.com/18F/playbook-in-action/tree/master/app/src/questions) folder. See [`XX_sample.js`](https://github.com/18F/playbook-in-action/blob/master/app/src/questions/XX_sample.js) to get an idea of what needs to be included in a page.

To make the page visible in and accessible from the side bar you must add it to [`question_list.js`](https://github.com/18F/playbook-in-action/blob/master/app/src/question_list.js).

##### Removing an existing page

Delete the corresponding page file from the [questions](https://github.com/18F/playbook-in-action/tree/master/app/src/questions) folder and remove the reference to the question from [`question_list.js`](https://github.com/18F/playbook-in-action/blob/master/app/src/question_list.js).

##### Modifying the content

Content that can be modified is created in seed.py. There are 3 types of content, ContentComponents, CustomComponents, and Deliverables. Content types are declared in [`models.py`](https://github.com/18F/playbook-in-action/blob/master/models.py).

To remove content you need to both remove the content object from seed.py and if it is referenced by name on a page you need to remove that reference. CustomComponents are not referenced individually so this second step is not necessary.

Please note that any documents created prior to the removal or addition of new content will be incompatabile and will break the site so they should be deleted as soon as the changes go live.

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
