# NodeJS Final Project Documentation

## Libraries Used : Express, joi, jsonwebtoken, lodash, mongoose, morgan, ioredis, cross-env, cors, config, chalk version 4.1.1, nodemon.

# Getting Started with node server App

## Installation

Enter to the server folder

```bash
cd final-project-server-side
```

Install the node_modules

```bash
npm i
```

## Available Scripts

you can run:

### `npm start`

- It will run the node server in production mode
- The server will not reload if you make edits.
- The print at the terminal will be:

`Connection string mongodb+srv://Admin:Aa123456!@hackerucluster.cd0j0s0.mongodb.net/MediCare` (in yellow)
`Server running on http://localhost:8181/` (in blue)


### `npm run dev`

- Runs the server with nodemon
- The server will reload if you make edits
- The print at the terminal will be:

`Connection string mongodb://127.0.0.1:27017/MediCare` (in yellow)
`Server running on http://localhost:8181/` (in blue)

And if there are no connection errors to the database you should see the message in cyan:

`connected to mongo`

### Available User Routes

#### Get all users

```bash http 
    GET /api/users/
```

Request:

- Must provide token of a logged in admin user to get an answer from this api

Response :
- Will return all the users in the database.

#### Get a specific user

```bash http 
    GET /api/users/:id
```

Request:
- Must include valid id param of requested user (string, length 24, hex)
- Must provide token of an admin user or the user himself to get an answer from this api

Response :
-Will return the user as he is saved in the database.

#### Register a user

```bash http 
    POST /api/users/
```

Request:
- Body must include bare minimum template for user creation, optionals non-withstanding, example :
``` bash 
{
    "name": {
      "first": "Hank",
      "last": "Fireant"
    },
    "phone": "0500000000",
    "email": "hank@gmail.com", 
    "password": "Aa123456!",
    "address": {
      "country": "NL",
      "city": "Amsterdam",
      "street": "Merchant Coast",
      "houseNumber": 255
    },"isDoctor": true,
    "HMO": "64c64d13e2e2d6cb0eaf84e8"
}

name (object containing):
    first 
        -- string
        -- required
        -- min 2
        -- max 256
    middle
        -- optional 
        -- string
        -- max 256
    last
        -- string
        -- required
        -- min 2
        -- max 256
phone 
    -- string
    -- required
    -- expects a valid phone number, in the format of a '0' followed by 1 or 2 digits, followed by an optional hyphen/whitespace, then 3 digits, then an optional white space, followed by 4 digits.
email
    -- string
    -- required
    -- must be unique
    -- must be lowercase
    -- must match the pattern of an email address, for instance bob@ross.com
password
    -- string
    -- required
    -- must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and is at least 8 characters long.
image (optional object which if added must contain):
    URL : 
        --  string
        --  optional
        --  if included must be a valid URL address.
    alt : 
        -- string
        -- required
        -- min 2
        -- max 256
address (object containing) :
    state :
        -- optional 
        -- string
        -- max 256
    country :   
        -- string
        -- required
        -- min 2
        -- max 256
    city :  
        -- string
        -- required
        -- min 2
        -- max 256
    street : 
        -- string
        -- required
        -- min 2
        -- max 256
    houseNumber :
        -- Number
        -- required
        -- minLength 1
    zip :
        -- Number
        -- Optional
        -- minLength 4
    isAdmin :
        -- Boolean
        -- Optional
    isDoctor :
        -- Boolean
        -- Optional
    HMO :
        -- Hex string of 24 length
        -- Required
```

Response :
-Will return the user as he is saved in the database, if all details match the requirements.

#### Login a user

```bash http 
    POST /api/users/login
```

Request:
- Body must include existing user email and correct password, example :

{
    "email":"kenny@gmail.com",
    "password":"Aa123456!"
}

Response :
-Will return the token for the user, now logged in, if successful.

#### Edit a user

```bash http 
    PUT /api/users/:id
```

