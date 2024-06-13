from python:3.12
from node:lts

# Setting environment variables for DJANGO
ENV PYTHONUNBUFFERED=1

# Install pip
RUN apt-get update && apt-get install -y python3-pip

# Install Python dependencies:
RUN pip install --upgrade pip --break-system-packages
COPY . .
RUN pip install -r ./requirements.txt --break-system-packages

# Install package.json dependencies
WORKDIR /web_app/frontend
RUN npm install

# Install nltk vader for sentiment analysis for posts
RUN python3 -m nltk.downloader vader_lexicon

# Prepare the sqlite database
WORKDIR /web_app
CMD ["python3", "./manage.py", "makemigrations"]
CMD ["python3", "./manage.py", "migrate"]

# Start the server & the webpack script
WORKDIR /web_app/frontend
CMD ["npm", "run", "dev"]

WORKDIR /web_app
CMD ["python3", "./manage.py", "runserver", "0.0.0.0:8001"]


# TODO: KEEP PRODUCTION KEY IN SECRET!