set -e

API="https://api.fr.cloud.gov"
ORG="gsa-acq-agile-solicitation-builder"
SPACE=$1

if [ $# -ne 1 ]; then
  echo "Usage: deploy <space>"
  exit
fi

if [ $SPACE = 'prod' ]; then
  NAME="agile-solicitation-builder"
  MANIFEST="manifest.yml"
  CF_USERNAME=$CF_USERNAME_PRODUCTION
  CF_PASSWORD=$CF_PASSWORD_PRODUCTION
elif [ $SPACE = 'staging' ]; then
  NAME="agile-solicitation-builder"
  MANIFEST="manifest-staging.yml"
  CF_USERNAME=$CF_USERNAME_STAGING
  CF_PASSWORD=$CF_PASSWORD_STAGING
else
  echo "Unknown space: $SPACE"
  exit
fi

cf login -a $API -u $CF_USERNAME -p $CF_PASSWORD -o $ORG -s $SPACE
cf zero-downtime-push $NAME -f $MANIFEST
