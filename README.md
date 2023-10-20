# Webcro v1.1

A web application built using Node.js, Express.js, and Socket.io. This guide will help you set up the project on a machine running Ubuntu 18.04.

## Pre-requisites
Ensure you're running Ubuntu 18.04.

## Setting Up Node.js
Follow the steps below to set up Node.js on your system:

### Install curl and update your package lists:
sudo apt install -y curl
sudo apt-get update

### Install necessary packages:
sudo apt-get install -y ca-certificates curl gnupg

### Add the NodeSource GPG key to your system:
mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

### Add the NodeSource repository to your APT sources:
NODE_MAJOR=16
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update

### Install Node.js:
sudo apt-get install nodejs -y

### Verify Node.js installation:
node --version

## Installing Dependencies

### After setting up Node.js, install the required packages for the project:
npm install express socket.io ejs axios
sudo npm install -g --force nodemon

## Running the Project

### To run the project:
nodemon path_to_your_server_file.js
