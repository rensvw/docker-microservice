container :
	cp ../../proxy-api/proxy-api.js .

	docker build -t proxy .
	docker images | grep proxy

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean