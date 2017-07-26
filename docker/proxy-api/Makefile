container :
	cp ../../proxy-api/proxy-api.js .

	docker build -t front .
	docker images | grep front

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean