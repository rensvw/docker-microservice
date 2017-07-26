container :
	cp ../../math/math-service.js .
	cp ../../math/math-plugin.js .
	
	sudo docker build -t math .
	sudo docker images | grep math

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean