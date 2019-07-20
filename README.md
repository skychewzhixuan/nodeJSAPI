# Guide to start 

## Checkout from Git
Clone with HTTPS: https://github.com/skychewzx/nodeJSAPI.git
Clone with SSH: git@github.com:skychewzx/nodeJSAPI.git

## 1. Install Dependency 
npm install

## 2. Database setup
1. Go to database.sql
2. Copy and Paste it on SQL Server
3. Run and Execute it

## 3. Run Project
npm start

## 4. Run Unit Test
npm test

## 5. Deploy Project to Heroku
git push heroku master


## 6. User Stories 
1. As a teacher, I want to register one or more students to a specified teacher.
    * Local: http://localhost:3000/api/register
    * Heroku: https://sheltered-chamber-51899.herokuapp.com/api/register
    
2. As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).
    * Case 1
        * Local: http://localhost:3000/api/commonstudents?teacher=teacherken%40gmail.com
        * Heroku: https://sheltered-chamber-51899.herokuapp.com/api/commonstudents?teacher=teacherken%40gmail.com
    * Case 2
        * Local: http://localhost:3000/api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com
        * Heroku: https://sheltered-chamber-51899.herokuapp.com/api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com
        
3. As a teacher, I want to suspend a specified student.
    * Local: http://localhost:3000/api/suspend
    * Heroku: https://sheltered-chamber-51899.herokuapp.com/api/suspend
     
4. As a teacher, I want to retrieve a list of students who can receive a given notification.
     * Local: http://localhost:3000/api/retrievefornotifications
     * Heroku: https://sheltered-chamber-51899.herokuapp.com/api/retrievefornotifications
          

