container :
	cp ../../api/api.js .
	
	docker build -t api .
	docker images | grep api

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean