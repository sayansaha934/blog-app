#!/bin/bash

# Update packages
sudo apt update

# Install Python3 and pip
sudo apt install -y python3 python3-pip


# Set the port number for uvicorn
PORT_NUMBER=8000

# Install project dependencies
pip install -r requirements.txt

# Run the Python project using uvicorn
nohup python3 -m uvicorn main:app --reload --port $PORT_NUMBER

# Display a message indicating successful deployment
echo "Python project deployed successfully on port $PORT_NUMBER"