``` bash 
Request:
- id must be a valid user id
- Body may include all of the details to be updated the way an exhaustive profile update would occur
  but minimally all that is needed for a barebones update is the updated address of the user and HMO value, example :
{
    "name": {
      "first": "kenny",
      "last": "mc"
    },
    "phone": "0500000000",
    "email": "kenny@gmail.com",
    "password": "Aa123456!",
    "address": {
      "country": "Israel",
      "city": "Ashkelon",
      "street": "Victory Square 2",
      "houseNumber": 255
    },
    "isAdmin": true,
    "isDoctor": false,
    "HMO" : "64c64d13e2e2d6cb0eaf84e8"
  }
- Note that from this entire example, only HMO and address as they are shown are required, all of the other details both in the example and in the exhaustive description found in the register api are entirely optional here.
-- A token must be attached to the header
-- The token must involve the user whose profile is being edited in the request.
```

Response :
-Will return the user after the edits, if id and request body match accordingly.

#### Change a users doctor status

```bash http 
    PATCH /api/users/:id
```

```bash 
    Request: 
    -- The id must be a valid user id
    -- A token must be attached to the header
    -- The token must involve the user whose doctor status is to be updated.
```

Response :
-Will return the user after the business status update if successful.

#### Delete a user

```bash http 
    DELETE /api/users/:id
```

```bash 
    Request: 
    -- The id must be a valid user id
    -- A token must be attached to the header
    -- The token must involve an admin, only an admin may delete a user.
    -- If the user has prescriptions attached to him (either as patient or as doctor), the deletion will not occur
```

Response :
-Will return the deleted user if successful.


### Available Pharma Routes

#### Get all pharma users

```bash http 
    GET /api/pharmas/
```

Request:

- No particular requirements are needed neither in head or body.

Response :
- Will return all the pharma users in the database.

#### Get a specific pharma user

```bash http 
    GET /api/pharmas/:id
```

Request:
- Must include valid id param of requested pharma user (string, length 24, hex)

Response :
-Will return the pharma user as he is saved in the database.

#### Register a user

```bash http 
    POST /api/pharmas/
```

Request:
- Body must include bare minimum template for pharma user creation, optionals non-withstanding, example :
``` bash 
{
    "name": "Roche",
    "phone": "0500000000",
    "email": "roche@gmail.com", 
    "password": "Aa123456!",
    "address": {
      "country": "NL",
      "city": "Amsterdam",
      "street": "Merchant Coast"
    }
}

name :
    -- string
    -- required
    -- min 2
    -- max 256
phone 
    -- string
    -- required
    -- expects a valid phone number, in the format of a '0' followed by 1 or 2 digits, followed by an optional hyphen/whitespace, then 3 digits, then an optional white space, followed by 4 digits.
email
    -- string
    -- required
    -- must be unique
    -- must be lowercase
    -- must match the pattern of an email address, for instance bob@ross.com
password
    -- string
    -- required
    -- must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and is at least 8 characters long.
image (optional object which if added must contain):
    URL : 
        --  string
        --  optional
        --  if included must be a valid URL address.
    alt : 
        -- string
        -- required
        -- min 2
        -- max 256
address (object containing) :
    state :
        -- optional 
        -- string
        -- max 256
    country :   
        -- string
        -- required
        -- min 2
        -- max 256
    city :  
        -- string
        -- required
        -- min 2
        -- max 256
    street : 
        -- string
        -- required
        -- min 2
        -- max 256
    zip :
        -- Number
        -- Optional
        -- minLength 4
```

Response :
-Will return the pharma user as he is saved in the database, if all details match the requirements.
-Request must have a token in the header, of a logged in admin.

#### Login a user

```bash http 
    POST /api/pharmas/login
```

Request:
- Body must include existing user email and correct password, example :

{
    "email":"kenny@gmail.com",
    "password":"Aa123456!"
}

Response :
-Will return the token for the pharma user, now logged in, if successful.

#### Edit a pharma user

```bash http 
    PUT /api/pharmas/:id
```

``` bash 
Request:
- id must be a valid pharma user id
- Body may include all of the details to be updated the way an exhaustive profile update would occur, the only detail that must be left out is password (password cannot be updated for pharma users)

-- A token must be attached to the header
-- The token must be of a logged in admin.
```

Response :
-Will return the pharma user after the edits, if id and request body match accordingly.
-Request must have a token in the header, of a logged in admin.

#### Delete a pharma user

```bash http 
    DELETE /api/pharmas/:id
```

