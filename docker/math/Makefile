container :
	cp ../../math/math-service.js .
	cp ../../math/math-plugin.js .
	
	docker build -t math .
	docker images | grep math

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean