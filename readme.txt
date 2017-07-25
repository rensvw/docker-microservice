Commandos:

node app.js
node math-service.js

http://localhost:3000/api/calculate/sum?left=2&right=3 → {"answer":5}

http://localhost:3000/api/calculate/product?left=2&right=3 → {"answer":6}

pm2 start ecosystem.config.js
pm2 start webserver
pm2 start math
pm2 kill
pm2 list