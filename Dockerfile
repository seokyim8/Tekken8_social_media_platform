from python:3.12

# Install Python dependencies:
    RUN pip install --upgrade pip setuptools wheel
    RUN pip install -r requirements.txt
# TODO: KEEP PRODUCTION KEY IN SECRET!