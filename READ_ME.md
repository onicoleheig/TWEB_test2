### 1. Importer une collection de films (0.5pt)

![](img/p1.png)

### How to run

go to the backend and frontend folder and type following commands:

```
npm install
npm start
```

the application will run in localhost on the port 9000.



### Tests

model ok

http://localhost:9000/api/movies to show all movies..

Pagination: http://localhost:9000/api/movies/2/10 avec comme params dans l'ordre page et limit

to test the login juste send a post with 

```
{
	"username": "admin",
	"password": "admin"
}
```



you can register a user to the url

http://localhost:9000/auth/register

with the following body

```
{
	"username": "GatorAli",
	"password": "superpassword"
}
```

you can't add the same user two times



all tests can be performed on the following url : https://backend-qsqexingpz.now.sh/



Use the following command to start the test

```
npm test
```

