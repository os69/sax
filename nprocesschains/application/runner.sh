node startchain.js
rc=0
while [ "$rc" -ne 1 ]; 
do 
	node runner.js
	rc=$?
done
