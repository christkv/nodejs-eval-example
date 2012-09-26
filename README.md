nodejs-eval-example
===================

Simple example showing mongodb node.js eval

To run
----------------------------------------------------------
1. install node.js from http://nodejs.org/
2. clone or download this code
3. open the terminal or command prompt
4. go to the directory using cd
5. type
  
    npm install

6. Make sure mongodb is running on port 27017
7. start the application by typing

    node server.js

Now you can insert a simple doc using the stored procedure doing

http://localhost:8080/insert?id=1&value=hello

And query it by id at

http://localhost:8080/find?id=1

A better solution and safer is to use the code provided in insert_better and find_better. Just replace the queries over like this to use them.

http://localhost:8080/insert_better?id=2&value=hello2

and

http://localhost:8080/find_better?id=2