```bash 
    Request: 
    -- The id must be a valid pharma user id
    -- A token must be attached to the header
    -- The token must involve an admin, only an admin may delete a pharma user.
    -- If the pharma user has medicines attached to him, the deletion will not occur
```

Response :
-Will return the deleted pharma user if successful.

### Available Medicine Routes

#### Get All Medicines

```bash http 
    GET /api/medicines/
```

-- no requirements are needed, neither in the header or the body of the request

Response :
-Will return all the medicines in the database.

### Get a specific medicine

``` bash http
    GET /api/medicines/:id
```
-- no requirements are needed, neither in the header or the body of the request
-- id must be a valid id of an existing medicine

Response :
-Will return the medicine as it is in the database.

### Create a new medicine

``` bash http
    POST /api/medicines/
```

``` bash http 
    The body of the request must contain a bare minimum template to create a card, for example:
    {
    "title": "Aspirin",
    "subTitle": "Over the counter medicine",
    "description": "For headaches"
  }
```

``` bash 
Full template for medicine creation
title:
    -- String
    -- required
    -- minLength 2
    -- maxLength 256
subTitle:
    -- String
    -- required
    -- minLength 2
    -- maxLength 256
description:
    -- String
    -- required
    -- minLength 2
    -- maxLength 1024 
image: (optional object which if added must contain):
    URL : 
        --  string
        --  optional
        --  if included must be a valid URL address.
    alt : 
        -- string
        -- required
        -- min 2
        -- max 256
medicineNumber :
    -- Number
    -- required
    -- min and max length 7
prescriptionRequired :
    -- Boolean
    -- Optional (False by default)
```

-- request must include token of logged in pharma user in its header.

Response :
-Will return the medicine as it is saved in the database.

### Edit an existing medicine

``` bash http
    PUT /api/medicines/:id
```

-- The body of the request is similar in every way to what was requested in create medicine except that a medicine's likes may be edited within its body as well, the likes of a medicine are an array of strings and would thus look like so:
"likes": ["6479efe72ce8d8815ab9218f, 6479efe72ce8d8815ab92194"].    
-- request must include token in its header of the user who owns said card.
-- The card id provided must be valid and that of an existing card.

Response :
-Will return the medicine as it is saved in the database post edit.

### Like an existing medicine

``` bash http
    PATCH /api/medicines/:id
```

-- request must include token of logged in user in its header.
-- id param must be valid and be an id of an existing medicine.

Response :
-Will return the medicine as it is saved in the database after the like being added, or removed.

### Delete an existing medicine

``` bash http
    DELETE /api/medicines/:id
```

-- request must include token of a logged in admin in its header.
-- id param must be valid and be an id of an existing medicine.
-- medicine cannot be deleted so long as the pharma user which created it exists.

Response :
-Will return the medicine as it was saved in the database, prior to deletion.

### Available HMOS Routes

#### Get All HMOS

```bash http 
    GET /api/hmos/
```

-- no requirements are needed, neither in the header or the body of the request

Response :
-Will return all the hmos in the database.

### Get a specific medicine

``` bash http
    GET /api/hmo/:id
```
-- no requirements are needed, neither in the header or the body of the request
-- id must be a valid id of an existing medicine

Response :
-Will return the hmo as it is in the database.

### Create a new HMO

``` bash http
    POST /api/hmos/
```

``` bash http 
    The body of the request must contain a bare minimum template to create a HMO, for example:
    {
        "name": "HMI"
    }
```

-- request must include token of logged in admin user in its header.

Response :
-Will return the hmo as it is saved in the database.

### Edit an existing hmo

``` bash http
    PUT /api/hmos/:id
```

-- The body of the request is identical to what was requested in create hmo
-- request must include token in its header of an admin.
-- The medicine id provided must be valid and that of an existing medicine.

Response :
-Will return the hmo as it is saved in the database post edit.

### Delete an existing hmo 

``` bash http
    DELETE /api/hmo/:id
```

-- request must include token of a logged in admin in its header.
-- id param must be valid and be an id of an existing hmo.
-- hmo cannot be deleted so long as there are users registered with it. (** To be implemented **)

Response :
-Will return the hmo as it was saved in the database, prior to deletion.


