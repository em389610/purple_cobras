function changeGate(){
//V Change value of the first gate V
	var temp = Math.floor(Math.random() * 4);
	while(temp == currentGate1){
		temp = Math.floor(Math.random() * 4);
	}
	currentGate1 = temp;
	
//V change the value of the second gate V

	temp = Math.floor(Math.random() * 4);
	while(temp == currentGate2){
		temp = Math.floor(Math.random() * 4);
	}
	currentGate2 = temp;

//V change the value of the third gate V

	temp = Math.floor(Math.random() * 4);
	while(temp == currentGate3){
		temp = Math.floor(Math.random() * 4);
	}
	currentGate3 = temp;
}
