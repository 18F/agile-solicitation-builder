### Local Installation
(On a Mac w/ [Homebrew](https://homebrew.sh))

#### Python and Flask Installation

To install on MacOS with Homebrew add these lines to your `.bash_profile` or `.zshrc` file:
```shell
if which pyenv > /dev/null; then eval "$(pyenv init -)"; fi

if which pyenv-virtualenv-init > /dev/null; then eval "$(pyenv virtualenv-init -)"; fi

export WORKON_HOME=$HOME/.virtualenvs

```
Then install `pyenv`, `pyenv-virtualenv` from homebrew and install the appropriate version of python. Create the virtual environment for the project.

```shell
# Add appropriate lines to .bash_profile first
brew install pyenv
brew install pyenv-virtualenv
pyenv install 3.5.1
pyenv virtualenv 3.5.1 asb
```
To list python and virtual environments you can use this command:
```shell
pyenv versions
```

Switch to the agile-solicitation-builder directory and activate the virtual environment and install the requirements.

```shell
#cd to the project directory
pyenv local 3.5.1
pyenv activate asb
pip install -r requirements.txt
```

To switch to the virtual environment you can add it to your `.python-version` file in your directory structure or do it manually with:

```shell
pyenv activate asb
```
You can switch out with `pyenv deactivate`. It is recommended you set the virtual environment automatically via a `.python-version` file on the project.



#### Create the database.
If you do not have postgresql installed run:
```
brew install postgres
initdb /usr/local/var/postgres
```

To create an app database run:
```
createdb your_database_name
export DATABASE_URL=postgresql://localhost/your_database_name
```

Replacing `your_database_name` with the db you'd like.

You can then seed the database by running:
```
flask -a server.py seed_db
```

#### Install the Front end.
Run:
```
brew install node
cd app
npm install
npm install -g gulp
gulp
cd ..
```

#### Start the app
From the root directory of the project run
```
python server.py
```