### Available Prescription Routes

#### Get All Prescriptions

```bash http 
    GET /api/prescriptions/
```

-- header must contain token of either doctor or admin.

Response :
-Will return all the prescriptions in the database.

#### Get My Prescriptions

``` bash http
    GET /api/cards/my-prescriptions/ 
```

``` bash
    -- Request must include a token in its header, of a logged in user
```

Response :
-Will return the prescriptions that the Doctor is in charge of, if the token is of a logged in doctor. If the token is of a logged in patient, the prescriptions of the logged in patient. Otherwise a status error 400 will be returned.

### Get a specific prescription

``` bash http
    GET /api/prescriptions/:id
```
-- header must contain token of logged in user
-- id must be a valid id of an existing prescription

Response :
-Will return the prescription as it is in the database.

### Create a new prescription

``` bash http
    POST /api/prescription/
```

``` bash http 
    The body of the request must contain a bare minimum template to create a prescription, for example:
    {
        "medicineList": [
            {"medicineId" : 7796905, "medicineName": "Aspirin", "medicineUnits": 1, "isActive": true},
            {"medicineId": 3418593, "medicineName": "Acomol", "medicineUnits": 1, "isActive": true},
            {"medicineId": 7436648, "medicineName": "Symbicort", "medicineUnits": 1, "isActive": true}
        ],
        "patientId": "64c1117d78c0b28639c34a2c",
        "doctorId":  "64c1117d78c0b28639c34a31" (Optional, subject to removal)
    }
```

``` bash 
Full template for prescription creation:
medicineList (Array containing objects, each object is formatted thus):
    medicineId:
        --Number
        --required
        --length 7
    medicineName:
        --String
        --Required
        --To have record of name of medicine at time of prescription
    medicineUnits:
        --Number
        --Required
        --Min 1, Max 5
    isActive:
        --Boolean
        --Optional
        --Default:True
patientId:
    --Hex String of length 24
    --Must be of real patient
    --Required
doctorId:
    --Hex String of length 24
    --Must be of real doctor
    --Optional
```

-- request must include token of logged in doctor or patient user in its header.

Response :
-Will return the prescription as it is saved in the database.

### Edit an existing prescription

``` bash http
    PUT /api/prescriptions/:id
```

** Fill in full list of attributes **

-- request must include token in its header of either the patient who is in the prescription, or the doctor who is in the prescription.
-- The prescription id provided must be valid and that of an existing prescription.

Response :
-Will return the prescription as it is saved in the database post edit.

## Flip isActive status of a prescription

``` bash http
    PUT /api/prescriptions/:id
```

--Header must include token of logged in user, either the patient or doctor in the prescription.
--params must include id of a prescription.
--No body needed.

## Flip isActive status of a subitem within a prescription

``` bash http
    PUT /api/prescriptions/:id/:subItemId
```

--Header must include token of logged in user, either the patient or doctor in the prescription.
--params must include id of prescription and and subItemId being the id of the medicine in the list which is to be flipped.
--No body needed.

### Delete an existing prescription

``` bash http
    DELETE /api/prescriptions/:id
```

-- request must include token in its header of either the patient who is in the prescription, or the doctor who is in the prescription.
-- The prescription id provided must be valid and that of an existing prescription.

Response :
-Will return the prescription as it was saved in the database, prior to deletion.

## Delete Subitem from a prescription

``` bash http
    DELETE /api/prescriptions/:id/:subItemId
```
-- request must include token in its header of either the patient who is in the prescription, or the doctor who is in the prescription, or an admin.
-- params must include id of prescription and and subItemId being the id of the medicine in the list which is to be flipped.

Response :
-Will return the prescription as it was saved in the database, prior to deleting the subitem.


--Final Remarks
1.  Each request will be given a response. 
    If the response is an error, it is recorded in a file log under ;
    utils/fileLoggers/basicTextFileLogger/logs/dd-mm-yyyy.txt
2.  The response is formatted in the console for the server to appear like so
    Wednesday 28/6/2023 09:32:37 GMT+03:00 Asia/Jerusalem GET /api/users/ 200 34.036 ms
    The color depends on the status code, 200 = blue, anything above 400 = red.



















