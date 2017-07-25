container :
	cp ../../api/api.js .
	cp ../../api/app.js .
	
	docker build -t api .
	docker images | grep api

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean